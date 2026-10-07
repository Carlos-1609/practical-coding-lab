import type { Appointment } from "./types.js";

export class AppointmentRepository {
  private readonly appointments: Appointment[];

  constructor(initialAppointments: Appointment[]) {
    this.appointments = initialAppointments.map((appointment) => ({
      ...appointment,
    }));
  }

  findAll(): Appointment[] {
    return this.appointments.map((appointment) => ({ ...appointment }));
  }

  findById(id: number): Appointment | undefined {
    const appointment = this.appointments.find((item) => item.id === id);
    return appointment ? { ...appointment } : undefined;
  }

  findPractitionerAppointments(id: number): Appointment[] {
    const appointments = this.appointments;
    return appointments.filter((appt) => appt.practitionerId === id);
  }

  rescheduleAppointment(appointmentID: number, startsAt: string) {
    const exists = this.findById(appointmentID);
    if (exists === undefined) {
      return undefined;
    }
    for (const appt of this.appointments) {
      if (appt.id === appointmentID) {
        appt.startsAt = startsAt;
      }
    }
    return this.findById(appointmentID);
  }
}
