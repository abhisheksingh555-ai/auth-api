import jwt from "jsonwebtoken";
import env from "../config/env.js";

const validatePayload = (payload) => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new TypeError("JWT payload must be a valid object");
  }
};

export const generateAccessToken = (payload) => {
  validatePayload(payload);
  return jwt.sign(
    {
      ...payload,
      type: "access",
    },
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.JWT_ACCESS_EXPIRES_IN,
      algorithm: "HS256",
    }
  );
};

export const generateRefreshToken = (payload) => {
  validatePayload(payload);
  return jwt.sign(
    {
      ...payload,
      type: "refresh",
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
      algorithm: "HS256",
    }
  );
};

export const verifyAccessToken = (token) => {
  if (!token || typeof token !== "string") {
    throw new TypeError("Access token must be a valid string");
  }

  const decoded = jwt.verify(
    token,
    env.JWT_ACCESS_SECRET,
    {
      algorithms: ["HS256"],
    }
  );

  if (decoded.type !== "access") {
    throw new Error("Invalid access token type");
  }

  return decoded;
};

export const verifyRefreshToken = (token) => {
  if (!token || typeof token !== "string") {
    throw new TypeError("Refresh token must be a valid string");
  }

  const decoded = jwt.verify(
    token,
    env.JWT_REFRESH_SECRET,
    {
      algorithms: ["HS256"],
    }
  );

  if (decoded.type !== "refresh") {
    throw new Error("Invalid refresh token type");
  }

  return decoded;
};
