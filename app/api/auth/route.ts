import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.HUB_PASSWORD) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("hub_auth", process.env.HUB_PASSWORD!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
