import { Toaster } from "sonner";
import { AppSidebar } from "@/components/private/dashboard/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function VideoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="bg-neutral-800">
      <AppSidebar />
      <div className="w-full bg-neutral-900 border-l border-neutral-700 md:rounded-tl-4xl">
        <div className="absolute top-2 left-2">
          <SidebarTrigger />
        </div>
        {children}
      </div>
      <Toaster richColors />
    </SidebarProvider>
  );
}
