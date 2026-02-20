import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;

  // যদি token না থাকে এবং private route এ ঢুকতে চায়
  if (
    !token &&
    (pathname.startsWith("/home") || pathname.startsWith("/movie") || pathname.startsWith("/my-list"))
  ) {
    return NextResponse.redirect(new URL("/SignIn", req.url));
  }

  // যদি token থাকে এবং public route এ ঢুকতে চায়
  if (
    token &&
    (pathname === "/" ||
      pathname.startsWith("/SignIn") ||
      pathname.startsWith("/SignUp"))
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
};
