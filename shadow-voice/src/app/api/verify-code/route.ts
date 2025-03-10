import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { decode } from "punycode";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, code } = await request.json();
        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({ username: decodedUsername });
        if (!user) {
            return Response.json({ success: false, message: "User not found" }, { status: 404 });
        }
        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpire) > new Date();
        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            await user.save();
            return Response.json({ success: true, message: "User verified successfully" }, { status: 200 });
        }
        else if(!isCodeValid){
            return Response.json({ success: false, message: "Invalid code" }, { status: 400 });
        }
        else{
            return Response.json({ success: false, message: "Code expired" }, { status: 400 });
        }
    }
    catch (error) {
        console.error("Error verifying user", error);
        return Response.json({ success: false, message: "Failed to verify user" }, { status: 500 });
    }
}