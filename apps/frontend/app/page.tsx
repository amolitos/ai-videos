import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/home/NavBar";
import { BackgroundHero } from "@/components/home/BackgroundHero";
import { VideoCarousel } from "@/components/home/VideoCarousel";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="w-full h-screen relative">
        <BackgroundHero />
        <div className="absolute inset-0 flex items-center justify-center p-5 md:p-8 pointer-events-none">
          <div className="lg:w-2/4 text-center">
            <h2 className="text-white font-extrabold text-3xl md:text-5xl leading-[50px] mb-5">
              Activa el piloto automático de tu contenido.
            </h2>
            <Link href="/videos/new">
              <Button size="lg" className="bg-white pointer-events-auto">
                Crear videos
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-b from-transparent to-black pointer-events-none"></div>
      </div>
      <VideoCarousel />
    </main>
  );
}
