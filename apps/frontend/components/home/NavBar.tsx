import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export const NavBar = () => {
  return (
    <nav className="fixed top-10 left-1/2 -translate-x-1/2 w-2/3 bg-purple-800/10 backdrop-blur-sm border border-[#392e4e] rounded-full py-2 px-5 z-50">
      <div className="max-w-7xl flex items-center gap-3 mx-auto px-4 py-2">
        <div className="flex items-center gap-1 mr-auto">
          <div className="relative w-8 h-8">
            <Image
              src="/logo.svg"
              alt="Logo"
              fill
              priority
              className="object-cover"
            ></Image>
          </div>
          <h3 className=" text-xl font-bold">{APP_NAME}</h3>
        </div>
        <Link href="/">
          <Button variant="ghost">Inicio</Button>
        </Link>
        <Link href="/pricing">
          <Button variant="ghost">Precios</Button>
        </Link>
        <Link href="/login">
          <Button variant="outline" className="rounded-full">
            Ingresar
          </Button>
        </Link>
      </div>
    </nav>
  );
};
