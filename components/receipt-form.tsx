"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Plus } from "lucide-react"
import { ReceiptCustomizationComponent } from "./receipt-customization"

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

interface ReceiptFormProps {
  data: ReceiptData
  onUpdate: (data: ReceiptData) => void
}

export function ReceiptForm({ data, onUpdate }: ReceiptFormProps) {
  const addItem = () => {
    const newItem: ReceiptItem = {
      id: Date.now().toString(),
      name: "",
      price: 0,
    }
    onUpdate({
      ...data,
      items: [...data.items, newItem],
    })
  }

  const removeItem = (id: string) => {
    onUpdate({
      ...data,
      items: data.items.filter((item) => item.id !== id),
    })
  }

  const updateItem = (id: string, field: keyof ReceiptItem, value: string | number) => {
    const updatedItems = data.items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    onUpdate({
      ...data,
      items: updatedItems,
    })
  }

  const updateField = (field: keyof ReceiptData, value: string | number) => {
    onUpdate({
      ...data,
      [field]: value,
    })
  }

  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + item.price, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    return subtotal + data.tax
  }

  return (
    <div className="space-y-6 border-1 rounded-lg ">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Receipt Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                placeholder="Enter store name"
                value={data.storeName}
                onChange={(e) => updateField("storeName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={data.date} onChange={(e) => updateField("date", e.target.value)} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Items</Label>
              <Button onClick={addItem} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            {data.items.map((item, index) => (
              <div key={item.id} className="flex gap-2 items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`item-name-${item.id}`}>Item {index + 1}</Label>
                  <Input
                    id={`item-name-${item.id}`}
                    placeholder="Item name"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, "name", e.target.value)}
                  />
                </div>
                <div className="w-32 space-y-2">
                  <Label htmlFor={`item-price-${item.id}`}>Price</Label>
                  <Input
                    id={`item-price-${item.id}`}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={item.price || ""}
                    onChange={(e) => updateItem(item.id, "price", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <Button onClick={() => removeItem(item.id)} size="sm" variant="outline" className="mb-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tax">Tax Amount</Label>
              <Input
                id="tax"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={data.tax || ""}
                onChange={(e) => updateField("tax", Number.parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label>Calculated Total</Label>
              <div className="p-2 bg-muted rounded-md font-semibold">${calculateTotal().toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ReceiptCustomizationComponent
        customization={data.customization}
        onUpdate={(customization) => onUpdate({ ...data, customization })}
      />
    </div>
  )
}
