
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const geistMono = localFont({
  src:'/fonts/static/Geist-Regular.ttf',
  variable: "--font-geistmono",
});



// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "hitkali",
  description: "A ecommerce site for musical gadgets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} flex flex-col min-h-screen m-5 antialiased bg-sky-50`}
      >
        <Header />
        {/* <SidebarProvider>
          <AppSidebar/>
          <SidebarTrigger/> */}
          <main className="flex-grow">{children}</main>
          
          {/* </SidebarProvider> */}
        <Footer/>
      </body>
    </html>
  );
}
