import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials:any): Promise<any>{
            await dbConnect();
            try{
                const user = await UserModel.findOne({
                    $or: [
                        { email: credentials.identifier },
                        { username: credentials.identifier }
                    ]
                })
                if(!user){
                    throw new Error("No user found with this email/username");
                }
                if(!user.isVerified){
                    throw new Error("User not verified");
                }
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                if(!isPasswordCorrect){
                    throw new Error("Password incorrect");
                }
                else{
                    return user;
                }
            }
            catch(error:any){
                throw new Error(error);
            }
        }
    })
    ],
    callbacks: {
        async jwt({token, user}){
            if(user){
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.username = user.username;
            }
            return token;
        },
        async session({session, token}){
            if(token){
                session.user = token;
                session.user.isVerified = token.isVerified as boolean;
                session.user.username = token.username as string;
                session.user._id = token._id as string;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}
    

