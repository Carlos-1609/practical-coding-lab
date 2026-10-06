import type { Appointment } from "./types.js";

export const seedAppointments: Appointment[] = [
  {
    id: 301,
    patientName: "Amira Patel",
    practitionerId: 41,
    practitionerName: "Dr. Morgan Lee",
    startsAt: "2099-06-15T13:00:00.000Z",
    durationMinutes: 30,
    status: "scheduled",
  },
  {
    id: 302,
    patientName: "Noah Williams",
    practitionerId: 41,
    practitionerName: "Dr. Morgan Lee",
    startsAt: "2099-06-15T14:00:00.000Z",
    durationMinutes: 60,
    status: "scheduled",
  },
  {
    id: 303,
    patientName: "Sofia Chen",
    practitionerId: 52,
    practitionerName: "Dr. Riley Adams",
    startsAt: "2099-06-15T14:00:00.000Z",
    durationMinutes: 30,
    status: "scheduled",
  },
  {
    id: 304,
    patientName: "Ethan Brown",
    practitionerId: 41,
    practitionerName: "Dr. Morgan Lee",
    startsAt: "2099-06-15T15:00:00.000Z",
    durationMinutes: 30,
    status: "cancelled",
  },
  {
    id: 305,
    patientName: "Olivia Martin",
    practitionerId: 52,
    practitionerName: "Dr. Riley Adams",
    startsAt: "2099-06-14T10:00:00.000Z",
    durationMinutes: 45,
    status: "completed",
  },
];

