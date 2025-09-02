import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ralewayLightFont = localFont({
  src: "../fonts/Raleway-Light.ttf",
  variable: "--font-ralewayLight",
  display: "swap",
});

const ralewayNormalFont = localFont({
  src: "../fonts/Raleway-Regular.ttf",
  variable: "--font-ralewayNormal",
  display: "swap",
});

const ralewayMediumFont = localFont({
  src: "../fonts/Raleway-Medium.ttf",
  variable: "--font-ralewayMedium",
  display: "swap",
});

const ralewaySemiBoldFont = localFont({
  src: "../fonts/Raleway-SemiBold.ttf",
  variable: "--font-ralewaySemiBold",
  display: "swap",
});

const ralewayBoldFont = localFont({
  src: "../fonts/Raleway-Bold.ttf",
  variable: "--font-ralewayBold",
  display: "swap",
});

const dotoexbFont = localFont({
  src: "../fonts/Doto_Rounded-ExtraBold.ttf",
  variable: "--font-dotoexb",
  display: "swap",
});

/* @theme {
  --font-light: Raleway Light, "sans-serif"; -> font-raleway font-light
  --font-reg: Raleway Regular, "sans-serif"; -> font-raleway font-normal
  --font-sb: Raleway SemiBold, "sans-serif"; -> font-raleway font-semibold
  --font-med: Raleway Medium, "sans-serif"; -> font-raleway font-medium
  --font-b: Raleway Bold, "sans-serif"; > font-raleway font-bold
  --font-deb: Doto Rounded ExtraBold, "sans-serif";
} */

export const metadata: Metadata = {
  title: "Portfolio | Dibyashakti Moharana",
  description: "Computer Science student with expertise in full-stack development, enterprise software solutions, and modern web technologies.",
  metadataBase: new URL("https://dibyashakti.vercel.app"),
  openGraph: {
    title: "Portfolio | Dibyashakti Moharana",
    description: "Computer Science student with expertise in full-stack development, enterprise software solutions, and modern web technologies.",
    url: "https://dibyashakti.vercel.app",
    siteName: "Portfolio | Dibyashakti Moharana",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${inter.variable}
        ${ralewayLightFont.variable}
        ${ralewayMediumFont.variable}
        ${ralewayNormalFont.variable}
        ${ralewayBoldFont.variable}
        ${ralewaySemiBoldFont.variable}
        ${dotoexbFont.variable}
      `}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased font-inter relative">
        {children}
      </body>
    </html>
  );
}
