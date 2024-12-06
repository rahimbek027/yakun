'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BasketListContext } from "@/context/context";
import LoginModal from "@/components/Login";
import { useEffect, useState } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const access_token = localStorage.getItem('access_token')
  const [isOpen, setIsOpen] = useState<boolean>(true)
  useEffect(() => {
    if(!access_token) {
      setIsOpen(true)
    }
  }, [isOpen])
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/logo-icon.svg" />
        <title>Green Shop</title>
        <meta name="description" content="Green Shop Project" />
      </Head>
      <body className={inter.className}>
        <BasketListContext>
          <Header />
          <main className="pt-[80px]">{children}</main>
          <Footer />
          {!access_token ?
            <LoginModal isOpen={isOpen} onClose={() => setIsOpen(prev => !prev)} /> : null}
        </BasketListContext>
      </body>
    </html>
  );
}
