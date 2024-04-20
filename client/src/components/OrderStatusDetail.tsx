import { Order } from "@/types";
import { Separator } from "./ui/separator";
import "../styles/Reservations.css"
type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  const { createdAt, reservationTime, restaurant, tableNumber, user } = order;
  return (
    <div className="reservation-container">
    <div className="reservation-details">
      <h2 className="reservation-heading">Reservation Details</h2>
      <div className="details-section">
        <p className="detail-label">Created At:</p>
        <p className="detail-value">{new Date(createdAt).toLocaleString()}</p>
      </div>
      <div className="details-section">
        <p className="detail-label">Reservation Time:</p>
        <p className="detail-value">{new Date(reservationTime).toLocaleString()}</p>
      </div>
      <div className="restaurant-info">
        <h3 className="info-heading">Restaurant Information</h3>
        <div className="details-section">
          <p className="detail-label">Name:</p>
          <p className="detail-value">{restaurant.restaurantName}</p>
        </div>
        <div className="details-section">
          <p className="detail-label">City:</p>
          <p className="detail-value">{restaurant.city}</p>
        </div>
        <div className="details-section">
          <p className="detail-label">Country:</p>
          <p className="detail-value">{restaurant.country}</p>
        </div>
        <div className="details-section">
          <p className="detail-label">Delivery Price:</p>
          <p className="detail-value">{restaurant.deliveryPrice}</p>
        </div>
      </div>
      <div className="details-section">
        <h3 className="info-heading">Table Number : </h3>
        <p className="detail-value table-number">{tableNumber}</p>
      </div>
      <div className="user-info">
        <h3 className="info-heading">User Information</h3>
        <div className="details-section">
          <p className="detail-label">Email:</p>
          <p className="detail-value">{user.email}</p>
        </div>
        <div className="details-section">
          <p className="detail-label">Address:</p>
          <p className="detail-value">{user.addressLine1}</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default OrderStatusDetail;
