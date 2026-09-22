import type { NewTicket, Ticket } from "./types.js";

export class TicketRepository {
  private readonly tickets: Ticket[];
  private nextId: number;

  constructor(initialTickets: Ticket[]) {
    this.tickets = initialTickets.map((ticket) => ({ ...ticket }));
    this.nextId = Math.max(100, ...initialTickets.map((ticket) => ticket.id)) + 1;
  }

  findAll(): Ticket[] {
    return this.tickets.map((ticket) => ({ ...ticket }));
  }

  findById(id: number): Ticket | undefined {
    const ticket = this.tickets.find((item) => item.id === id);
    return ticket ? { ...ticket } : undefined;
  }

  create(input: NewTicket): Ticket {
    const ticket: Ticket = {
      id: this.nextId++,
      title: input.title,
      customerName: input.customerName,
      status: "open",
      createdAt: new Date().toISOString()
    };

    this.tickets.push(ticket);
    return { ...ticket };
  }
}
