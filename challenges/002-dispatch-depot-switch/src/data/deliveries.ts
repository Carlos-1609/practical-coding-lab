export type DepotId = "north" | "south";
export type DeliveryStatus = "pending" | "delivered";
export type StatusFilter = "all" | DeliveryStatus;

export interface Delivery {
  id: string;
  customerName: string;
  address: string;
  depotId: DepotId;
  status: DeliveryStatus;
  createdAt: string;
}

export const depots: ReadonlyArray<{ id: DepotId; name: string }> = [
  { id: "north", name: "North Depot" },
  { id: "south", name: "South Depot" }
];

export const deliveries: Delivery[] = [
  { id: "ND-101", customerName: "Maya Chen", address: "18 Birch Street", depotId: "north", status: "pending", createdAt: "2026-09-18T09:30:00.000Z" },
  { id: "ND-102", customerName: "Jordan Lee", address: "54 Pine Avenue", depotId: "north", status: "delivered", createdAt: "2026-09-19T14:15:00.000Z" },
  { id: "ND-103", customerName: "Avery Patel", address: "7 Cedar Road", depotId: "north", status: "pending", createdAt: "2026-09-20T11:00:00.000Z" },
  { id: "SD-201", customerName: "Sam Rivera", address: "22 Harbour Lane", depotId: "south", status: "pending", createdAt: "2026-09-17T08:45:00.000Z" },
  { id: "SD-202", customerName: "Taylor Morgan", address: "91 Lake Drive", depotId: "south", status: "delivered", createdAt: "2026-09-20T16:40:00.000Z" },
  { id: "SD-203", customerName: "Riley Brooks", address: "3 Orchard Crescent", depotId: "south", status: "pending", createdAt: "2026-09-21T10:10:00.000Z" },
  { id: "SD-204", customerName: "Casey Nguyen", address: "45 Bay Street", depotId: "south", status: "delivered", createdAt: "2026-09-22T13:20:00.000Z" }
];
