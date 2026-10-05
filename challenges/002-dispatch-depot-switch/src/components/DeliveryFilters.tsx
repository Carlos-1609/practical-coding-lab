import type { DepotId, StatusFilter } from "../data/deliveries";
import { depots } from "../data/deliveries";

interface DeliveryFiltersProps {
  depotId: DepotId;
  onDepotChange: (depotId: DepotId) => void;
  status: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  search: string;
  onSearchChange: (search: string) => void;
}

const statusOptions: ReadonlyArray<{ value: StatusFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "delivered", label: "Delivered" },
];
//
export function DeliveryFilters({
  depotId,
  onDepotChange,
  status,
  onStatusChange,
  search,
  onSearchChange,
}: DeliveryFiltersProps) {
  return (
    <section className="filters" aria-label="Delivery filters">
      <label className="field">
        <span>Depot</span>
        <select
          value={depotId}
          onChange={(event) => onDepotChange(event.target.value as DepotId)}
        >
          {depots.map((depot) => (
            <option key={depot.id} value={depot.id}>
              {depot.name}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Search deliveries</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Reference or customer"
        />
      </label>

      <div className="status-filters" aria-label="Status filter">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={status === option.value}
            onClick={() => onStatusChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
