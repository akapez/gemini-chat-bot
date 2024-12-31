import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@lib/auth";

export const config = {
  matcher: ["/chat", "/"],
};

export default auth((req: NextRequest): NextResponse | Promise<NextResponse> => {
  if (req.nextUrl.pathname === "/chat" && !req.auth) {
    // User is not authenticated and trying to access /chat
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname === "/" && req.auth) {
    // User is authenticated and trying to access /
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  return NextResponse.next();
});
