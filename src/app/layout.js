"use client"

import { metadata } from "./metadata"; // server-side only
import localFont from "next/font/local";
import "./styles/globals.css";
import {Providers} from "./providers";
import { usePathname } from "next/navigation";
import {Suspense} from "react";
import AuthenticatedLayout from "./auth-layout";
import WithoutAuthLayout from "./without-auth-layout";
import {AuthProvider} from "@/app/lib/authContext";

const montserratMedium = localFont({
  src: "./fonts/Montserrat-Medium.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const withoutAuthPaths = ['/', '/auth/login', '/system-health-check'] // exclude path
  const isWithoutAuth = withoutAuthPaths.includes(pathname)
  const Layout = isWithoutAuth ? WithoutAuthLayout : AuthenticatedLayout

  return (
    <html lang="en" className='dark'>
      <body className={`${montserratMedium.variable} ${geistMono.variable} antialiased bg-foreground min-h-screen`}>
        <Providers>
          <AuthProvider>
            <Layout metadata={metadata} >
              <Suspense fallback={<div>Layout stack ...</div>}>
                {children}
              </Suspense>
            </Layout>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
