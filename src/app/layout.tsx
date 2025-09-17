
import type { Metadata, Viewport } from "next";
import { PT_Sans, Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { BottomNav } from "@/components/bottom-nav";
import { cn } from "@/lib/utils";
import { TripProvider } from "@/app/trip-context"; // Import the TripProvider
import "./globals.css";

const fontSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

const fontGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "Himalaya Navigator",
  description: "Your personal guide for Himalayan adventures.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(0 0% 96.1%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(240 10% 3.9%)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontGrotesk.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TripProvider initialDayNumber={1}> {/* Wrap with TripProvider */}
            <div className="relative min-h-dvh">
              <main>{children}</main>
              <BottomNav />
            </div>
          </TripProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
