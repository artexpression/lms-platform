// Importamos dos funciones desde la librería "@clerk/nextjs/server"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Importamos la clase NextResponse desde "next/server"
import { NextResponse } from "next/server";

// Creamos una función que determina si una ruta está protegida. En este caso, solo la ruta '/' está protegida.
const isProtectedRoute = createRouteMatcher([
  '/',
]);

// Exportamos un middleware que utiliza la autenticación de Clerk. Este middleware se ejecuta en cada solicitud.
export default clerkMiddleware((auth, req) => {
  // Si la ruta de la solicitud está protegida, se requiere autenticación.
  if (isProtectedRoute(req)) {
    auth().protect();
  }

  // Si la ruta no está protegida o si el usuario está autenticado, se permite el acceso a la ruta.
  return NextResponse.next()
});

// Configuramos las rutas que deben ser manejadas por este archivo. En este caso, todas las rutas excepto las que contienen un punto (como las rutas de archivos) y las rutas que comienzan con '_next', además de las rutas '/' y las que comienzan con 'api' o 'trpc'.
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
