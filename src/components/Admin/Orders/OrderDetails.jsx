import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchSingleOrderAction, updateOrderAction } from '../../../redux/slices/orders/orderSlices';
import LoadingComponent from '../../../shared/components/LoadingComponent';

const OrderDetails = () => {
    //dispatch 
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false);
    
   
    const {id} = useParams();
    

    useEffect(() => {
        dispatch(fetchSingleOrderAction(id))
    },[id, dispatch])

    //get order from state
    const {order, loading} = useSelector(state => state?.orders);

    const [orderStatus, setOrderStatus] = useState({
      status: order?.status,
    });
  
    const onChangeHandler = (e) => {
      dispatch(updateOrderAction({ status: e.target.value, id }));
      
      setOpenModal(false)
      
    };
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <section className="relative py-8 antialiased bg-white md:py-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                Order summary: {order.orderNumber}{" "}
              </h2>
              <button
                onClick={() => setOpenModal(!openModal)}
                className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400"
              >
                Update Status
              </button>
            </div>

            <div className="py-4 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700 sm:mt-8">
              <h4 className="text-lg font-semibold text-gray-900 ">
                Payment & Delivery Status
              </h4>

              <dl>
                <dt className="text-base font-medium text-gray-900 ">
                  <>
                    Payment Status:{" "}
                    {order.paymentStatus === "Not paid" ? (
                      <span className="inline-flex px-2 font-semibold leading-5 text-red-600 bg-red-100 rounded-full ">
                        {order.paymentStatus}
                      </span>
                    ) : (
                      <span className="inline-flex px-2 leading-5 text-green-800 bg-green-100 rounded-full semibold">
                        {order.paymentStatus}
                      </span>
                    )}
                  </>
                </dt>
                <dd className="flex gap-2 mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  <span>
                    Delivery Status:{" "}
                    <strong className="text-gray-800 capitalize">
                      {order?.status}{" "}
                    </strong>
                  </span>
                  <span>
                    Payment Method:{" "}
                    <strong className="text-gray-800 capitalize">
                      {order?.paymentMethod}
                    </strong>
                  </span>
                </dd>
              </dl>
            </div>

            <div className="py-4 mt-6 space-y-4 border-t border-b border-gray-200 dark:border-gray-700 sm:mt-8">
              <h4 className="text-lg font-semibold text-gray-900 ">
                Billing & Delivery information
              </h4>

              <dl>
                <dt className="text-base font-medium text-gray-900 ">
                  Individual
                </dt>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  {order?.shippingAddress?.firstName}{" "}
                  {order?.shippingAddress?.lastName}{" "}
                  {order?.shippingAddress?.phoneNumber},{" "}
                  {order?.shippingAddress?.address},{" "}
                  {order?.shippingAddress?.city},{" "}
                  {order?.shippingAddress?.province},{" "}
                  {order?.shippingAddress?.country},{" "}
                  {order?.shippingAddress?.postalCode}
                </dd>
              </dl>

              <button
                type="button"
                data-modal-target="billingInformationModal"
                data-modal-toggle="billingInformationModal"
                className="text-base font-medium text-primary-700 hover:underline dark:text-primary-500"
              >
                Edit
              </button>
            </div>

            <div className="mt-6 sm:mt-8">
              <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                <table className="w-full font-medium text-left text-gray-900 md:table-fixed">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {order?.orderItems?.map((item) => (
                      <tr key={item._id}>
                        <td className="whitespace-nowrap py-4 md:w-[384px]">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center w-10 h-10 aspect-square shrink-0">
                              <img
                                className=" w-[50px] h-[50px] rounded-full object-fill dark:hidden"
                                src={item?.image}
                                alt={item.image}
                              />
                              <img
                                className="hidden  w-[50px] h-[50px] rounded-full object-fill dark:block"
                                src={item?.image}
                                alt={item.image}
                              />
                            </div>
                            <h4 className="flex items-center gap-1">
                              {item?.name}{" "}
                              <span className="text-xs">[{item?.color}]</span>
                            </h4>
                          </div>
                        </td>

                        <td className="p-4 text-base font-normal text-gray-900 ">
                          {item?.qty} x {item?.price}
                        </td>

                        <td className="p-4 text-base font-bold text-right text-gray-900 ">
                          ${item?.totalPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 space-y-6">
                <h4 className="text-xl font-semibold text-gray-900 ">
                  Order summary
                </h4>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 ">
                        ${order?.totalPrice?.toLocaleString()}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <dt className="text-lg font-bold text-gray-900 ">Total</dt>
                    <dd className="text-lg font-bold text-gray-900 ">
                      ${order?.totalPrice?.toLocaleString()}
                    </dd>
                  </dl>
                </div>

                <div className="gap-4 sm:flex sm:items-center">
                  <Link
                    to="/admin"
                    className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
                  >
                    Return to Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {openModal && (
            <div
              aria-hidden="true"
              className="antialiased absolute left-[30%] right-0 top-0 z-50  h-[calc(100%-1rem)] max-h-auto w-full max-h-full items-center justify-center overflow-y-auto overflow-x-hidden antialiased "
            >
              <div class="relative max-h-auto w-full max-h-full max-w-lg p-4">
                {/* <!-- Modal content -->  */}
                <div class="relative rounded-lg bg-white shadow ">
                  {/* <!-- Modal header -->  */}
                  <div class="flex items-center justify-between rounded-t border-b border-gray-200 p-4  md:p-5">
                    <h3 class="text-lg font-semibold text-gray-900 ">
                      Update Order Delivery Status
                    </h3>
                    <button
                      type="button"
                      class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-800 hover:bg-gray-200 hover:text-gray-900 "
                      onClick="s"
                    >
                      <svg
                        class="h-3 w-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/*  <!-- Modal body -->  */}
                  <form class="p-4 md:p-5">
                    <div class="sm:col-span-2">
                      <div class="mb-2 flex items-center gap-1">
                        <label
                          for="saved-address-modal"
                          class="block text-sm font-medium text-gray-900"
                        >
                          {" "}
                          Order Status{" "}
                        </label>
                        <svg
                          data-tooltip-target="saved-address-modal-desc-2"
                          data-tooltip-trigger="hover"
                          class="h-4 w-4 text-gray-400 hover:text-gray-900 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <select
                        
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        onChange={onChangeHandler}
                        value={orderStatus}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default OrderDetails