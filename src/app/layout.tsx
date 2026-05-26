import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import { AppProviders } from "@/providers/app-providers";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | מערכת פיקוד AI לזאבים עילית`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "אימון מכירות",
    "AI מכירות",
    "טיפול בהתנגדויות",
    "סגירת עסקאות",
    "סימולציות מכירה",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.logo.src,
        width: 1024,
        height: 1024,
        alt: siteConfig.logo.alt,
      },
    ],
  },
  icons: {
    icon: [
      { url: siteConfig.logo.src, type: "image/jpeg", sizes: "1024x1024" },
    ],
    apple: [
      { url: siteConfig.logo.src, type: "image/jpeg", sizes: "1024x1024" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.locale.split("-")[0]}
      dir={siteConfig.direction}
      className={cn("dark", fontVariables)}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
