import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";

import Container from "@/components/Container";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import "./ql-styles.css";

// Import the fonts
const PoppinsSerif = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: true,
});
const RobotoSerif = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

// Set the main meta data
export const metadata: Metadata = {
  metadataBase: new URL("https://next--blogs.vercel.app/"),
  alternates: { canonical: "https://next--blogs.vercel.app/" },
  title: {
    default: "NextBlogs - Read, Create, and Share your stories",
    template: "%s | NextBlogs",
  },
  description:
    "Modern multi-user blogging platform to discover and enjoy articles on a variety of topics with a clean, user-friendly experience.",
  creator: "VSBroN",
  icons: {
    icon: [
      { url: "/favicon2.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    url: "https://next--blogs.vercel.app/",
    title: "NextBlogs - Read, Create, and Share your stories",
    description:
      "Modern multi-user blogging platform to discover and enjoy articles on a variety of topics with a clean, user-friendly experience.",
    siteName: "NextBlogs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextBlogs",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "NextBlogs - Read, Create, and Share your stories",
    description:
      "Modern multi-user blogging platform to discover and enjoy articles on a variety of topics with a clean, user-friendly experience.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.webmanifest",
  // themeColor: "#6f42c1",
  robots: {
    index: true,
    follow: true,
  },
  referrer: "origin-when-cross-origin",
};

// The Main Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://vhukmaifwzujizxenajc.supabase.co"
        />
      </head>
      <body
        className={`${PoppinsSerif.variable} ${RobotoSerif.variable} ${RobotoSerif.className} antialiased tracking-[0.02em]`}
      >
        <Providers>
          <Header />
          <main>
            <Container className="pt-9 md:pt-10 lg:pt-12 pb-12 flex flex-col gap-8">
              {children}
            </Container>
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
