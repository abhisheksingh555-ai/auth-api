import env from "../config/env.js";

const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";

    if (err.name === "ValidationError") {
        statusCode = 400;

        message = Object.values(err.errors)
            .map((error) => error.message)
            .join(", ");
    }

    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    if (err.code === 11000) {
        statusCode = 409;

        const field = Object.keys(err.keyValue || {})[0];

        message = field
            ? `${field} already exists`
            : "Duplicate value already exists";
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token has expired";
    }

    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }

    if (
        typeof statusCode !== "number" ||
        statusCode < 400 ||
        statusCode > 599
    ) {
        statusCode = 500;
    }

    const response = {
        success: false,
        message:
            statusCode === 500 && env.NODE_ENV === "production"
                ? "Internal server error"
                : message,
    };

    if (env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    return res.status(statusCode).json(response);
};

export default errorMiddleware;