import { useEffect, useState } from "react";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderItemQty, getCartItemsFromLocalStorageAction, removeOrderItem } from "../../../redux/slices/cart/cartSlices";
import { fetchCouponAction } from "../../../redux/slices/coupons/couponsSlice";
import { toast } from "react-toastify";
import LoadingComponent from "../../../shared/components/LoadingComponent";

export default function ShoppingCart() {
 
  //dispatch
  const dispatch = useDispatch();

  //get data from store
  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);

  //coupon state
  const [couponCode, setCouponCode] = useState(null);
  const applyCouponSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCouponAction(couponCode));
    setCouponCode("");
  };

  // get cart items from store
  const { coupon, loading, error, isAdded } = useSelector((state) => state?.coupons);
  
  // get cart items from store
  const { cartItems } = useSelector((state) => state?.carts);

  //update item qty
  const changeOrderItemQtyHandler = (productId, qty) => {
    dispatch(changeOrderItemQty({ productId, qty }));
    dispatch(getCartItemsFromLocalStorageAction());
  };

  //calculate total price
  let sumTotalPrice
  let orderCoupon
  sumTotalPrice = cartItems?.reduce((acc, current) => {
    return acc + current?.totalPrice;
  }, 0);
  
  //check if coupon found
  if(coupon){
    sumTotalPrice = sumTotalPrice - (sumTotalPrice * coupon?.discount/100)
    orderCoupon = coupon?.code;
  }
  //price of the product - (price of product x discount/100)


  //remove item from cart
  const removeOrderItemHandler = (productId) => {
    dispatch(removeOrderItem(productId));
    dispatch(getCartItemsFromLocalStorageAction());
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 pt-16 pb-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="border-t border-b border-gray-200 divide-y divide-gray-200"
            >
              {cartItems?.map((product) => (
                <li key={product._id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover object-center w-24 h-24 rounded-md sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <p className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </p>
                          </h3>
                        </div>
                        <div className="flex mt-1 text-sm">
                          <p className="text-gray-500">{product.color}</p>
                          <p className="pl-4 ml-4 text-gray-500 border-l border-gray-200">
                            {product.size}
                          </p>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${product?.price} x {product?.qty} ={" "}
                          {product?.totalPrice}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label className="sr-only">
                          Quantity, {product.name}
                        </label>
                        <select
                          onChange={(e) =>
                            changeOrderItemQtyHandler(
                              product?._id,
                              e.target.value
                            )
                          }
                          className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        >
                          {/* use the qty  */}
                          {[...Array(product?.qtyLeft).keys()].map((x) => {
                            return (
                              <option key={x} value={x + 1}>
                                {x + 1}
                              </option>
                            );
                          })}
                        </select>
                        {/* remove */}
                        <div className="absolute top-0 right-0">
                          <button
                            onClick={() => removeOrderItemHandler(product?._id)}
                            className="inline-flex p-2 -m-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  $ {sumTotalPrice}.00
                </dd>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200"></div>
              {/* add coupon */}
              <dt className="flex items-center text-sm text-gray-600">
                <span>Have coupon code? </span>
              </dt>

              <form onSubmit={applyCouponSubmit}>
                <div className="mt-1">
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    type="text"
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="COUPON CODE"
                  />
                </div>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button className="inline-flex  text-center mt-4 items-center rounded border border-transparent bg-green-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Apply coupon
                  </button>
                )}
              </form>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-xl font-medium text-gray-900 ">
                  $ {sumTotalPrice}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link
                //  pass data to checkout page
                to="/order-payment"
                state={{
                  sumTotalPrice,
                  orderCoupon,
                }}
                className="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Proceed to Checkout
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
