import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// UPDATE TESTIMONIAL
export const PUT = async (req: NextRequest, context: RouteContext) => {
  const params = await context.params;
  const { id } = params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonials/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );

    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: "No JSON response from backend", status: res.status };
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Failed to update testimonial", error: err.message },
      { status: 500 },
    );
  }
};

// DELETE TESTIMONIAL
export const DELETE = async (_req: NextRequest, context: RouteContext) => {
  const params = await context.params;
  const { id } = params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonials/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: "No JSON response from backend", status: res.status };
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Failed to delete testimonial", error: err.message },
      { status: 500 },
    );
  }
};