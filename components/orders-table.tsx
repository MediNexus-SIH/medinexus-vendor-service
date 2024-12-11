"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";

export type Order = {
  id: string;
  hospitalName: string;
  itemName: string;
  quantity: number;
  totalPrice: number;
  paymentStatus: "Paid" | "Unpaid";
  stockStatus: "Available" | "Unavailable";
  orderStatus: "Pending" | "Accepted" | "Declined";
  orderDate: string;
};

export function OrdersTable({
  data,
  onAcceptOrder,
  onDeclineOrder,
}: {
  data: Order[];
  onAcceptOrder: (id: string) => void;
  onDeclineOrder: (id: string) => void;
}) {
  const handleAcceptOrder = (id: string) => {
    onAcceptOrder(id);
  };

  const handleDeclineOrder = (id: string) => {
    onDeclineOrder(id);
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      accessorKey: "hospitalName",
      header: "Hospital Name",
    },
    {
      accessorKey: "itemName",
      header: "Item",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "totalPrice",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Total Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalPrice"));
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => {
        const status = row.getValue("paymentStatus");
        return (
          <Badge
            variant={status === "Paid" ? "default" : "destructive"}
            className="dark:bg-destructive-dark dark:text-destructive-dark-foreground"
          >
            {status as string}
          </Badge>
        );
      },
    },
    {
      accessorKey: "stockStatus",
      header: "Stock Status",
      cell: ({ row }) => {
        const status = row.getValue("stockStatus");
        return (
          <Badge
            variant={status === "Available" ? "default" : "destructive"}
            className="dark:bg-destructive-dark dark:text-destructive-dark-foreground"
          >
            {status as string}
          </Badge>
        );
      },
    },
    {
      accessorKey: "orderStatus",
      header: "Order Status",
      cell: ({ row }) => {
        const status = row.getValue("orderStatus");
        return (
          <Badge
            variant={
              status === "Accepted"
                ? "default"
                : status === "Declined"
                ? "destructive"
                : "secondary"
            }
            className="dark:bg-destructive-dark dark:text-destructive-dark-foreground"
          >
            {status as string}
          </Badge>
        );
      },
    },
    {
      accessorKey: "orderDate",
      header: "Order Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("orderDate"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;

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
                onClick={() => navigator.clipboard.writeText(order.id)}
              >
                Copy order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View details</DropdownMenuItem>
              {order.orderStatus === "Pending" && (
                <>
                  <DropdownMenuItem onClick={() => handleAcceptOrder(order.id)}>
                    <Check className="mr-2 h-4 w-4" /> Accept order
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeclineOrder(order.id)}>
                    <X className="mr-2 h-4 w-4" /> Decline order
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
