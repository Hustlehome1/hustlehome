import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Anton } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer";
import ClientWidgets from "@/components/ClientWidgets";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SnakeBackground from "@/components/SnakeBackground";
import { CartProvider } from "@/contexts/CartContext";

// §2 Type — Space Grotesk (display) + Inter (body) + JetBrains Mono (spec data).
// Exposed as CSS variables consumed by tailwind.config.ts fontFamily tokens.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400"],
  display: "swap",
});

// Hero headline only — bolder, more distinctive than Space Grotesk. Anton
// only ships weight 400 (it's condensed and heavy enough on its own).
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HustleHome — The shortcut serious resellers pay for",
  description:
    "Skip the trial and error. Verified suppliers, working unban methods, and receipt know-how — sent to your email the moment you buy.",
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${anton.variable}`}
    >
      <body>
        <CartProvider>
          <SnakeBackground />
          <SiteHeader />
          {children}
          <SiteFooter />
          <CartDrawer />
          <ClientWidgets />
        </CartProvider>
      </body>
    </html>
  );
}
