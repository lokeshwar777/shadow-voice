import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    const { name, username, email, password, confirmPassword } = req.body;
    try {
        if (
            [name, username, email, password, confirmPassword].some(
                (field) => !field
            )
        ) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        }).select('email username');

        if (existingUser) {
            const existingField =
                existingUser.email === email ? 'email' : 'username';
            return res
                .status(400)
                .json({ error: `${existingField} already exists` });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const user = await User.create({
            name,
            username,
            email,
            password,
            confirmPassword,
        });

        const createdUser = await User.findById(user._id).select(
            '-password -refreshToken'
        );

        if (!createdUser) {
            return res.status(500).json({ error: 'Failed to create user' });
        }

        res.status(201).json({
            message: 'user created successfully',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    try {
        if (!usernameOrEmail || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await User.findOne({
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // Set Cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true, // Prevents JavaScript access (more secure)
            secure: true, // Only sent over HTTPS (production only)
            sameSite: 'Strict', // Prevents CSRF attacks
            maxAge: 30 * 1000, // 30 seconds
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 1 * 60 * 1000, // 1 min
        });

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const logoutUser = async (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true, // Prevents JavaScript access (more secure)
        secure: true, // Only sent over HTTPS (production only)
        sameSite: 'Strict', // Prevents CSRF attacks
        maxAge: 30 * 1000, // 30 seconds
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 1 * 60 * 1000, // 1 min
    });
    await User.findByIdAndUpdate(
        req.user._id,
        { refreshToken: '' },
        { new: true }
    );

    res.status(200).json({ message: 'Logged out successfully' });
};

const refreshAccessToken = async (req, res, next) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id).select(
            '-password '
        );

        if (!user) {
            return res.status(404).json({ error: 'Invalid access token' });
        }

        if (user.refreshToken !== incomingRefreshToken) {
            return res
                .status(400)
                .json({ error: 'Refresh token is expire or used' });
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // Set Cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true, // Prevents JavaScript access (more secure)
            secure: true, // Only sent over HTTPS (production only)
            sameSite: 'Strict', // Prevents CSRF attacks
            maxAge: 30 * 1000, // 30 seconds
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 1 * 60 * 1000, // 1 min
        });

        res.status(200).json({ message: 'Access token refreshed' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { loginUser, logoutUser, refreshAccessToken, registerUser };
