"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

export type Hospital = {
  id: string
  name: string
  location: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
  status: "Active" | "Inactive"
  lastOrderDate: string
}

export const columns: ColumnDef<Hospital>[] = [
  {
    accessorKey: "name",
    header: "Hospital Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
  },
  {
    accessorKey: "contactEmail",
    header: "Email",
  },
  {
    accessorKey: "contactPhone",
    header: "Phone",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (
        <Badge variant={status === "Active" ? "default" : "secondary"} className="dark:bg-secondary-dark dark:text-secondary-dark-foreground">
          {status as string}
        </Badge>
      )
    },
  },
  {
    accessorKey: "lastOrderDate",
    header: "Last Order",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastOrderDate"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const hospital = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(hospital.id)}
            >
              Copy hospital ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit hospital</DropdownMenuItem>
            <DropdownMenuItem>View order history</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function HospitalsTable({ data }: { data: Hospital[] }) {
  return <DataTable columns={columns} data={data} />
}

