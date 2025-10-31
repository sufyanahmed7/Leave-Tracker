import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Open_Sans, Roboto } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "./components/features/pwa/ServiceWorkerRegister";

const poppins = Open_Sans({
  weight: "700",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixako Leaves",
  description: "Employee leave counter with Clerk Auth",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          suppressHydrationWarning
          className={`${poppins.className} ${roboto.className} font-sans antialiased`}
        >
          <ServiceWorkerRegister />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
