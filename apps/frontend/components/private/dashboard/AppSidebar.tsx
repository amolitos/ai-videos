"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BellIcon,
  CalendarClock,
  ChartNoAxesCombined,
  CreditCardIcon,
  Film,
  LayoutDashboard,
  LogOutIcon,
  MoreVerticalIcon,
  Share2,
  UserCircleIcon,
  UserPen,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

const appMenu = [
  {
    key: "default",
    title: "",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        title: "Analiticas",
        url: "/analytics",
        icon: <ChartNoAxesCombined />,
      },
    ],
  },
  {
    key: "Automations",
    title: "Automatización",
    items: [
      {
        title: "Creadores",
        url: "/creators",
        icon: <UserPen />,
      },
      {
        title: "Planeación",
        url: "/planning",
        icon: <CalendarClock />,
      },
    ],
  },
  {
    key: "content",
    title: "Contenido",
    items: [
      {
        title: "Videos",
        url: "/videos",
        icon: <Film />,
      },
      {
        title: "Redes Sociales",
        url: "/social-networks",
        icon: <Share2 />,
      },
    ],
  },
];

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export const AppSidebar = () => {
  const { data: session } = useSession();
  const { isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="bg-none border-none">
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-3 py-3 px-1 overflow-hidden"
        >
          <div className="relative w-7 h-7 group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5">
            <Image
              src="/logo.svg"
              alt="Logo"
              fill
              priority
              className="object-cover"
            ></Image>
          </div>
          <h6 className="font-bold group-data-[collapsible=icon]:hidden">
            {APP_NAME}
          </h6>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {appMenu.map((menu) => (
          <SidebarGroup key={menu.key}>
            {menu.title && <SidebarGroupLabel>{menu.title}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {menu.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={`/app/${item.url}`}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={session?.user?.image ?? undefined}
                      alt="{session?.user?.name}"
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {session?.user?.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {session?.user?.email}
                    </span>
                  </div>
                  <MoreVerticalIcon className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserCircleIcon />
                    Cuenta
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    Facturación
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BellIcon />
                    Notificaciones
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOutIcon />
                  Salir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
