
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  // Clear cookie
  response.cookies.set("loggedIn", "false", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // Expire immediately
  });

  return response;
}
