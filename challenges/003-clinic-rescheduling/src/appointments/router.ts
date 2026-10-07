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

  router.patch("/:id/reschedule", (request, response) => {
    const id = Number(request.params.id);
    const { startsAt } = request.body;
    if (!Number.isInteger(id) || id < 1) {
      response.status(400).json({
        error:
          "Appointment id needs to be a whole number and needs to be positive",
      });
      return;
    }

    const appointment = service.getAppointment(id);

    if (!appointment) {
      response.status(404).json({ error: "Appointment not found" });
      return;
    }

    if (appointment.status !== "scheduled") {
      response
        .status(409)
        .json({ error: "Appointment needs to be in scheduled status" });
      return;
    }

    if (
      typeof startsAt !== "string" ||
      !startsAt.endsWith("Z") ||
      Number.isNaN(Date.parse(startsAt))
    ) {
      response.status(400).json({
        error: "Please make sure the date is a text and is in UTC format",
      });
      return;
    }
    const requestedDate = new Date(startsAt);
    const minutes = requestedDate.getUTCMinutes();
    const hour = requestedDate.getUTCHours();
    const day = requestedDate.getUTCDay();

    const startMins = hour * 60 + minutes;
    const endMins = startMins + appointment.durationMinutes;

    if (day < 1 || day > 5) {
      response.status(400).json({
        error: "Please make sure the day is a weekday, no weekend appointments",
      });
      return;
    }

    if (startMins < 540 || endMins > 1020) {
      response.status(400).json({
        error:
          "Please make sure the time is between 9am and 5pm, including the appointment time",
      });
      return;
    }
    const practionerAppts = service.getDoctorAppointments(
      appointment.practitionerId,
    );

    const updadtedScheduled = service.checkOverlappingAppointments(
      practionerAppts,
      appointment,
      startsAt,
    );

    if (updadtedScheduled === undefined) {
      response.status(409).json({
        error:
          "The requested timeslot is not available please choose a different one",
      });
      return;
    }

    return response.status(200).json({ data: updadtedScheduled });
  });
  return router;
}
