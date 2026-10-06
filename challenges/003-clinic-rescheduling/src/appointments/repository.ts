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
}

