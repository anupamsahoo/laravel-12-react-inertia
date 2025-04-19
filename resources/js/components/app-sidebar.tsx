import * as React from "react"
import {
    LayoutGrid
} from 'lucide-react';

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarRail
} from '@/components/ui/sidebar';
import AppLogo from '@/components/app-logo';
import { Link, usePage } from '@inertiajs/react';
import { type NavItem, type SharedData } from '@/types';
import { NavSingle } from '@/components/nav-single';
import generateNav from '@/components/generate-nav';

const dashBoard: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutGrid,
    }
];


export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const permissions = auth.permissions ?? [];
    const navMain = generateNav(permissions);
    return (
      <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
          <SidebarMenu>
              <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                      <Link href="/dashboard" prefetch>
                          <AppLogo />
                      </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSingle items={dashBoard} />
        <NavMain items={navMain} />
      </SidebarContent>
          <SidebarFooter>
              <NavUser />
          </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
