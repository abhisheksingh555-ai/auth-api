import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  APP_NAME: z
    .string()
    .min(1, "APP_NAME is required"),

  PORT: z
    .coerce
    .number()
    .int()
    .min(1)
    .max(65535)
    .default(5000),

  MONGO_URI: z
    .string()
    .min(1, "MONGO_URI is required"),

  JWT_ACCESS_SECRET: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),

  JWT_ACCESS_EXPIRES_IN: z
    .string()
    .min(1),

  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),

  JWT_REFRESH_EXPIRES_IN: z
    .string()
    .min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.error(
    z.prettifyError(parsedEnv.error)
  );
  process.exit(1);
}

const env = Object.freeze(parsedEnv.data);

export default env;
