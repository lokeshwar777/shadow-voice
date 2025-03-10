import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true });
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserVerifiedByUsername) {
            return NextResponse.json({ success: false, message: "Username already exists" }, { status: 400 });
        }

        const existingUserByEmail = await UserModel.findOne({ email });

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return NextResponse.json({ success: false, message: "Email already exists" }, { status: 400 });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verificationCode;
                existingUserByEmail.verifyCodeExpire = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
                return NextResponse.json({ success: true, message: "User registered successfully. Please verify your email." }, { status: 201 });
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode: verificationCode,
                verifyCodeExpire: expiryDate,
                isVerified: false
            });
            await newUser.save();

            // Send verification email
            const emailResponse = await sendVerificationEmail(email, username, verificationCode);
            if (emailResponse.success) {
                return NextResponse.json({ success: true, message: "User registered successfully. Please verify your email." }, { status: 201 });
            } else {
                return NextResponse.json({ success: false, message: emailResponse.message }, { status: 500 });
            }
        }
    } catch (error) {
        console.error("Error registering user", error);
        return NextResponse.json({ success: false, message: "Failed to register user" }, { status: 500 });
    }
}