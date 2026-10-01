import { describe, expect, it } from "@jest/globals";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

function results() {
  return screen.getByRole("region", { name: "Delivery results" });
}

describe("dispatch dashboard", () => {
  it("shows North Depot deliveries on first load", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "North Depot" })).toBeTruthy();
    expect(within(results()).getByText("Showing 3 deliveries")).toBeTruthy();
    expect(within(results()).getByText("ND-101")).toBeTruthy();
    expect(within(results()).queryByText("SD-201")).toBeNull();
  });

  it("filters the current depot by status and search", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Pending" }));
    expect(within(results()).getByText("Showing 2 deliveries")).toBeTruthy();
    expect(within(results()).getByText("ND-101")).toBeTruthy();
    expect(within(results()).queryByText("ND-102")).toBeNull();

    await user.type(screen.getByRole("searchbox", { name: "Search deliveries" }), "maya");
    expect(within(results()).getByText("Showing 1 delivery")).toBeTruthy();
    expect(within(results()).getByText("ND-101")).toBeTruthy();
    expect(within(results()).queryByText("ND-103")).toBeNull();
  });

  it("updates the cards and count immediately when the depot changes", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByRole("combobox", { name: "Depot" }), "south");

    expect(screen.getByRole("heading", { name: "South Depot" })).toBeTruthy();
    expect(within(results()).getByText("Showing 4 deliveries")).toBeTruthy();
    expect(within(results()).getByText("SD-201")).toBeTruthy();
    expect(within(results()).queryByText("ND-101")).toBeNull();
  });

  it("keeps an active status filter when switching depots", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Pending" }));
    await user.selectOptions(screen.getByRole("combobox", { name: "Depot" }), "south");

    expect(screen.getByRole("button", { name: "Pending" }).getAttribute("aria-pressed")).toBe("true");
    expect(within(results()).getByText("Showing 2 deliveries")).toBeTruthy();
    expect(within(results()).getByText("SD-201")).toBeTruthy();
    expect(within(results()).queryByText("ND-101")).toBeNull();
  });

  it("keeps an active search term when switching depots", async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchbox = screen.getByRole("searchbox", { name: "Search deliveries" }) as HTMLInputElement;
    await user.type(searchbox, "SD-");
    await user.selectOptions(screen.getByRole("combobox", { name: "Depot" }), "south");

    expect(searchbox.value).toBe("SD-");
    expect(within(results()).getByText("Showing 4 deliveries")).toBeTruthy();
    expect(within(results()).getByText("SD-201")).toBeTruthy();
    expect(within(results()).queryByText("ND-101")).toBeNull();
  });
});
