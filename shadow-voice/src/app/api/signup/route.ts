import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import bcrypt from "bcryptjs";


export async function POST(request: Request){
    await dbConnect();

    try {
        const {username,email,password} = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({username, isVerified: true})
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        if(existingUserVerifiedByUsername){
            return Response.json({success: false, message: "Username already exists"}, {status: 400});
        }
        const existingUserByEmail = await UserModel
            .findOne({email})
        
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({success: false, message: "Email already exists"}, {status: 400});
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verificationCode;
                existingUserByEmail.verifyCodeExpire = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verificationCode: verificationCode,
                verificationCodeExpiry: expiryDate,
                isVerified: false
            });
            await newUser.save();

            //send verification email
            const emailResponse = await sendVerificationEmail(email, username, verificationCode);
            if(emailResponse.success){
                return Response.json({success: true, message: "User registered successfully. Please verify your email."},{status: 201});
            }
            else{
                return Response.json({success: false, message: emailResponse.message},{status: 500});
            }
        }
    }
    catch (error) {
        console.error("Error registering user",error);
        return Response.json({success: false, message: "Failed to register user"});
    }
}