# Challenge 001: Support ticket list

## Scenario

You have joined the team behind a small customer-support dashboard. Agents use its ticket API to review recent requests. The API already lists tickets, filters by status, retrieves an individual ticket, and creates a ticket. As the team takes on more customers, the list endpoint has become difficult to use.

## Task

Update `GET /api/tickets` so agents can search tickets and move through the results one page at a time.

## Requirements

- Accept an optional `search` query parameter. Match ticket titles and customer names without regard to letter case. Ignore whitespace at the beginning and end of the search term. An empty or whitespace-only term should behave as though no search term was supplied.
- Keep the existing optional `status` filter. When both filters are supplied, a ticket must satisfy both.
- Accept optional `page` and `pageSize` query parameters. `page` starts at 1. `pageSize` must be between 1 and 20. Both values must be whole numbers. Use page 1 and a page size of 5 when they are omitted.
- Return HTTP 400 with an error response for invalid pagination values.
- Continue ordering matching tickets from newest to oldest before selecting a page.
- Include `meta` in the list response with `page`, `pageSize`, `total`, and `totalPages`. `total` is the number of matching tickets before pagination. `totalPages` is 0 when there are no matches.
- Preserve the existing ticket fields and behavior of the other API endpoints.

## Expected Behavior

For a request to `GET /api/tickets?search=login&status=open&page=2&pageSize=5`, the API returns the second page of open tickets whose title or customer name contains “login”, regardless of case. The `data` array contains only that page, and `meta` describes the complete set of matching tickets. A page beyond the end returns an empty `data` array with accurate metadata.

## Constraints

- Use TypeScript and keep the API in memory; no database is needed.
- The existing endpoint paths and request and ticket response fields must remain compatible.
- Invalid values of the existing `status` parameter must continue to return HTTP 400.

## Running the Project

From this challenge directory:

1. Run `npm install`.
2. Run `npm run dev` to start the API at `http://localhost:3000`.
3. Run `npm test` for the API tests. The tests for the requested behavior are expected to fail until you complete the task.
4. Run `npm run check` to type-check the project.

## Completion Criteria

- Search finds matching titles and customer names and works together with status filtering.
- Valid pagination returns the correct tickets and metadata, including empty result pages.
- Invalid pagination requests receive HTTP 400.
- Existing ticket retrieval and creation still work.
- Tests and type-checking pass.
