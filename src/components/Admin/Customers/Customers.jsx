import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomersAction } from "../../../redux/slices/users/usersSlice";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import NoDataFound from "../../../shared/components/NoDataFound";



export default function Customers() {
  //dispatch
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(getAllCustomersAction());
  }, [dispatch])

  //extract customers from state
  const {customers, loading} = useSelector(state => state?.users)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="py-2 text-xl font-semibold text-gray-900">
            All Customers[{customers.length}]
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            List of all the customers on the website including their name,
            email, etc
          </p>
        </div>
        {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div> */}
      </div>
      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
              {loading ? (
                <LoadingComponent />
              ) : customers.length <= 0 ? (
                <NoDataFound />
              ) : (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Country
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        City
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Postal Code
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Phone Number
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr key={customer.email}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6 lg:pl-8">
                          {customer?.fullname}
                        </td>

                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {customer?.email}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {customer?.shippingAddress?.country}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {customer?.shippingAddress?.city}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {customer?.shippingAddress?.postalCode}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {customer?.shippingAddress?.phoneNumber}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
