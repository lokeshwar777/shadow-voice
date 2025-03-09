import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpire: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: { type: String, required: [true, "Username is required"], unique: true, trim: true },
    email: { type: String, required: [true, "Email is required"], unique: true, match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"please use a valid email address"] },
    password: { type: String, required: [true,"Password is required"] },
    verifyCode: { type: String, required: [true,"VerifyCode is required"] },
    verifyCodeExpire: { type: Date, required: [true,"VerifyCodeExpire is required"] },
    isVerified: { type: Boolean, default: false },
    isAcceptingMessage: { type: Boolean, default: true },
    messages: [MessageSchema],
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) 
    || mongoose.model<User>('User', UserSchema);

export default UserModel;

    
