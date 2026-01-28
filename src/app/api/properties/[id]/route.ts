import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface Params {
  id: string;
}

export const GET = async (_: NextRequest, context: any) => {
  const { id } = context.params as { id: string }; // cast to fix type
  if (!id)
    return NextResponse.json(
      { message: "Property ID is required" },
      { status: 400 },
    );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
};

export const PUT = async (req: NextRequest, context: any) => {
  const { id } = context.params as { id: string };
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
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
  return NextResponse.json(data, { status: res.status });
};

export const DELETE = async (_: NextRequest, context: any) => {
  const { id } = context.params as { id: string };
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
};