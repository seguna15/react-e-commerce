import { useDispatch, useSelector } from "react-redux";
import OrdersStats from "./OrdersStatistics";
import { useEffect } from "react";
import { fetchOrdersAction } from "../../../redux/slices/orders/orderSlices";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import NoDataFound from "../../../shared/components/NoDataFound";
import { Link } from "react-router-dom";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

export default function OrdersList() {

  //dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersAction())
  },[dispatch])

  const {orders, loading} = useSelector(state => state.orders);
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center"></div>
      {/* order stats */}
      <OrdersStats />

      <h3 className="mt-3 text-lg font-medium leading-6 text-gray-900">
        Recent Orders
      </h3>
      <div className="mt-3 -mx-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        {loading ? (
          <LoadingComponent />
        ) : orders.length <= 0 ? (
          <NoDataFound />
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Payment Status
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Order Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Delivery Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Total
                </th>
                {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th> */}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="w-full py-4 pl-4 pr-3 text-sm font-medium text-gray-900 max-w-0 sm:w-auto sm:max-w-none sm:pl-6">
                    {order.orderNumber}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {order.paymentStatus === "Not paid" ? (
                      <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-600 bg-red-100 rounded-full">
                        {order.paymentStatus}
                      </span>
                    ) : (
                      <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                        {order.paymentStatus}
                      </span>
                    )}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">Unknown</td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {order?.status}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {parseFloat(order?.totalPrice, 2)}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-sm font-medium text-right sm:pr-6">
                    {order?.paymentStatus === "Not paid" ? (
                      <Link
                        style={{ cursor: "not-allowed" }}
                        className="text-gray-300"
                      >
                        Edit
                      </Link>
                    ) : (
                      <Link
                        to={`/admin/orders/${order?._id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
