"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ImageIcon, X, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LogoSettings {
  file: File | null
  url: string
  position: string
  size: string
  opacity: number
}

interface LogoUploadProps {
  logo: LogoSettings
  onUpdate: (logo: LogoSettings) => void
}

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

export function LogoUpload({ logo, onUpdate }: LogoUploadProps) {
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      const url = URL.createObjectURL(file)
      onUpdate({
        ...logo,
        file,
        url,
      })
    }
  }

  const removeLogo = () => {
    if (logo.url) {
      URL.revokeObjectURL(logo.url)
    }
    onUpdate({
      file: null,
      url: "",
      position: "top-center",
      size: "medium",
      opacity: 1,
    })
  }

  const updateLogoSetting = (field: keyof LogoSettings, value: string | number) => {
    onUpdate({
      ...logo,
      [field]: value,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Logo Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Upload a logo to personalize your receipt. Supported formats: PNG, JPG, GIF. Max size: 5MB.
          </AlertDescription>
        </Alert>

        {/* Logo Upload */}
        <div className="space-y-4">
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

              {logo.url && (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <img
                      src={logo.url || "/placeholder.svg"}
                      alt="Logo preview"
                      className="w-12 h-12 object-contain border rounded bg-white"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeLogo}
                    className="gap-1 bg-transparent"
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Logo Settings - only show if logo is uploaded */}
          {logo.url && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logoPosition">Position</Label>
                  <Select value={logo.position} onValueChange={(value) => updateLogoSetting("position", value)}>
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
                  <Select value={logo.size} onValueChange={(value) => updateLogoSetting("size", value)}>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="logoOpacity">Opacity</Label>
                <Select
                  value={logo.opacity.toString()}
                  onValueChange={(value) => updateLogoSetting("opacity", Number.parseFloat(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select opacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.3">30% (Watermark)</SelectItem>
                    <SelectItem value="0.5">50% (Light)</SelectItem>
                    <SelectItem value="0.7">70% (Medium)</SelectItem>
                    <SelectItem value="0.8">80% (Strong)</SelectItem>
                    <SelectItem value="1">100% (Full)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
