import { useEffect } from "react";
import { useOrder } from "../../store/useOrder";

const OrderList = () => {
  const { orders, fetchOrder, loading, error } = useOrder();

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-400">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full rounded-xl overflow-hidden">
          <thead className="text-left bg-gray-800">
            <tr>
              <th className="p-4">UserId</th>
              <th className="p-4">Products</th>
              <th className="p-4">Total</th>
              <th className="p-4">Stripe Session</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-4">{order.userId}</td>

                  <td className="p-4">
                    {order.products.map((item) => (
                      <div key={item._id} className="flex items-center gap-2 mb-2">
                        {item.product?.image ? (
                          <img
                            src={item.product.image}
                            alt={item.product?.name}
                            className="w-8 h-8 object-cover rounded"
                          />
                        ) : null}

                        <div>
                          <div className="font-medium">
                            {item.product?.name ?? "Product"} x {item.quantity}
                          </div>
                          <div className="text-sm text-gray-400">
                            {item.price} € / kom
                          </div>
                        </div>
                      </div>
                    ))}
                  </td>

                  <td className="p-4 font-semibold">{order.totalAmount} €</td>

                  <td className="p-4 text-sm text-gray-300">
                    {order.stripeSessionId || "-"}
                  </td>

                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
