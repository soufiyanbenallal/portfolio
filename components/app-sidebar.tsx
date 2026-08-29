"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  MousePointerClickIcon,
  AlertCircleIcon,
  FormInputIcon,
  LayoutGridIcon,
  BookOpenIcon,
  LifeBuoyIcon,
  SendIcon,
  ArrowLeftIcon,
} from "lucide-react"

const AVATAR =
  "https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg?width=64&height=64"

const data = {
  navMain: [
    {
      title: "Actions",
      url: "/polaris-playground",
      icon: <MousePointerClickIcon />,
      isActive: true,
      items: [
        {
          title: "Button",
          url: "/polaris-playground/button",
        },
        {
          title: "Clickable",
          url: "/polaris-playground/clickable",
        },
        {
          title: "Link",
          url: "/polaris-playground/link",
        },
        {
          title: "Menu",
          url: "/polaris-playground/menu",
        },
        {
          title: "Button group",
          url: "/polaris-playground/button-group",
        },
        {
          title: "Clickable chip",
          url: "/polaris-playground/clickable-chip",
        },
      ],
    },
    {
      title: "Feedback & Status",
      url: "/polaris-playground",
      icon: <AlertCircleIcon />,
      isActive: true,
      items: [
        {
          title: "Badge",
          url: "/polaris-playground/badge",
        },
        {
          title: "Banner",
          url: "/polaris-playground/banner",
        },
        {
          title: "Spinner",
          url: "/polaris-playground/spinner",
        },
        {
          title: "Chip",
          url: "/polaris-playground/chip",
        },
      ],
    },
    {
      title: "Forms",
      url: "/polaris-playground",
      icon: <FormInputIcon />,
      isActive: true,
      items: [
        {
          title: "Text field",
          url: "/polaris-playground/text-field",
        },
        {
          title: "Select",
          url: "/polaris-playground/select",
        },
        {
          title: "Switch",
          url: "/polaris-playground/switch",
        },
        {
          title: "Color field",
          url: "/polaris-playground/color-field",
        },
        {
          title: "Drop zone",
          url: "/polaris-playground/drop-zone",
        },
        {
          title: "Number field",
          url: "/polaris-playground/number-field",
        },
        {
          title: "Money field",
          url: "/polaris-playground/money-field",
        },
      ],
    },
    {
      title: "Layout & Structure",
      url: "/polaris-playground",
      icon: <LayoutGridIcon />,
      isActive: true,
      items: [
        {
          title: "Page",
          url: "/polaris-playground/page",
        },
        {
          title: "Section",
          url: "/polaris-playground/section",
        },
        {
          title: "Grid",
          url: "/polaris-playground/grid",
        },
        {
          title: "Box",
          url: "/polaris-playground/box",
        },
        {
          title: "Stack",
          url: "/polaris-playground/stack",
        },
        {
          title: "Table",
          url: "/polaris-playground/table",
        },
        {
          title: "Divider",
          url: "/polaris-playground/divider",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Documentation",
      url: "https://shopify.dev/docs/api/app-home/web-components",
      icon: <BookOpenIcon />,
    },
    {
      title: "Support",
      url: "https://shopify.dev/docs/apps",
      icon: <LifeBuoyIcon />,
    },
    {
      title: "Feedback",
      url: "https://github.com/Shopify",
      icon: <SendIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="relative flex aspect-square size-8 shrink-0 overflow-hidden rounded-lg border border-sidebar-border bg-sidebar-accent">
                <Image
                  src={AVATAR}
                  alt="Profile"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium flex items-center gap-1">
                  <ArrowLeftIcon className="size-3 text-muted-foreground" />
                  Back to my profile
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Polaris web components
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
