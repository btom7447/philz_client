import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const tokenCookie = req.cookies.get("token")?.value || "";

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenCookie}`,
        },
      },
    );

    if (!backendRes.ok) {
      const text = await backendRes.text();
      console.error("Backend /me error:", text);
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: backendRes.status },
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    console.error("Next /me proxy error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
