import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Free Receipt Generator | Create Custom Fake Receipts Online",
  description: "Instantly generate customizable fake receipts for fun, testing, or design mockups. Free, no login required.",
  keywords: "receipt generator, fake receipt, custom receipt, free receipt maker, online receipt tool",
  authors: [{ name: "Erdene", url: "https://fake-receipt-gen.vercel.app" }],
  themeColor: "#000000",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Free Receipt Generator",
    description: "Create realistic-looking custom receipts instantly.",
    url: "https://fake-receipt-gen.vercel.app",
    siteName: "Free Receipt Generator",
    images: [
      {
        url: "/receipt.png",
        width: 1200,
        height: 630,
        alt: "Free Receipt Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Receipt Generator",
    description: "Create realistic-looking custom receipts instantly.",
    site: "@Syren0914",
    images: ["/receipt.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
