import { useState } from "react";
import { DeliveryCard } from "./components/DeliveryCard";
import { DeliveryFilters } from "./components/DeliveryFilters";
import { deliveries, depots } from "./data/deliveries";
import type { DepotId, StatusFilter } from "./data/deliveries";
import { useVisibleDeliveries } from "./hooks/useVisibleDeliveries";

export default function App() {
  const [depotId, setDepotId] = useState<DepotId>("north");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const visibleDeliveries = useVisibleDeliveries(deliveries, depotId, status, search);
  const depotName = depots.find((depot) => depot.id === depotId)?.name ?? "Depot";

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Operations</p>
        <h1>Dispatch Desk</h1>
        <p>Review deliveries and keep each depot moving.</p>
      </header>

      <DeliveryFilters
        depotId={depotId}
        onDepotChange={setDepotId}
        status={status}
        onStatusChange={setStatus}
        search={search}
        onSearchChange={setSearch}
      />

      <section className="results" aria-label="Delivery results">
        <div className="results__heading">
          <div>
            <p className="eyebrow">Current queue</p>
            <h2>{depotName}</h2>
          </div>
          <p aria-live="polite">
            Showing {visibleDeliveries.length} {visibleDeliveries.length === 1 ? "delivery" : "deliveries"}
          </p>
        </div>

        {visibleDeliveries.length > 0 ? (
          <ul className="delivery-list">
            {visibleDeliveries.map((delivery) => (
              <DeliveryCard key={delivery.id} delivery={delivery} />
            ))}
          </ul>
        ) : (
          <p className="empty-state">No deliveries match the current filters.</p>
        )}
      </section>
    </main>
  );
}
