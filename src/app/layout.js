"use client";

import {useMemo, createContext, useContext, memo} from "react";
import localFont from "next/font/local";
import "./styles/globals.css";
import { Providers } from "./providers";
import { usePathname } from "next/navigation";
import AuthenticatedLayout from "./auth-layout";
import WithoutAuthLayout from "./without-auth-layout";
import { AuthProvider } from "@/app/lib/authContext";

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

// Context to store layout logic
const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const pathname = usePathname();

  // Memoize the layout type based on the pathname
  const isWithoutAuth = useMemo(() => {
    return ["/", "/auth/login", "/system-health-check"].includes(pathname);
  }, [pathname]);

  const contextValue = useMemo(() => ({ isWithoutAuth }), [isWithoutAuth]);

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
    <body
      className={`${montserratMedium.variable} ${geistMono.variable} antialiased bg-foreground min-h-[100dvh]`}
    >
    <Providers>
      <AuthProvider>
        <LayoutProvider>
          <LayoutRenderer>{children}</LayoutRenderer>
        </LayoutProvider>
      </AuthProvider>
    </Providers>
    </body>
    </html>
  );
}

const MemoizedAuthenticatedLayout = memo(AuthenticatedLayout);
const MemoizedWithoutAuthLayout = memo(WithoutAuthLayout);

function LayoutRenderer({ children }) {
  const { isWithoutAuth } = useLayout();
  const Layout = isWithoutAuth
    ? MemoizedWithoutAuthLayout
    : MemoizedAuthenticatedLayout;

  return <Layout>{children}</Layout>;
}
