import { NextResponse } from "next/server";
import { getServerSession } from "@/app/lib/getServerSession";

export async function GET() {
  const user = await getServerSession();

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user,
  });
}