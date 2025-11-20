import Link from "next/link";
import { Lock } from "lucide-react";
import GoogleButton from "@/components/auth/GoogleButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackgroundAuth } from "@/components/auth/BackgroundAuth";
import { ShineBorder } from "@/components/ui/shine-border";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export default function Login() {
  return (
    <div className="h-screen relative">
      <BackgroundAuth />
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <Card className="relative w-full md:w-2/3 lg:w-1/3 bg-neutral-900 overflow-hidden">
          <ShineBorder shineColor={["#7bbfff", "#A07CFE", "#FE8FB5"]} />
          <CardHeader>
            <div className="bg-black rounded-full mx-auto p-4">
              <Lock size={35} className="text-white" />
            </div>
            <CardTitle className="font-bold text-3xl text-center">
              Bienvenido a {APP_NAME}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-neutral-400">Ingresa para generar videos</p>
            <div className="grid mt-6">
              <GoogleButton />
            </div>
            <p className="text-sm text-neutral-400 mt-3">
              Al iniciar sesión, aceptas nuestros
              <br />
              <Link href="/terms" className="font-medium text-indigo-400">
                Terminos de servicio
              </Link>{" "}
              y{" "}
              <Link href="/privacy" className="font-medium text-indigo-400">
                Politica de privacidad
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
