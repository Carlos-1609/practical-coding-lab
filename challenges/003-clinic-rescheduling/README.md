# Challenge 003: Clinic appointment rescheduling

## Scenario

You have joined the team behind a small clinic scheduling API. Reception staff can already list appointments and view an individual appointment. They currently have to cancel and recreate an appointment whenever a patient asks for a different time, which can lead to mistakes and duplicate records.

## Task

Add support for rescheduling an existing appointment through `PATCH /api/appointments/:id/reschedule`.

## Requirements

- Accept a JSON body containing `startsAt`, expressed as a valid ISO 8601 UTC timestamp.
- Only appointments with a status of `scheduled` can be rescheduled.
- The new appointment must start on a weekday at or after 09:00 UTC and must finish by 17:00 UTC.
- Prevent the rescheduled appointment from overlapping another scheduled appointment for the same practitioner. Appointments that touch at their start or end times do not overlap.
- Cancelled appointments must not block a time slot.
- Preserve the appointment's ID, patient, practitioner, duration, and status when it is rescheduled.
- Return the updated appointment with HTTP 200 when the request succeeds.
- Return HTTP 400 when the appointment ID or `startsAt` value is invalid, or when the requested time is outside clinic hours.
- Return HTTP 404 when the appointment does not exist.
- Return HTTP 409 when the appointment cannot be rescheduled because of its status or a scheduling conflict.
- A rejected request must leave the stored appointment unchanged.

## Expected Behavior

When reception sends a valid rescheduling request, the existing appointment's start time changes and later reads return the updated appointment. Requests for weekends, times outside clinic hours, occupied time slots, or appointments that are no longer scheduled receive an error response and do not change any appointment data.

All error responses should contain an `error` property with a human-readable string.

## Constraints

- Use the existing TypeScript, Express, and in-memory application.
- Keep the current endpoint paths and appointment response fields compatible.
- Treat stored timestamps and clinic hours as UTC.
- Do not add a database or external scheduling service.

## Running the Project

From this challenge directory:

1. Run `npm install`.
2. Run `npm run dev` to start the API at `http://localhost:3000`.
3. Run `npm test` for the API tests. Tests for the requested endpoint are expected to fail until you complete the task.
4. Run `npm run check` to type-check the project.

## Completion Criteria

- A scheduled appointment can be moved to an available weekday time during clinic hours.
- Invalid times, unavailable appointments, and scheduling conflicts return the appropriate HTTP status.
- Rejected requests do not modify stored appointment data.
- Existing appointment endpoints continue to work.
- All tests and type-checking pass.

