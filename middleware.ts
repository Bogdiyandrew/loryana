import { auth } from "@/auth"
 
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})
 
// Specificăm pe ce rute să ruleze (excludem fișierele statice și imaginile)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}