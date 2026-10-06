export type AppointmentStatus = "scheduled" | "completed" | "cancelled";

export interface Appointment {
  id: number;
  patientName: string;
  practitionerId: number;
  practitionerName: string;
  startsAt: string;
  durationMinutes: number;
  status: AppointmentStatus;
}

