import mongoose from "mongoose";
import env from "./env.js";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        const connection = await mongoose.connect(env.MONGO_URI, {
            maxPoolSize: 20,
            minPoolSize: 5,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
            family: 4,
        });

        isConnected = true;

        console.log(
            `MongoDB connected: ${connection.connection.host}`
        );

        console.log(
            `Database: ${connection.connection.name}`
        );
    } catch (error) {
        isConnected = false;

        console.error(
            "MongoDB connection failed:",
            error.message
        );

        throw error;
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();

        isConnected = false;

        console.log("MongoDB connection closed");
    } catch (error) {
        console.error(
            "MongoDB disconnect failed:",
            error.message
        );

        throw error;
    }
};

mongoose.connection.on("connected", () => {
    console.log("MongoDB event: connected");
});

mongoose.connection.on("error", (error) => {
    console.error(
        "MongoDB event: error:",
        error.message
    );
});

mongoose.connection.on("disconnected", () => {
    isConnected = false;

    console.warn("MongoDB event: disconnected");
});

export {
    connectDB,
    disconnectDB,
};

export default connectDB;
