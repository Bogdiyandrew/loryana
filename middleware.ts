import { auth } from "@/auth"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: [
    // AICI e secretul: lăsăm libere fișierele de sistem și notificări
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js|workbox-|OneSignalSDKWorker.js|gallery).*)",
  ],
}