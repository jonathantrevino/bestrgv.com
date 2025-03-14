import type { Metadata } from "next";
import { Open_Sans, Nunito } from "next/font/google";
import "./globals.css";


const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
})

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "Best of RGV: Discover Top Businesses & Hidden Gems",
  description: "Explore the best restaurants, shops, and services in the Rio Grande Valley. Find your local favorites, hidden gems, and top-rated businesses near you.",
  keywords: 'RGV businsses, best of RGV, Rio Grande Valley restaurants, local shops, hidden gems, things to do in RGV'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel='icon' href='/favicon.ico' sizes='48x48' type='image/svg+' />
        <link rel='icon' href='/favicon.svg' sizes='any' type='image/svg+xml' />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${openSans.variable} ${nunito.variable} antialiased max-w-[1440px] mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
