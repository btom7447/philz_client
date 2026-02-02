import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { propertyId, tourType, tourTime } = body;

    if (!propertyId || !tourType || !tourTime) {
      return NextResponse.json(
        { message: "propertyId, tourType, and tourTime are required" },
        { status: 400 },
      );
    }

    // Forward to backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify({
        propertyId,
        type: tourType, // your backend expects 'type'
        tourTime,
      }),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Backend returned non-JSON:", text);
      return NextResponse.json(
        { message: "Backend returned non-JSON response", error: text },
        { status: res.status },
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          message: data.message || "Failed to request tour",
          error: data.error,
        },
        { status: res.status },
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    console.error("Next API /tours/request error:", err);
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 },
    );
  }
}

// FETCH Tours
export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    const query = new URLSearchParams({
      status: params.get("status") || "",
      type: params.get("type") || "",
      propertyId: params.get("propertyId") || "",
      page: params.get("page") || "1",
      limit: params.get("limit") || "20",
      sort: params.get("sort") || "-tourTime",
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/admin/all?${query.toString()}`,
      {
        headers: {
          Cookie: req.headers.get("cookie") || "",
        },
        cache: "no-store",
      },
    );

    const data = await res.json();
    const normalized = {
      ...data,
      data: data.data.map((t: any) => ({
        ...t,
        propertyId: t.property,
        userId: t.user,
      })),
    };

    return NextResponse.json(normalized, { status: res.status });
  } catch (error) {
    console.error("Next API /tours GET error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
