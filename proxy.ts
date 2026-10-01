import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (!path.startsWith("/dashboard")) return NextResponse.next();
  const session = request.cookies.get("my_platform_session")?.value;
  if (!session) return NextResponse.redirect(new URL("/login?reason=auth", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
