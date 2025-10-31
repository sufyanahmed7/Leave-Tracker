import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Open_Sans, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Open_Sans({
  weight: '700',
  subsets: ['latin'],
})

const roboto = Roboto({
  weight: '700',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Pixako Leaves",
  description: "Employee leave counter with Clerk Auth",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          suppressHydrationWarning
          className={`${poppins} ${roboto}  font-sans antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
