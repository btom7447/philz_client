import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// CREATE property
export const POST = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
};

// FETCH properties
export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams;

    const query = new URLSearchParams({
      page: params.get("page") || "1",
      pageSize: params.get("pageSize") || "12",
      sortBy: params.get("sortBy") || "createdAt:desc",
      title: params.get("title") || "",
      location: params.get("location") || "",
      propertyType: params.get("propertyType") || "",
      status: params.get("status") || "",
      maxPrice: params.get("maxPrice") || "",
      amenities: params.get("amenities") || "",
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/properties?${query}`, { cache: "no-store" });
    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
