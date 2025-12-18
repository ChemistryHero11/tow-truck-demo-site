import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "24/7 Towing & Recovery | Fast Roadside Assistance | Houston TX",
  description: "Stuck on the road? We're already on the way. 24/7 emergency towing, heavy duty recovery, lockouts, jump starts, and roadside assistance in Houston. Call now for fast response.",
  keywords: "tow truck, towing service, roadside assistance, Houston, emergency towing, heavy duty recovery",
  openGraph: {
    title: "RapidTow - 24/7 Towing & Recovery",
    description: "Houston's fastest tow truck service. 30-minute average response time.",
    type: "website",
    siteName: "RapidTow",
  },
  twitter: {
    card: "summary_large_image",
    title: "RapidTow - 24/7 Towing & Recovery",
    description: "Houston's fastest tow truck service. 30-minute average response time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-900 text-white overflow-x-hidden overscroll-none md:cursor-none">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
