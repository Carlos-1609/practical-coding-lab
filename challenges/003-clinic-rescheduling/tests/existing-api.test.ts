import assert from "node:assert/strict";
import { test } from "node:test";
import request from "supertest";
import { createApp } from "../src/app.js";

test("health check is available", async () => {
  const response = await request(createApp()).get("/health");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok" });
});

test("appointments are listed in chronological order", async () => {
  const response = await request(createApp()).get("/api/appointments");

  assert.equal(response.status, 200);
  assert.equal(response.body.data.length, 5);
  assert.deepEqual(
    response.body.data.map((appointment: { id: number }) => appointment.id),
    [305, 301, 302, 303, 304],
  );
});

test("an appointment can be retrieved by ID", async () => {
  const response = await request(createApp()).get("/api/appointments/301");

  assert.equal(response.status, 200);
  assert.equal(response.body.data.patientName, "Amira Patel");
  assert.equal(response.body.data.practitionerName, "Dr. Morgan Lee");
});

test("invalid and unknown appointment IDs return errors", async () => {
  const app = createApp();
  const invalid = await request(app).get("/api/appointments/not-a-number");
  const missing = await request(app).get("/api/appointments/999");

  assert.equal(invalid.status, 400);
  assert.equal(typeof invalid.body.error, "string");
  assert.equal(missing.status, 404);
  assert.equal(typeof missing.body.error, "string");
});

