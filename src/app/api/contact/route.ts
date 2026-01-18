import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    // Forward to backend (your Express API)
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, subject, message }),
      },
    );

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed" },
        { status: backendRes.status },
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 },
    );
  }
}