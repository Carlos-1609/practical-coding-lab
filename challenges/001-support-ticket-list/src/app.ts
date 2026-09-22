import express from "express";
import { TicketRepository } from "./tickets/repository.js";
import { createTicketRouter } from "./tickets/router.js";
import { seedTickets } from "./tickets/seed.js";
import { TicketService } from "./tickets/service.js";

export function createApp() {
  const app = express();
  const repository = new TicketRepository(seedTickets);
  const service = new TicketService(repository);

  app.use(express.json());
  app.get("/health", (_request, response) => response.json({ status: "ok" }));
  app.use("/api/tickets", createTicketRouter(service));

  return app;
}
