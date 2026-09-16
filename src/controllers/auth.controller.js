import { registerUser } from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await registerUser({
      data: req.body,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
