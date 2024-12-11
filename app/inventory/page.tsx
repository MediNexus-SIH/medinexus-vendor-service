import { Layout } from "@/components/layout"
import { InventoryTable, InventoryItem } from "@/components/inventory-table"
import { Button } from "@/components/ui/button"

const sampleItems: InventoryItem[] = [
  {
    id: "1",
    name: "Paracetamol",
    category: "Medicine",
    department: "Emergency",
    quantity: 105,
    batchNumber: "BF6969",
    unitPrice: 50,
    expiryDate: "2024-12-04",
  },
  {
    id: "2",
    name: "Endoscope",
    category: "Medical Devices",
    department: "Gastroenterology",
    quantity: 10,
    batchNumber: "E12345",
    unitPrice: 400000,
    expiryDate: "2027-04-16",
  },
  {
    id: "3",
    name: "Antacid",
    category: "Medicine",
    department: "Gastroenterology",
    quantity: 500,
    batchNumber: "AC789456",
    unitPrice: 160,
    expiryDate: "2025-03-20",
  },
  {
    id: "4",
    name: "Barium Swallow",
    category: "Medicine",
    department: "Gastroenterology",
    quantity: 100,
    batchNumber: "BS654987",
    unitPrice: 1600,
    expiryDate: "2025-09-30",
  },
  {
    id: "5",
    name: "Colonoscope",
    category: "Medical Devices",
    department: "Gastroenterology",
    quantity: 5,
    batchNumber: "CS567890",
    unitPrice: 640000,
    expiryDate: "2029-01-06",
  },
]

export default function InventoryPage() {
  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
          <div className="flex items-center space-x-2">
            <Button>Add Item</Button>
          </div>
        </div>
        <InventoryTable data={sampleItems} />
      </div>
    </Layout>
  )
}

