"use client"

import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { type NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] } : { items: NavGroup[] }) {
    const page = usePage();
  return (<>
      {items.map((item) => (
    <SidebarGroup key={item.title}>
      <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
      <SidebarMenu>
        {item.items.map((mainItem) => {
            const isParentActive = mainItem.href === page.url;
            const isSubItemActive = mainItem.items?.some(subItem => subItem.href === page.url);
            const isActive = isParentActive || isSubItemActive;
            return (
          <Collapsible
            key={mainItem.title}
            asChild
            defaultOpen={isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={mainItem.title} isActive={mainItem.href === page.url}>
                    {mainItem.icon && <mainItem.icon />}
                    <span>{mainItem.title}</span>
                    {mainItem.items && <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {mainItem.items?.map((subItem) =>{
                      const isSubActive = subItem.href === page.url;
                  return (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild  isActive={isSubActive}>
                          <Link href={subItem.href} prefetch>
                              <span>{subItem.title}</span>
                          </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )})}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )})}
      </SidebarMenu>
    </SidebarGroup>
    ))}
  </>)
}
