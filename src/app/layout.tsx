import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "24/7 Towing & Recovery | Fast Roadside Assistance",
  description: "Stuck on the road? We're already on the way. 24/7 emergency towing, heavy duty recovery, lockouts, jump starts, and roadside assistance. Call now for fast response.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-900 text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
