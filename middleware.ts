import { NextRequest,NextResponse } from "next/server";
import { getSession, updateSession } from "@/lib/action/authActions";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}




/* import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "@/lib/action/authActions";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const session = await getSession();
  console.log(session, "session")
  if (
    session.user &&
    ['/explore', '/sign-in', '/sign-up'].includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/`
    )
  }
  return await updateSession(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
} */