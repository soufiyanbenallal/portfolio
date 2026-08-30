"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon, LayoutDashboardIcon } from "lucide-react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: React.ReactNode;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  // Track open state for each category group so users can toggle expand / collapse freely
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    items.forEach((item) => {
      // Open if item is active by default or if current route is inside this category
      const isRouteActive = item.items?.some((sub) => sub.url === pathname);
      initialState[item.title] = isRouteActive ?? item.isActive ?? true;
    });
    return initialState;
  });

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isOverviewActive = pathname === "/polaris-playground";

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Components</SidebarGroupLabel>
      <SidebarMenu>
        {/* ── Overview Item ── */}
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={isOverviewActive}
            tooltip="Overview"
            render={<Link href="/polaris-playground" />}
          >
            <LayoutDashboardIcon />
            <span>Overview</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* ── Grouped Categories (Collapsible) ── */}
        {items.map((item) => {
          const isCategoryOpen = openGroups[item.title] ?? false;
          const isChildActive = item.items?.some((sub) => sub.url === pathname);

          return (
            <Collapsible
              key={item.title}
              open={isCategoryOpen}
              onOpenChange={(isOpen) =>
                setOpenGroups((prev) => ({ ...prev, [item.title]: isOpen }))
              }
              render={<SidebarMenuItem />}
            >
              <SidebarMenuButton
                isActive={isChildActive}
                tooltip={item.title}
                onClick={() => toggleGroup(item.title)}
                className="cursor-pointer"
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>

              {item.items?.length ? (
                <>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuAction
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleGroup(item.title);
                        }}
                        className={`cursor-pointer transition-transform duration-200 ${
                          isCategoryOpen ? "rotate-90" : ""
                        }`}
                      >
                        <ChevronRightIcon />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    }
                  />
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isSubActive = pathname === subItem.url;
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              isActive={isSubActive}
                              render={<Link href={subItem.url} />}
                            >
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
