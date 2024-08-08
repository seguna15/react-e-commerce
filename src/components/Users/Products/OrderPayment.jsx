import { useEffect } from "react";
import { getCartItemsFromLocalStorageAction } from "../../../redux/slices/cart/cartSlices";
import AddShippingAddress from "../Forms/AddShippingAddress";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { placeOrderAction } from "../../../redux/slices/orders/orderSlices";
import { getUserProfileAction } from "../../../redux/slices/users/usersSlice";
import LoadingComponent from "../../../shared/components/LoadingComponent";


export default function OrderPayment() {
  //get data from location
  const location = useLocation();

  const { sumTotalPrice } = location.state;
  const calculateTotalDiscountedPrice = () => {};

  //dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);

  // get cart items from store
  const { cartItems } = useSelector((state) => state?.carts);

  //create order submit handler
  const createOrderSubmitHandler = (e) => {
    e.preventDefault();
  };

  //user profile
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  const { loading, profile } = useSelector((state) => state?.users);

  const user = profile?.userFound;
  //place order 
  
  // get shipping address
  const shippingAddress =  user?.shippingAddress
  const placeOrderHandler = () => {
    dispatch(placeOrderAction({shippingAddress, orderItems: cartItems, totalPrice: sumTotalPrice}));
    //empty cart Items
    localStorage.removeItem('cartItems')
  }

  const {loading: orderLoading, error: orderErr} = useSelector(state => state?.orders) 

  return (

    <>
      
      <div className="bg-gray-50">
        <main className="px-4 pt-16 pb-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <h1 className="sr-only">Checkout</h1>

            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <div>
                <div className="pt-10 mt-10 border-t border-gray-200">
                  {/* shipping Address */}
                  <AddShippingAddress />
                </div>
              </div>

              {/* Order summary */}
              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul role="list" className="divide-y divide-gray-200">
                    {cartItems?.map((product) => (
                      <li key={product._id} className="flex px-4 py-6 sm:px-6">
                        <div className="flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product._id}
                            className="w-20 rounded-md"
                          />
                        </div>

                        <div className="flex flex-col flex-1 ml-6">
                          <div className="flex">
                            <div className="flex-1 min-w-0">
                              <p className="mt-1 text-sm text-gray-500">
                                {product.name}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.size}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.color}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-end justify-between flex-1 pt-2">
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              $ {product?.price} X {product?.qty} = $
                              {product?.totalPrice}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <dl className="px-4 py-6 space-y-6 border-t border-gray-200 sm:px-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Taxes</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        $0.00
                      </dd>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <dt className="text-base font-medium">Sub Total</dt>
                      <dd className="text-base font-medium text-gray-900">
                        $ {sumTotalPrice}.00
                      </dd>
                    </div>
                  </dl>

                  <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                    {orderLoading ? (
                      <LoadingComponent />
                    ) : (
                      <button
                        onClick={placeOrderHandler}
                        className="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      >
                        Confirm Payment - ${sumTotalPrice}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
