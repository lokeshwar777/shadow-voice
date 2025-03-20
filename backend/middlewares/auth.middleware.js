import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const authenticateUser = async (req, res, next) => {
    const token =
        req.headers['Authorization']?.replace('Bearer ', '') ||
        req.cookies?.accessToken;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(
            '-password -refreshToken'
        );

        if (!user) {
            return res.status(404).json({ error: 'Invalid access token' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { authenticateUser };
