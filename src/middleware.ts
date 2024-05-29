import { NextRequest, NextResponse } from "next/server";
import getSession from "@/lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/log-in": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();

  const isPublicUrl = publicOnlyUrls[request.nextUrl.pathname];

  if (!session.id) {
    // 로그인하지 않은 상태
    if (!isPublicUrl) {
      return NextResponse.redirect(new URL("/log-in", request.url));
    }
  } else {
    // 로그인 한 상태
    if (isPublicUrl) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
