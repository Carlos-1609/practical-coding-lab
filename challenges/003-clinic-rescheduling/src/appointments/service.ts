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

  getDoctorAppointments(id: number): Appointment[] {
    return this.repository.findPractitionerAppointments(id);
  }

  checkOverlappingAppointments(
    appointments: Appointment[],
    currAppt: Appointment,
    newStartAt: string,
  ): Appointment | undefined {
    const validAppts = appointments.filter(
      (appt) => appt.status === "scheduled" && appt.id !== currAppt.id,
    );

    const newStartTime = Date.parse(newStartAt);
    const newEndTime = newStartTime + currAppt.durationMinutes * 60_000;

    for (const appt of validAppts) {
      const currStartTime = Date.parse(appt.startsAt);
      const currEndTime = currStartTime + appt.durationMinutes * 60_000;

      if (newStartTime < currEndTime && newEndTime > currStartTime) {
        return undefined;
      }
    }

    return this.repository.rescheduleAppointment(currAppt.id, newStartAt);
  }
}
