"use client"

import { useState } from "react"
import { ReceiptForm } from "@/components/receipt-form"
import { ReceiptPreview } from "@/components/receipt-preview"
import { LavaLamp } from "@/components/ui/fluid-blob"
import LetterGlitch from "@/LetterGlitch/LetterGlitch"
import DotGrid from "@/DotGrid/DotGrid"
import Lightning from "@/Lightning/Lightning"
import SplashCursor from "@/SplashCursor/SplashCursor"

interface ReceiptItem {
  id: string
  name: string
  price: number
}

interface ReceiptCustomization {
  backgroundColor: string
  textColor: string
  accentColor: string
  fontFamily: string
  fontSize: string
  alignment: string
  spacing: string
  borderStyle: string
  logo: {
    file: File | null
    url: string
    position: string
    size: string
    opacity: number
  }
}

interface ReceiptData {
  storeName: string
  date: string
  items: ReceiptItem[]
  tax: number
  total: number
  customization: ReceiptCustomization
}

export default function Page() {
  const [receiptData, setReceiptData] = useState<ReceiptData>({
    storeName: "",
    date: new Date().toISOString().split("T")[0],
    items: [{ id: "1", name: "", price: 0 }],
    tax: 0,
    total: 0,
    customization: {
      backgroundColor: "#ffffff",
      textColor: "#000000",
      accentColor: "#3b82f6",
      fontFamily: "font-sans",
      fontSize: "text-base",
      alignment: "text-center",
      spacing: "normal",
      borderStyle: "dashed",
      logo: {
        file: null,
        url: "",
        position: "top-center",
        size: "medium",
        opacity: 1,
      },
    },
  })

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* LavaLamp full-screen background */}
      {/* <div className="absolute inset-0 -z-20">
        <LavaLamp />
      </div> */}

      {/* Splash cursor for the whole screen */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <SplashCursor />
      </div>

      {/* Main content */}
      <div className="relative z-50 container mx-auto px-4 py-8">

        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Fake Receipt Generator</h1>
          <p className="text-white max-w-2xl mx-auto">
            Create realistic-looking receipts with full customization options. Choose colors, fonts, layouts and see a
            live preview of your receipt.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">

          <div className=" rounded-lg bg-white/90 backdrop-blur">
            <ReceiptForm data={receiptData} onUpdate={setReceiptData} />
          </div>
          <div className=" rounded-lg backdrop-blur">
            <ReceiptPreview data={receiptData} />
          </div>
        </div>

        <footer className="text-center mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
          This tool is for educational and testing purposes only. Do not use for fraudulent activities.
        </footer>
      </div>
    </div>
  )
}

