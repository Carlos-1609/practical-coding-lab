import { Router } from "express";
import { TicketService } from "./service.js";
import { isTicketStatus } from "./types.js";

export function createTicketRouter(service: TicketService): Router {
  const router = Router();

  router.get("/", (request, response) => {
    const { status } = request.query;
    if (status !== undefined && !isTicketStatus(status)) {
      response.status(400).json({ error: "Invalid status" });
      return;
    }

    response.json({ data: service.listTickets(status) });
  });

  router.get("/:id", (request, response) => {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id < 1) {
      response.status(400).json({ error: "Invalid ticket ID" });
      return;
    }

    const ticket = service.getTicket(id);
    if (!ticket) {
      response.status(404).json({ error: "Ticket not found" });
      return;
    }

    response.json({ data: ticket });
  });

  router.post("/", (request, response) => {
    const { title, customerName } = request.body ?? {};
    if (typeof title !== "string" || !title.trim() || typeof customerName !== "string" || !customerName.trim()) {
      response.status(400).json({ error: "Title and customer name are required" });
      return;
    }

    const ticket = service.createTicket({ title: title.trim(), customerName: customerName.trim() });
    response.status(201).json({ data: ticket });
  });

  return router;
}
