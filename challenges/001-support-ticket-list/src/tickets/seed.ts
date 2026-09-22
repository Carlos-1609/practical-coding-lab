import type { Ticket } from "./types.js";

export const seedTickets: Ticket[] = [
  { id: 101, title: "Cannot sign in", customerName: "Maya Chen", status: "open", createdAt: "2026-09-08T09:00:00.000Z" },
  { id: 102, title: "Invoice has wrong address", customerName: "Jordan Lee", status: "pending", createdAt: "2026-09-09T10:30:00.000Z" },
  { id: 103, title: "Reset password link expired", customerName: "Avery Patel", status: "closed", createdAt: "2026-09-10T13:00:00.000Z" },
  { id: 104, title: "Login page shows an error", customerName: "Sam Rivera", status: "open", createdAt: "2026-09-11T08:15:00.000Z" },
  { id: 105, title: "Need a receipt", customerName: "Taylor Morgan", status: "pending", createdAt: "2026-09-12T16:45:00.000Z" },
  { id: 106, title: "Team invitation missing", customerName: "Riley Brooks", status: "open", createdAt: "2026-09-13T11:20:00.000Z" },
  { id: 107, title: "Billing question", customerName: "Logan Price", status: "closed", createdAt: "2026-09-14T14:10:00.000Z" },
  { id: 108, title: "Mobile login trouble", customerName: "Casey Nguyen", status: "open", createdAt: "2026-09-15T07:50:00.000Z" }
];
