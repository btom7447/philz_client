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

  const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/${id}/cancel`;

  try {
    const res = await fetch(backendUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          label: "BackendError",
          message: data.message || "Failed to cancel tour",
          status: res.status,
          backendResponse: data,
        },
        { status: res.status },
      );
    }

    return NextResponse.json({
      label: "Success",
      message: "Tour cancelled successfully",
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        label: "Exception",
        message: "Failed to cancel tour",
        error: err.message,
      },
      { status: 500 },
    );
  }
}
