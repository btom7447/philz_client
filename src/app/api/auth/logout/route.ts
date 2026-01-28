import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const res = NextResponse.json({ message: "Logged out successfully" });

  // Clear the auth token cookie
  res.cookies.set({
    name: "token",
    value: "",
    path: "/", // important: clear cookie for the whole site
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0), // expire immediately
  });

  return res;
};
