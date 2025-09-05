
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, List, Briefcase, BarChart, MapPin } from "lucide-react";

const navigationItems = [
  { href: "/", icon: <Home className="size-6" />, label: "Hoy" },
  { href: "/itinerario", icon: <List className="size-6" />, label: "Itinerario" },
  { href: "/logistica", icon: <Briefcase className="size-6" />, label: "Logística" },
  { href: "/panel-de-control", icon: <BarChart className="size-6" />, label: "Panel" },
  { href: "/mapas", icon: <MapPin className="size-6" />, label: "Mapas" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 h-20 w-[95%] max-w-2xl -translate-x-1/2 rounded-3xl border bg-background/80 shadow-2xl backdrop-blur-xl">
      <div className="grid h-full w-full grid-cols-5">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex h-full w-full flex-col items-center justify-center gap-1 rounded-full p-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.icon}
              <span className="text-xs font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
