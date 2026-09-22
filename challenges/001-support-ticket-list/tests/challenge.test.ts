import assert from "node:assert/strict";
import { test } from "node:test";
import request from "supertest";
import { createApp } from "../src/app.js";

test("default pagination returns the first five tickets and metadata", async () => {
  const response = await request(createApp()).get("/api/tickets");
  assert.equal(response.status, 200);
  assert.deepEqual(response.body.data.map((ticket: { id: number }) => ticket.id), [108, 107, 106, 105, 104]);
  assert.deepEqual(response.body.meta, { page: 1, pageSize: 5, total: 8, totalPages: 2 });
});

test("search ignores case and outer whitespace and matches titles or customer names", async () => {
  const byTitle = await request(createApp()).get("/api/tickets").query({ search: "  LOGIN  " });
  assert.equal(byTitle.status, 200);
  assert.deepEqual(byTitle.body.data.map((ticket: { id: number }) => ticket.id), [108, 104]);
  assert.equal(byTitle.body.meta.total, 2);

  const byCustomer = await request(createApp()).get("/api/tickets").query({ search: "logan" });
  assert.equal(byCustomer.status, 200);
  assert.deepEqual(byCustomer.body.data.map((ticket: { id: number }) => ticket.id), [107]);

  const blank = await request(createApp()).get("/api/tickets").query({ search: "   " });
  assert.equal(blank.status, 200);
  assert.equal(blank.body.meta.total, 8);
});

test("search and status filter work together before pagination", async () => {
  const response = await request(createApp()).get("/api/tickets").query({ search: "login", status: "open", page: "2", pageSize: "1" });
  assert.equal(response.status, 200);
  assert.deepEqual(response.body.data.map((ticket: { id: number }) => ticket.id), [104]);
  assert.deepEqual(response.body.meta, { page: 2, pageSize: 1, total: 2, totalPages: 2 });
});

test("pages beyond the end and searches without matches have accurate metadata", async () => {
  const beyond = await request(createApp()).get("/api/tickets").query({ page: "3", pageSize: "4" });
  assert.equal(beyond.status, 200);
  assert.deepEqual(beyond.body.data, []);
  assert.deepEqual(beyond.body.meta, { page: 3, pageSize: 4, total: 8, totalPages: 2 });

  const none = await request(createApp()).get("/api/tickets").query({ search: "no such ticket" });
  assert.equal(none.status, 200);
  assert.deepEqual(none.body.data, []);
  assert.deepEqual(none.body.meta, { page: 1, pageSize: 5, total: 0, totalPages: 0 });
});

test("invalid pagination values return HTTP 400", async () => {
  const app = createApp();
  for (const query of [
    { page: "0" },
    { page: "-1" },
    { page: "1.5" },
    { page: "abc" },
    { pageSize: "0" },
    { pageSize: "21" },
    { pageSize: "2.5" },
    { pageSize: "abc" }
  ]) {
    const response = await request(app).get("/api/tickets").query(query);
    assert.equal(response.status, 400, `Expected HTTP 400 for ${JSON.stringify(query)}`);
    assert.equal(typeof response.body.error, "string");
  }
});
