import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
        );
        // console.log(connectionInstance);
        // console.log(
        //     `\n MongoDB connected, DB HOST : ${connectionInstance.connection.host}`
        console.log(`\nMongoDB connected!!!`);
    } catch (error) {
        console.log(`MONGODB connection error : ${error}`);
        process.exit(1);
    }
};

export default connectDB;
