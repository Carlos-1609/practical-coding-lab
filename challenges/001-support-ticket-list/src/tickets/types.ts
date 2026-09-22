export type TicketStatus = "open" | "pending" | "closed";

export interface Ticket {
  id: number;
  title: string;
  customerName: string;
  status: TicketStatus;
  createdAt: string;
}

export interface NewTicket {
  title: string;
  customerName: string;
}

export const ticketStatuses: readonly TicketStatus[] = ["open", "pending", "closed"];

export function isTicketStatus(value: unknown): value is TicketStatus {
  return typeof value === "string" && ticketStatuses.includes(value as TicketStatus);
}
