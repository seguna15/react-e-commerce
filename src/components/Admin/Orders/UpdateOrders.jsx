import  { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderAction } from "../../../redux/slices/orders/orderSlices";
import { useParams } from "react-router-dom";

const UpdateOrders = () => {
  //grab id from params
  const { id } = useParams();
  
  //dispatch
  const dispatch = useDispatch();

  const [order, setOrder] = useState({
    status: "pending",
  });

  const onChange = (e) => {
    dispatch(updateOrderAction({ status: e.target.value, id }));
    window.location.href = "/admin"
  };

  return (
    <div className="flex items-center pt-4 mt-6 space-x-4 text-sm font-medium border-t border-gray-200 divide-x divide-gray-200 sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
      <div className="flex justify-center flex-1">
        <div>
          <label
            htmlFor="order-status"
            className="block text-sm font-medium text-gray-700"
          >
            Update Order
          </label>
          <select
            id="order-status"
            name="status"
            onChange={onChange}
            value={order.status}
            className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrders;
