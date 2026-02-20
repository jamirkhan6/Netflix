// // app/api/login/route.ts
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   if (email && password) {
//     const res = NextResponse.json({ message: "Login successful" });
//     res.cookies.set("loggedIn", "true", {
//       path: "/",
//       httpOnly: true,
//       sameSite: "strict",
//       maxAge: 60 * 60 * 24, // 1 day
//     });
//     return res;
//   }

//   return NextResponse.json({ message: "Invalid credentials user" }, { status: 401 });
// }
