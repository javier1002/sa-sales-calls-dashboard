import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 1. Definimos todas las rutas que son públicas (Cualquiera puede entrar sin loguearse)
const isPublicRoute = createRouteMatcher([
  '/', 
  '/auth(.*)',
  '/api/calls(.*)' // Deja pasar las peticiones del móvil con sus query params sin bloquearlas
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // 2. Si el usuario YA ESTÁ LOGUEADO e intenta ir al Home o al Sign-In público,
  // lo redirigimos a la vista del calendario/dashboard
  if (userId && isPublicRoute(req)) {
    const currentUrl = new URL(req.url);
    // Evitamos bucles infinitos si intenta ir a la API estando logueado externamente
    if (!currentUrl.pathname.startsWith('/api')) {
      return NextResponse.redirect(new URL('/routes', req.url));
    }
  }

  // 3. Si NO está logueado y la ruta NO es pública, lo mandamos a iniciar sesión
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }
});

export const config = {
  matcher: [
    // Asegura que corra para todas las páginas de la app e incluye las APIs explícitamente
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};