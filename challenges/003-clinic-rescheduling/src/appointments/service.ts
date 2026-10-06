import { AppointmentRepository } from "./repository.js";
import type { Appointment } from "./types.js";

export class AppointmentService {
  constructor(private readonly repository: AppointmentRepository) {}

  listAppointments(): Appointment[] {
    return this.repository
      .findAll()
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  }

  getAppointment(id: number): Appointment | undefined {
    return this.repository.findById(id);
  }
}

