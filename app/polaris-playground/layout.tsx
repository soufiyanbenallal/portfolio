"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, ExternalLink } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { PolarisScriptLoader } from "@/components/shared/polaris-script-loader.shared"
import { polarisDocComponentsData } from "./data/polaris-docs.data"

export default function PolarisPlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const slug = pathname.replace("/polaris-playground/", "").replace("/polaris-playground", "")
  const currentComponent = polarisDocComponentsData.find((c) => c.slug === slug)

  return (
    <SidebarProvider>
      {/* ── Official Polaris Web Components Script Loader ── */}
      <PolarisScriptLoader />

      {/* ── Canonical sidebar-08 AppSidebar ── */}
      <AppSidebar />

      {/* ── Canonical sidebar-08 Inset ── */}
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/80 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink render={<Link href="/polaris-playground" />}>
                    Polaris Components
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {currentComponent ? (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem className="hidden md:block">
                      <span className="text-muted-foreground text-sm">
                        {currentComponent.categoryLabel}
                      </span>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{currentComponent.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Overview</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* ── Shopify Component Link on Header of Inset ── */}
          {currentComponent && (
            <a
              href={currentComponent.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-sidebar-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
            >
              <BookOpen className="size-3.5" />
              <span className="hidden sm:inline">Shopify Docs</span>
              <ExternalLink className="size-3" />
            </a>
          )}
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
