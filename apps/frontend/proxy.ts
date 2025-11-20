import { auth } from "@/auth";

export default auth((req) => {
  // Aquí puedes hacer lógicas extra si quieres
});

export const config = {
  matcher: ["/dashboard/:path*", "/perfil/:path*"],
};
