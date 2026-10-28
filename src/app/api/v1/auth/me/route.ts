import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";
import User from "@/models/user.model";

export async function GET() {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findById(userId).select(
      "name email"
    );

    if (!user) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: unknown) {
    console.error("Get current user error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}