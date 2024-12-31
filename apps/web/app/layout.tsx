import type { Metadata } from "next";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

import { auth } from "@lib/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "ChatBot",
  description: "Gemini ChatBot using NextJS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }
  return (
    <SessionProvider basePath="/api/auth" session={session}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
      </html>
    </SessionProvider>
  );
}
