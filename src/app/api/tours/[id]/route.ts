import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { label: "Unauthorized", message: "No token found" },
      { status: 401 },
    );
  }

  const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/${id}`;

  try {
    const res = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          label: "BackendError",
          message: data.message || "Failed to delete tour",
          status: res.status,
          backendResponse: data,
        },
        { status: res.status },
      );
    }

    return NextResponse.json({
      label: "Success",
      message: "Tour deleted successfully",
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        label: "Exception",
        message: "Failed to delete tour",
        error: err.message,
      },
      { status: 500 },
    );
  }
}
