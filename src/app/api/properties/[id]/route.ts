import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// =================== PUT ===================
export async function PUT(req: NextRequest, context: RouteContext) {
  const params = await context.params;
  const { id } = params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { label: "Unauthorized", message: "No token found" },
      { status: 401 },
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { label: "InvalidBody", message: "Failed to parse JSON body" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          label: "BackendError",
          message: data.message || "Failed to update property",
          status: res.status,
          backendResponse: data,
        },
        { status: res.status },
      );
    }

    return NextResponse.json({
      label: "Success",
      message: "Property updated",
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        label: "Exception",
        message: "Failed to update property",
        error: err.message,
      },
      { status: 500 },
    );
  }
}

// =================== DELETE ===================
export async function DELETE(req: NextRequest, context: RouteContext) {
  const params = await context.params;
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { label: "BadRequest", message: "Property ID is missing" },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { label: "Unauthorized", message: "No token found" },
      { status: 401 },
    );
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          label: "BackendError",
          message: data.message || "Failed to delete property",
          status: res.status,
          backendResponse: data,
        },
        { status: res.status },
      );
    }

    return NextResponse.json({
      label: "Success",
      message: "Property deleted",
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        label: "Exception",
        message: "Failed to delete property",
        error: err.message,
      },
      { status: 500 },
    );
  }
}