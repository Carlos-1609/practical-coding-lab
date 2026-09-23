import { TicketRepository } from "./repository.js";
import type { NewTicket, Ticket, TicketStatus } from "./types.js";

export class TicketService {
  constructor(private readonly repository: TicketRepository) {}

  listTickets(
    page: number,
    pageSize: number,
    status?: TicketStatus,
    search?: string,
  ) {
    // Status is empty or not
    // Seearch no es empty
    // Search and Status
    let sorted: Ticket[] = [];
    const tickets = this.repository.findAll();
    let matching = status
      ? tickets.filter((ticket) => ticket.status === status)
      : tickets;

    if (search?.trim().length !== 0 && search !== undefined) {
      const searched = matching.filter((ticket) => {
        if (
          ticket.customerName
            .toLocaleLowerCase()
            .trim()
            .includes(search?.trim().toLocaleLowerCase()) ||
          ticket.title
            .toLowerCase()
            .trim()
            .includes(search?.trim().toLocaleLowerCase())
        ) {
          return ticket;
        }
      });
      sorted = [
        ...searched.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      ];
    } else {
      sorted = [
        ...matching.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      ];
    }

    if (sorted.length === 0) {
      return {
        data: [],
        meta: {
          page,
          pageSize,
          total: 0,
          totalPages: 0,
        },
      };
    }

    let currTickets: Ticket[] = [];
    let currPage = 1;
    let paginatedTickets: Record<number, Ticket[]> = {};
    for (let i = 0; i < sorted.length; i++) {
      if (currTickets.length === pageSize) {
        paginatedTickets = { ...paginatedTickets, [currPage]: currTickets };
        currTickets = [];
        currPage++;
      }
      currTickets.push(sorted[i]);
    }
    if (currTickets.length > 0) {
      paginatedTickets = { ...paginatedTickets, [currPage]: currTickets };
    }
    const meta = {
      page,
      pageSize,
      total: sorted.length,
      totalPages: currPage,
    };
    return { data: page > currPage ? [] : paginatedTickets[page], meta };
  }

  getTicket(id: number): Ticket | undefined {
    return this.repository.findById(id);
  }

  createTicket(input: NewTicket): Ticket {
    return this.repository.create(input);
  }
}
