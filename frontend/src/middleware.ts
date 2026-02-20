import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const loggedIn = req.cookies.get("loggedIn")?.value === "true";

  
  if (!loggedIn && (pathname.startsWith("/home") || pathname.startsWith("/movie")) ) {
    return NextResponse.redirect(new URL("/SignIn", req.url));
  }


  if (
    loggedIn &&
    (pathname === "/" ||
      pathname.startsWith("/SignIn") ||
      pathname.startsWith("/SignUp"))
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api).*)"], // সব route cover করবে
};
