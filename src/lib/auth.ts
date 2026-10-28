
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import 'dotenv/config';

const COOKIE_NAME = "auth-token";
const TOKEN_EXPIRY = "7d";

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET must be at least 32 characters long"
    );
  }

  return new TextEncoder().encode(secret);
}

// Create a JWT for the authenticated user
export async function createToken(userId: string) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getSecretKey());
}

// Save the JWT in an HTTP-only cookie
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

// Verify the JWT and return the user ID
export async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });

    if (typeof payload.userId !== "string") {
      return null;
    }

    return payload.userId;
  } catch {
    return null;
  }
}

// Remove the authentication cookie
export async function clearAuthCookie() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
