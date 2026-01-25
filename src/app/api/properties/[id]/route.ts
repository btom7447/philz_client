import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// You can keep this for clarity
interface Params {
  id: string;
}

export const PUT = async (
  req: NextRequest,
  context: any, // bypass the strict Promise<Params> mismatch
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${context.params.id}`,
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

export const DELETE = async (
  _: NextRequest,
  context: any, // bypass type mismatch
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${context.params.id}`,
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
