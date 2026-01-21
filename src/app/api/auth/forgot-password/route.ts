import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    // Forward request to your backend server
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      },
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Forgot password API error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};