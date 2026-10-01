import type { Delivery } from "../data/deliveries";

interface DeliveryCardProps {
  delivery: Delivery;
}

export function DeliveryCard({ delivery }: DeliveryCardProps) {
  return (
    <li className="delivery-card">
      <div className="delivery-card__top">
        <strong>{delivery.id}</strong>
        <span className={`status status--${delivery.status}`}>{delivery.status}</span>
      </div>
      <p className="delivery-card__customer">{delivery.customerName}</p>
      <p className="delivery-card__address">{delivery.address}</p>
    </li>
  );
}
