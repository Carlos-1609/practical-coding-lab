import express from "express";
import { AppointmentRepository } from "./appointments/repository.js";
import { createAppointmentRouter } from "./appointments/router.js";
import { seedAppointments } from "./appointments/seed.js";
import { AppointmentService } from "./appointments/service.js";

export function createApp() {
  const app = express();
  const repository = new AppointmentRepository(seedAppointments);
  const service = new AppointmentService(repository);

  app.use(express.json());
  app.get("/health", (_request, response) => response.json({ status: "ok" }));
  app.use("/api/appointments", createAppointmentRouter(service));

  return app;
}

