import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  // Unwrap the params promise
  const params = await context.params;
  const { id } = params;

  // Get cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { label: "Unauthorized", message: "No token found" },
      { status: 401 },
    );
  }

  // Parse request body
  let body: { approved?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { label: "InvalidBody", message: "Failed to parse JSON body" },
      { status: 400 },
    );
  }

  if (typeof body.approved !== "boolean") {
    return NextResponse.json(
      {
        label: "BadRequest",
        message: "Missing or invalid 'approved' value",
        received: body,
      },
      { status: 400 },
    );
  }

  // Forward to backend
  const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonials/${id}/approve`;

  try {
    const res = await fetch(backendUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ approved: body.approved }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          label: "BackendError",
          message: data.message || "Failed to toggle approval",
          status: res.status,
          backendResponse: data,
        },
        { status: res.status },
      );
    }

    return NextResponse.json({
      label: "Success",
      message: "Approval status updated successfully",
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        label: "Exception",
        message: "Failed to update approval due to exception",
        error: err.message,
      },
      { status: 500 },
    );
  }
}