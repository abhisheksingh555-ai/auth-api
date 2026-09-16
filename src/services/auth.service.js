import User from "../models/user.model.js";
import { hashPassword } from "../utils/password.util.js";
import { emitNewUserNotification } from "../sockets/notification.socket.js";

export const registerUser = async ({ data }) => {
    const { name, email, phone, role, password } = data;

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();

    const existingUser = await User.findOne({
        $or: [
            { email: normalizedEmail },
            { phone: normalizedPhone },
        ],
    }).lean();

    if (existingUser) {
        if (existingUser.email === normalizedEmail) {
            const error = new Error("Email already registered");
            error.statusCode = 409;
            error.code = "EMAIL_EXISTS";
            throw error;
        }

        if (existingUser.phone === normalizedPhone) {
            const error = new Error("Phone number already registered");
            error.statusCode = 409;
            error.code = "PHONE_EXISTS";
            throw error;
        }
    }
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        phone: normalizedPhone,
        role: role || "user",
        password: hashedPassword,
    });

    const userObject = user.toObject();
    delete userObject.password;

    try {
        emitNewUserNotification(userObject);
    } catch (error) {
        console.error("Failed to emit new-user notification:", error);
    }

    return userObject;
};

