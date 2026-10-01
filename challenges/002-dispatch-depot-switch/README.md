# Challenge 002: Dispatch dashboard

## Scenario

A delivery company uses a small internal dashboard to review deliveries at each depot. Dispatchers can choose a depot, filter deliveries by status, and search by reference or customer name. A dispatcher reported that the dashboard sometimes shows deliveries from the wrong depot.

## Task

Investigate and fix the depot-switching issue so the visible deliveries and count always match the selected depot and active filters.

## Requirements

- Selecting a depot must immediately show only deliveries assigned to that depot.
- The displayed delivery count must match the cards currently shown.
- The status and search filters must continue to work after changing depots.
- Changing depots must preserve the current status and search selections.
- Search must continue to match delivery references and customer names without regard to case.

## Expected Behavior

**Current behavior:** When the dashboard first opens, North Depot's deliveries appear. After selecting South Depot, the heading changes, but the delivery cards and count can still reflect North Depot. Changing another filter may cause the cards to catch up.

**Expected behavior:** The cards and count update as soon as South Depot is selected. Any active status or search filter still applies to South Depot's deliveries.

**Steps to reproduce:**

1. Start the application and note the deliveries shown for North Depot.
2. Select South Depot without changing any other control.
3. Compare the heading, count, and delivery cards.
4. Repeat while a status filter is active.

## Constraints

- Use the existing React and TypeScript application.
- Keep the depot, status, and search controls and their current user-facing behavior.
- Keep the supplied delivery data in memory; no backend or database is needed.

## Running the Project

From this challenge directory:

1. Run `npm install`.
2. Run `npm run dev` and open the local URL printed by Vite.
3. Run `npm test` for the component tests. Tests covering the reported issue are expected to fail before the fix.
4. Run `npm run check` to type-check the project.

## Completion Criteria

- Switching depots immediately updates the cards and count.
- Status and search filters still give the correct results after a depot switch.
- Existing filter behavior remains intact.
- All tests and type-checking pass.
