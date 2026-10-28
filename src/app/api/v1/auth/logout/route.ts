import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

export async function POST() {
  try {
    await clearAuthCookie();

    return NextResponse.json({
      message: "Logout successful",
    });
  } catch (error: unknown) {
    console.error("Logout error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}