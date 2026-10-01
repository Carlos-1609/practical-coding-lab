import { useMemo } from "react";
import type { Delivery, DepotId, StatusFilter } from "../data/deliveries";

export function useVisibleDeliveries(
  deliveries: Delivery[],
  depotId: DepotId,
  status: StatusFilter,
  search: string,
): Delivery[] {
  return useMemo(() => {
    const term = search.trim().toLowerCase();

    return deliveries
      .filter((delivery) => delivery.depotId === depotId)
      .filter((delivery) => status === "all" || delivery.status === status)
      .filter(
        (delivery) =>
          term === "" ||
          delivery.id.toLowerCase().includes(term) ||
          delivery.customerName.toLowerCase().includes(term),
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [deliveries, status, search, depotId]);
}
