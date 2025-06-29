"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, Type, Layout, Upload, ImageIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface ReceiptCustomizationProps {
  customization: ReceiptCustomization
  onUpdate: (customization: ReceiptCustomization) => void
}

const colorOptions = [
  { value: "#ffffff", label: "White", preview: "bg-white" },
  { value: "#f8f9fa", label: "Light Gray", preview: "bg-gray-50" },
  { value: "#fff3cd", label: "Light Yellow", preview: "bg-yellow-100" },
  { value: "#d1ecf1", label: "Light Blue", preview: "bg-blue-100" },
  { value: "#d4edda", label: "Light Green", preview: "bg-green-100" },
  { value: "#f8d7da", label: "Light Pink", preview: "bg-red-100" },
]

const textColorOptions = [
  { value: "#000000", label: "Black", preview: "bg-black" },
  { value: "#374151", label: "Dark Gray", preview: "bg-gray-700" },
  { value: "#1f2937", label: "Charcoal", preview: "bg-gray-800" },
  { value: "#1e40af", label: "Blue", preview: "bg-blue-700" },
  { value: "#059669", label: "Green", preview: "bg-green-600" },
  { value: "#dc2626", label: "Red", preview: "bg-red-600" },
]

const accentColorOptions = [
  { value: "#3b82f6", label: "Blue", preview: "bg-blue-500" },
  { value: "#10b981", label: "Green", preview: "bg-green-500" },
  { value: "#f59e0b", label: "Orange", preview: "bg-orange-500" },
  { value: "#ef4444", label: "Red", preview: "bg-red-500" },
  { value: "#8b5cf6", label: "Purple", preview: "bg-purple-500" },
  { value: "#06b6d4", label: "Cyan", preview: "bg-cyan-500" },
]

const fontOptions = [
  { value: "font-sans", label: "Sans Serif (Default)" },
  { value: "font-serif", label: "Serif" },
  { value: "font-mono", label: "Monospace" },
  { value: "font-inter", label: "Inter" },
  { value: "font-roboto", label: "Roboto" },
]

const fontSizeOptions = [
  { value: "text-xs", label: "Extra Small" },
  { value: "text-sm", label: "Small" },
  { value: "text-base", label: "Medium (Default)" },
  { value: "text-lg", label: "Large" },
  { value: "text-xl", label: "Extra Large" },
]

const alignmentOptions = [
  { value: "text-left", label: "Left" },
  { value: "text-center", label: "Center (Default)" },
  { value: "text-right", label: "Right" },
]

const spacingOptions = [
  { value: "compact", label: "Compact" },
  { value: "normal", label: "Normal (Default)" },
  { value: "relaxed", label: "Relaxed" },
  { value: "loose", label: "Loose" },
]

const borderStyleOptions = [
  { value: "none", label: "None" },
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed (Default)" },
  { value: "dotted", label: "Dotted" },
]

const logoPositionOptions = [
  { value: "top-center", label: "Top Center" },
  { value: "top-left", label: "Top Left" },
  { value: "top-right", label: "Top Right" },
  { value: "center", label: "Center" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-right", label: "Bottom Right" },
]

const logoSizeOptions = [
  { value: "small", label: "Small (40px)" },
  { value: "medium", label: "Medium (60px)" },
  { value: "large", label: "Large (80px)" },
  { value: "extra-large", label: "Extra Large (100px)" },
]

export function ReceiptCustomizationComponent({ customization, onUpdate }: ReceiptCustomizationProps) {
  const updateField = (field: keyof ReceiptCustomization, value: any) => {
    onUpdate({
      ...customization,
      [field]: value,
    })
  }

  const ColorSelect = ({
    value,
    onValueChange,
    options,
    placeholder,
  }: {
    value: string
    onValueChange: (value: string) => void
    options: typeof colorOptions
    placeholder: string
  }) => (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded border ${option.preview}`}></div>
              {option.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file)
      updateField("logo", {
        ...customization.logo,
        file,
        url,
      })
    }
  }

  const removeLogo = () => {
    if (customization.logo.url) {
      URL.revokeObjectURL(customization.logo.url)
    }
    updateField("logo", {
      file: null,
      url: "",
      position: "top-center",
      size: "medium",
      opacity: 1,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Receipt Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Colors Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <Label className="text-base font-semibold">Colors</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <ColorSelect
                value={customization.backgroundColor}
                onValueChange={(value) => updateField("backgroundColor", value)}
                options={colorOptions}
                placeholder="Select background color"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="textColor">Text Color</Label>
              <ColorSelect
                value={customization.textColor}
                onValueChange={(value) => updateField("textColor", value)}
                options={textColorOptions}
                placeholder="Select text color"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accentColor">Accent Color</Label>
              <ColorSelect
                value={customization.accentColor}
                onValueChange={(value) => updateField("accentColor", value)}
                options={accentColorOptions}
                placeholder="Select accent color"
              />
            </div>
          </div>
        </div>

        {/* Typography Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <Label className="text-base font-semibold">Typography</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fontFamily">Font Family</Label>
              <Select value={customization.fontFamily} onValueChange={(value) => updateField("fontFamily", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className={option.value}>{option.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontSize">Font Size</Label>
              <Select value={customization.fontSize} onValueChange={(value) => updateField("fontSize", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  {fontSizeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Layout Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            <Label className="text-base font-semibold">Layout</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="alignment">Text Alignment</Label>
              <Select value={customization.alignment} onValueChange={(value) => updateField("alignment", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  {alignmentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="spacing">Spacing</Label>
              <Select value={customization.spacing} onValueChange={(value) => updateField("spacing", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select spacing" />
                </SelectTrigger>
                <SelectContent>
                  {spacingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="borderStyle">Border Style</Label>
              <Select value={customization.borderStyle} onValueChange={(value) => updateField("borderStyle", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select border style" />
                </SelectTrigger>
                <SelectContent>
                  {borderStyleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <Label className="text-base font-semibold">Logo</Label>
          </div>

          <div className="space-y-4">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label htmlFor="logoUpload">Upload Logo</Label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input id="logoUpload" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("logoUpload")?.click()}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Choose Image
                  </Button>
                </div>

                {customization.logo.url && (
                  <div className="flex items-center gap-2">
                    <img
                      src={customization.logo.url || "/placeholder.svg"}
                      alt="Logo preview"
                      className="w-10 h-10 object-contain border rounded"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={removeLogo}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Logo Settings - only show if logo is uploaded */}
            {customization.logo.url && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logoPosition">Position</Label>
                  <Select
                    value={customization.logo.position}
                    onValueChange={(value) => updateField("logo", { ...customization.logo, position: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {logoPositionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoSize">Size</Label>
                  <Select
                    value={customization.logo.size}
                    onValueChange={(value) => updateField("logo", { ...customization.logo, size: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {logoSizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoOpacity">Opacity</Label>
                  <Select
                    value={customization.logo.opacity.toString()}
                    onValueChange={(value) =>
                      updateField("logo", { ...customization.logo, opacity: Number.parseFloat(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select opacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.3">30%</SelectItem>
                      <SelectItem value="0.5">50%</SelectItem>
                      <SelectItem value="0.7">70%</SelectItem>
                      <SelectItem value="0.8">80%</SelectItem>
                      <SelectItem value="1">100%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
