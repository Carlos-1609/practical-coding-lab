import assert from "node:assert/strict";
import { test } from "node:test";
import request from "supertest";
import { createApp } from "../src/app.js";

test("health check is available", async () => {
  const response = await request(createApp()).get("/health");
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok" });
});

test("tickets are listed newest first", async () => {
  const response = await request(createApp()).get("/api/tickets");
  assert.equal(response.status, 200);
  assert.ok(response.body.data.length > 0);
  assert.deepEqual(
    response.body.data.map((ticket: { id: number }) => ticket.id),
    [...response.body.data].sort((a: { createdAt: string }, b: { createdAt: string }) => b.createdAt.localeCompare(a.createdAt)).map((ticket: { id: number }) => ticket.id)
  );
});

test("existing status filter and validation work", async () => {
  const app = createApp();
  const filtered = await request(app).get("/api/tickets?status=open");
  assert.equal(filtered.status, 200);
  assert.deepEqual(filtered.body.data.map((ticket: { id: number }) => ticket.id), [108, 106, 104, 101]);

  const invalid = await request(app).get("/api/tickets?status=archived");
  assert.equal(invalid.status, 400);
});

test("a ticket can be retrieved and a new ticket can be created", async () => {
  const app = createApp();
  const created = await request(app).post("/api/tickets").send({ title: "  Export fails  ", customerName: "  Alex Kim  " });
  assert.equal(created.status, 201);
  assert.equal(created.body.data.title, "Export fails");
  assert.equal(created.body.data.customerName, "Alex Kim");
  assert.equal(created.body.data.status, "open");

  const fetched = await request(app).get(`/api/tickets/${created.body.data.id}`);
  assert.equal(fetched.status, 200);
  assert.deepEqual(fetched.body.data, created.body.data);
});
