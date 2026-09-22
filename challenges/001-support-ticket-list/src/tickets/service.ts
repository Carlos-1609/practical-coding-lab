import { TicketRepository } from "./repository.js";
import type { NewTicket, Ticket, TicketStatus } from "./types.js";

export class TicketService {
  constructor(private readonly repository: TicketRepository) {}

  listTickets(status?: TicketStatus): Ticket[] {
    const tickets = this.repository.findAll();
    const matching = status ? tickets.filter((ticket) => ticket.status === status) : tickets;
    return matching.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  getTicket(id: number): Ticket | undefined {
    return this.repository.findById(id);
  }

  createTicket(input: NewTicket): Ticket {
    return this.repository.create(input);
  }
}
