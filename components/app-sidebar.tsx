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
  TrendingUpIcon,
  AlertCircleIcon,
  FormInputIcon,
  LayoutGridIcon,
  BookOpenIcon,
  LifeBuoyIcon,
  SendIcon,
  ArrowLeftIcon,
  MousePointerClickIcon,
  ImageIcon,
  TypeIcon,
  RocketIcon,
  CreditCardIcon,
} from "lucide-react"
import { polarisNavSectionsData } from "@/app/polaris-playground/data/polaris-docs.data"

const AVATAR =
  "https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg?width=64&height=64"

function getCategoryIcon(id: string) {
  switch (id) {
    case "onboarding":
      return <RocketIcon />
    case "billing":
      return <CreditCardIcon />
    case "actions":
      return <MousePointerClickIcon />
    case "stats":
      return <TrendingUpIcon />
    case "feedbacks":
      return <AlertCircleIcon />
    case "layouts":
      return <LayoutGridIcon />
    case "forms":
      return <FormInputIcon />
    case "typography":
      return <TypeIcon />
    case "media":
      return <ImageIcon />
    default:
      return <LayoutGridIcon />
  }
}

const navSecondaryData = [
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
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navMain = polarisNavSectionsData.map((section) => ({
    title: section.label,
    url: "/polaris-playground",
    icon: getCategoryIcon(section.id),
    isActive: true,
    items: section.items.map((item) => ({
      title: item.label,
      url: `/polaris-playground/${item.slug}`,
    })),
  }))

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
        <NavMain items={navMain} />
        <NavSecondary items={navSecondaryData} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
