import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const OrderDetails = ({ user }) => {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  const orderList = useSelector((store) =>
    user === "manufacturer" ? store.orders.manufacturer : store.orders.transporter
  );

  useEffect(() => {
    const filteredOrder = orderList?.filter(
      (item) => item.orderDetails.orderId === orderId
    );
    setOrder(filteredOrder[0]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {user === "manufacturer" ? "Transporter" : "Manufacturer"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {order && (
              <tr>
                <td className="px-6 py-4 overflow-hidden max-w-xs">
                  {order.orderDetails.orderId}
                </td>
                <td className="px-6 py-4 overflow-hidden max-w-xs">
                  {order.orderDetails.from}
                </td>
                <td className="px-6 py-4 overflow-hidden max-w-xs">
                  {order.orderDetails.to}
                </td>
                <td className="px-6 py-4 overflow-hidden max-w-xs">
                  {order.orderDetails.quantity}
                </td>
                <td className="px-6 py-4 overflow-hidden max-w-xs">
                  {order.orderDetails.pickup}
                </td>
                <td className="px-6 py-4 overflow-hidden max-w-xs">
                  {user === "manufacturer"
                    ? order.recipient.fullName
                    : order.sender.fullName}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
