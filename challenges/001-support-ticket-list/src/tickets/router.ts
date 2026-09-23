import { Router } from "express";
import { TicketService } from "./service.js";
import { isTicketStatus } from "./types.js";
import { error } from "console";

export function createTicketRouter(service: TicketService): Router {
  const router = Router();

  router.get("/", (request, response) => {
    const { status, search, page = 1, pageSize = 5 } = request.query;
    const newPage = +page;
    const newPageSize = +pageSize;
    if (!Number.isInteger(newPage) || newPage < 1) {
      response.status(400).json({
        error: "Page number needs to be a whole number greater than 0",
      });
      return;
    }

    if (!Number.isInteger(newPageSize) || newPageSize < 1 || newPageSize > 20) {
      response.status(400).json({
        error:
          "Page size needs to be a whole number and needs to be between 1-20",
      });
      return;
    }

    if (typeof search !== "string" && search !== undefined) {
      response
        .status(400)
        .json({ error: "Search value needs to be a text or empty" });
      return;
    }

    if (status !== undefined && !isTicketStatus(status)) {
      response.status(400).json({ error: "Invalid status" });
      return;
    }

    if (search?.trim().length === 0) {
      response.json(service.listTickets(newPage, newPageSize, status, ""));
    } else {
      response.json(service.listTickets(newPage, newPageSize, status, search));
    }
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
    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof customerName !== "string" ||
      !customerName.trim()
    ) {
      response
        .status(400)
        .json({ error: "Title and customer name are required" });
      return;
    }

    const ticket = service.createTicket({
      title: title.trim(),
      customerName: customerName.trim(),
    });
    response.status(201).json({ data: ticket });
  });

  return router;
}
