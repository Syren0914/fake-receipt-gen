"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useRef } from "react"

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

interface ReceiptPreviewProps {
  data: ReceiptData
}

export function ReceiptPreview({ data }: ReceiptPreviewProps) {
  const receiptRef = useRef<HTMLDivElement>(null)

  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + item.price, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    return subtotal + data.tax
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return new Date().toLocaleDateString()
    return new Date(dateString).toLocaleDateString()
  }

  const downloadPDF = async () => {
    if (!receiptRef.current) return

    try {
      // Using html2canvas and jsPDF for PDF generation
      const html2canvas = (await import("html2canvas")).default
      const jsPDF = (await import("jspdf")).default

      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")

      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save("receipt.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
      // Fallback: open print dialog
      window.print()
    }
  }

  const getBorderClass = (borderStyle: string) => {
    switch (borderStyle) {
      case "solid":
        return "border-b"
      case "dashed":
        return "border-b border-dashed"
      case "dotted":
        return "border-b border-dotted"
      default:
        return "border-b border-dashed"
    }
  }

  const getSpacingClass = (spacing: string) => {
    switch (spacing) {
      case "compact":
        return "space-y-1"
      case "normal":
        return "space-y-2"
      case "relaxed":
        return "space-y-3"
      case "loose":
        return "space-y-4"
      default:
        return "space-y-2"
    }
  }

  const getLogoSizeClass = (size: string) => {
    switch (size) {
      case "small":
        return "w-10 h-10"
      case "medium":
        return "w-15 h-15"
      case "large":
        return "w-20 h-20"
      case "extra-large":
        return "w-25 h-25"
      default:
        return "w-15 h-15"
    }
  }

  const getLogoPositionClass = (position: string) => {
    switch (position) {
      case "top-left":
        return "flex justify-start"
      case "top-center":
        return "flex justify-center"
      case "top-right":
        return "flex justify-end"
      case "center":
        return "flex justify-center items-center"
      case "bottom-left":
        return "flex justify-start"
      case "bottom-center":
        return "flex justify-center"
      case "bottom-right":
        return "flex justify-end"
      default:
        return "flex justify-center"
    }
  }

  const shouldShowLogoAtPosition = (logoPosition: string, currentPosition: string) => {
    return logoPosition.includes(currentPosition)
  }

  const renderLogo = (position: string) => {
    if (!data.customization.logo.url || !shouldShowLogoAtPosition(data.customization.logo.position, position)) {
      return null
    }

    return (
      <div className={`mb-4 ${getLogoPositionClass(data.customization.logo.position)}`}>
        <img
          src={data.customization.logo.url || "/placeholder.svg"}
          alt="Receipt Logo"
          className={`${getLogoSizeClass(data.customization.logo.size)} object-contain`}
          style={{ opacity: data.customization.logo.opacity }}
          crossOrigin="anonymous"
        />
      </div>
    )
  }

  return (
    <div className="space-y-4 z-60">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Receipt Preview</h3>
        <Button onClick={downloadPDF} className="gap-2">
          <Download className="h-4 w-4" />
          Download as PDF
        </Button>
      </div>

      <Card className="max-w-sm mx-auto shadow-lg" style={{ backgroundColor: data.customization.backgroundColor }}>
        <CardContent
          className={`p-6 ${data.customization.fontFamily} ${data.customization.fontSize}`}
          ref={receiptRef}
          style={{ color: data.customization.textColor }}
        >
          <div className={`space-y-2 mb-6 ${data.customization.alignment}`}>
            {renderLogo("top")}
            <h2 className="text-xl font-bold" style={{ color: data.customization.textColor }}>
              {data.storeName || "Store Name"}
            </h2>
            <div className="text-sm opacity-75">Date: {formatDate(data.date)}</div>
            <div
              className={`my-4 ${getBorderClass(data.customization.borderStyle)}`}
              style={{ borderColor: data.customization.accentColor }}
            ></div>
          </div>

          <div className={`mb-4 ${getSpacingClass(data.customization.spacing)}`}>
            {data.items.length > 0 ? (
              data.items.map((item, index) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name || `Item ${index + 1}`}</span>
                  <span className="font-mono">${item.price.toFixed(2)}</span>
                </div>
              ))
            ) : (
              <div className="text-center opacity-50 py-4">No items added yet</div>
            )}
          </div>

          {data.customization.logo.position === "center" && renderLogo("center")}

          <div
            className={`my-4 ${getBorderClass(data.customization.borderStyle)}`}
            style={{ borderColor: data.customization.accentColor }}
          ></div>

          <div className={`text-sm ${getSpacingClass(data.customization.spacing)}`}>
            <div className="flex justify-between">
              <span className="opacity-75">Subtotal:</span>
              <span className="font-mono">${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Tax:</span>
              <span className="font-mono">${data.tax.toFixed(2)}</span>
            </div>
            <div className="border-b my-2" style={{ borderColor: data.customization.accentColor }}></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="font-mono" style={{ color: data.customization.accentColor }}>
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>

          <div className={`mt-6 pt-4 ${data.customization.alignment}`}>
            <div
              className={`border-t ${getBorderClass(data.customization.borderStyle)}`}
              style={{ borderColor: data.customization.accentColor }}
            ></div>
            {renderLogo("bottom")}
            <div className="text-xs opacity-50 mt-4">Thank you for your business!</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
