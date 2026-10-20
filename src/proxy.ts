import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        const signInUrl = new URL("/sign-in", request?.url);
        console.log("Signin url from proxy:", signInUrl);
        signInUrl.searchParams.set("callbackUrl", request?.nextUrl?.pathname);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
     matcher: [
          "/dashboard/:path*"
     ],
};