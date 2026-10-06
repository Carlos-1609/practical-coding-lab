import assert from "node:assert/strict";
import { test } from "node:test";
import request from "supertest";
import { createApp } from "../src/app.js";

const endpoint = "/api/appointments/301/reschedule";

test("reschedules an appointment and persists the updated start time", async () => {
  const app = createApp();
  const startsAt = "2099-06-16T11:30:00.000Z";

  const updated = await request(app).patch(endpoint).send({ startsAt });

  assert.equal(updated.status, 200);
  assert.deepEqual(updated.body.data, {
    id: 301,
    patientName: "Amira Patel",
    practitionerId: 41,
    practitionerName: "Dr. Morgan Lee",
    startsAt,
    durationMinutes: 30,
    status: "scheduled",
  });

  const fetched = await request(app).get("/api/appointments/301");
  assert.equal(fetched.body.data.startsAt, startsAt);
});

test("rejects invalid appointment IDs and invalid start times", async () => {
  const app = createApp();
  const invalidRequests = [
    {
      path: "/api/appointments/not-a-number/reschedule",
      body: { startsAt: "2099-06-16T11:30:00.000Z" },
    },
    { path: endpoint, body: {} },
    { path: endpoint, body: { startsAt: 123 } },
    { path: endpoint, body: { startsAt: "tomorrow morning" } },
    { path: endpoint, body: { startsAt: "2099-06-16T11:30:00+02:00" } },
  ];

  for (const invalidRequest of invalidRequests) {
    const response = await request(app)
      .patch(invalidRequest.path)
      .send(invalidRequest.body);
    assert.equal(response.status, 400);
    assert.equal(typeof response.body.error, "string");
  }
});

test("returns 404 when the appointment does not exist", async () => {
  const response = await request(createApp())
    .patch("/api/appointments/999/reschedule")
    .send({ startsAt: "2099-06-16T11:30:00.000Z" });

  assert.equal(response.status, 404);
  assert.equal(typeof response.body.error, "string");
});

test("rejects weekends and appointments outside clinic hours", async () => {
  const app = createApp();

  for (const startsAt of [
    "2099-06-20T10:00:00.000Z",
    "2099-06-16T08:30:00.000Z",
    "2099-06-16T16:45:00.000Z",
  ]) {
    const response = await request(app).patch(endpoint).send({ startsAt });
    assert.equal(response.status, 400, `Expected HTTP 400 for ${startsAt}`);
    assert.equal(typeof response.body.error, "string");
  }
});

test("rejects appointments that are not currently scheduled", async () => {
  const app = createApp();

  for (const id of [304, 305]) {
    const response = await request(app)
      .patch(`/api/appointments/${id}/reschedule`)
      .send({ startsAt: "2099-06-16T11:30:00.000Z" });

    assert.equal(response.status, 409);
    assert.equal(typeof response.body.error, "string");
  }
});

test("rejects overlaps for the same practitioner and keeps the original time", async () => {
  const app = createApp();
  const response = await request(app)
    .patch(endpoint)
    .send({ startsAt: "2099-06-15T14:30:00.000Z" });

  assert.equal(response.status, 409);
  assert.equal(typeof response.body.error, "string");

  const fetched = await request(app).get("/api/appointments/301");
  assert.equal(fetched.body.data.startsAt, "2099-06-15T13:00:00.000Z");
});

test("allows adjacent appointments and ignores cancelled appointments", async () => {
  const response = await request(createApp())
    .patch(endpoint)
    .send({ startsAt: "2099-06-15T15:00:00.000Z" });

  assert.equal(response.status, 200);
  assert.equal(response.body.data.startsAt, "2099-06-15T15:00:00.000Z");
});

test("appointments for a different practitioner do not cause a conflict", async () => {
  const response = await request(createApp())
    .patch("/api/appointments/303/reschedule")
    .send({ startsAt: "2099-06-15T13:00:00.000Z" });

  assert.equal(response.status, 200);
});
