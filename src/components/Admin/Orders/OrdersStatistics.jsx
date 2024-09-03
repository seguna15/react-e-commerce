import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersStatisticsAction } from "../../../redux/slices/orders/orderSlices";

export default function OrdersStats() {
  //dispatch

  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(fetchOrdersStatisticsAction())
  },[dispatch])

  const {stats, loading} = useSelector(state => state?.orders)

  const statistics = stats?.getOrderStats[0];
 

  return (
    <div>
      <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* today's income */}
        <div className="relative px-4 pt-5 pb-12 overflow-hidden bg-indigo-600 rounded-lg shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute p-3 bg-indigo-500 rounded-md">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                ></path>
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-200 truncate">
              Today's Sales
            </p>
          </dt>
          <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-200">
              ${stats?.salesStatsToday.length <= 0 ? "0.00" : "0"}
            </p>

            <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-pink-900 sm:px-6">
              <div className="text-sm"></div>
            </div>
          </dd>
        </div>
        
        {/* stat 1 */}
        <div className="relative px-4 pt-5 pb-12 overflow-hidden bg-red-800 rounded-lg shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute p-3 bg-indigo-500 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
                />
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-100 truncate">
              Minimum Order
            </p>
          </dt>
          <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-200">
              ${statistics?.minimumSale}
            </p>

            <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-pink-900 sm:px-6">
              <div className="text-sm"></div>
            </div>
          </dd>
        </div>
        {/* stat 2 */}
        <div className="relative px-4 pt-5 pb-12 overflow-hidden bg-yellow-600 rounded-lg shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute p-3 bg-indigo-500 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                />
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-200 truncate">
              Maximum Order
            </p>
          </dt>
          <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-200">
              ${statistics?.maximumSale}
            </p>

            <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-pink-900 sm:px-6">
              <div className="text-sm"></div>
            </div>
          </dd>
        </div>
        {/* stat 3 */}
        <div className="relative px-4 pt-5 pb-12 overflow-hidden bg-green-600 rounded-lg shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute p-3 bg-indigo-500 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                />
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-200 truncate">
              Total Sales
            </p>
          </dt>
          <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-200">
              ${statistics?.totalSales}
            </p>

            <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-pink-900 sm:px-6">
              <div className="text-sm"></div>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}
