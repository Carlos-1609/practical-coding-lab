import { Router } from "express";
import { AppointmentService } from "./service.js";

export function createAppointmentRouter(service: AppointmentService): Router {
  const router = Router();

  router.get("/", (_request, response) => {
    response.json({ data: service.listAppointments() });
  });

  router.get("/:id", (request, response) => {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id < 1) {
      response.status(400).json({ error: "Invalid appointment ID" });
      return;
    }

    const appointment = service.getAppointment(id);
    if (!appointment) {
      response.status(404).json({ error: "Appointment not found" });
      return;
    }

    response.json({ data: appointment });
  });

  return router;
}

