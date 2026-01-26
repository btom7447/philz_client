import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


// Create Testimonial
export const POST = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Testimonials POST error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// Fetch Testimonial
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get("admin") === "true";

    // PUBLIC FETCH
    if (!isAdmin) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonials/public`,
        { cache: "no-store" },
      );

      const data = await res.json();
      return NextResponse.json(data, { status: 200 });
    }

    // ADMIN FETCH (AUTH)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonials`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Testimonials GET error:", err);
    return NextResponse.json(
      { message: "Failed to fetch testimonials" },
      { status: 500 },
    );
  }
};