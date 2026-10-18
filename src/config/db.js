import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
    if (!env.MONGO_URI) {
        throw new Error("MONGO_URI is not configured. Add it to the .env file.");
    }

    try {
        await mongoose.connect(env.MONGO_URI);
    } catch (error) {
        const details = [error.name, error.code].filter(Boolean).join(": ");
        throw new Error(
            `Unable to connect to MongoDB${details ? ` (${details})` : ""}. Check MONGO_URI and ensure MongoDB is reachable.`,
            { cause: error }
        );
    }

    console.log(`MongoDB connected to ${mongoose.connection.host}`);
};

export default connectDB;