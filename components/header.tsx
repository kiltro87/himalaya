
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

export function Header({ icon, title, subtitle }: HeaderProps) {
  return (
    <header className="bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="text-primary">
            {icon}
          </div>
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="hidden md:block">
         <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
