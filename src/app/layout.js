import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import CommonLayout from "@/components/common-layout";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "JobMatch",
  description: "Generated by ABG",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
       <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loading/>}>
            <CommonLayout  
                children={children}
                attribute="class"
                defaultTheme="system"
            />            
        </Suspense>
        <Toaster/>
      </body>
    </html>
    </ClerkProvider>
  );
}
