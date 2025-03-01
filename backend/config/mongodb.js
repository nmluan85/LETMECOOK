import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connect to database:', mongoose.connection.db.databaseName);
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
