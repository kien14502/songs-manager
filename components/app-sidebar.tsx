"use client";

import * as React from "react";
import { Music } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { mainRoutes } from "@/constants/router";
import Link from "next/link";
import { checkCurrentRouter, cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Music className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium text-xl">Songs manager</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {mainRoutes.map((item) => (
              <SidebarMenuItem key={item.path}>
                <Link href={item.path}>
                  <SidebarMenuButton
                    className={cn(
                      "[&>svg]:size-5",
                      "flex items-center gap-2 text-gray-600 hover:text-black",
                      checkCurrentRouter(item.path, pathname) &&
                        "font-medimum bg-primary text-black"
                    )}
                  >
                    <item.icon size={20} />
                    <span className="text-lg">{item.name}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
