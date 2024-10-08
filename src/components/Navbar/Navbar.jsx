import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import logo from "../../assets/logo3.png";
import useLogin from "../../shared/hooks/useLogin";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessoriesAction } from "../../redux/slices/accessories/accessoriesSlices";
import { getCartItemsFromLocalStorageAction } from "../../redux/slices/cart/cartSlices";
import { logoutAction } from "../../redux/slices/users/usersSlice";
import {  fetchCurrentCouponAction } from "../../redux/slices/coupons/couponsSlice";
import { AuthContext } from "../../App";


export default function Navbar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccessoriesAction());
  }, [dispatch]);

  //get data from store

  const { accessories } = useSelector((state) => state?.accessories);

  const accessoriesToDisplay = accessories.slice(0, 4);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //get data from store
  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);

  // get cart items from store
  const { cartItems } = useSelector((state) => state?.carts);

  //get logged in user from localStorage
  const isLoggedIn = useLogin();

  //get profile from store
  //const profile = useProfile();
  const isAdmin = useContext(AuthContext)
  
 
  //logoutHandler
  const logoutHandler = async (event) => {    
    event.preventDefault();
    await dispatch(logoutAction());
    window.location.reload();
  };

  //dispatch fetch coupons actions
  
  useEffect(() => {
    dispatch(fetchCurrentCouponAction());
  }, [dispatch]);

  //get coupons
  const { currentCoupon, loading } = useSelector((state) => state?.coupons);
 
  //get current coupon
  const coupon = currentCoupon?.[0];
  

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                {/* mobile category menu links */}
                <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                  {/* {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="block p-2 -m-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))} */}
                  {accessoriesToDisplay?.length > 0 &&
                    accessoriesToDisplay?.map((category) => {
                      return (
                        <>
                          <Link
                            key={category?._id}
                            to={`/products-filters?category=${category?.name}`}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {category?.name}
                          </Link>
                        </>
                      );
                    })}
                </div>

                {/* mobile links register/login */}
                <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                  {!isLoggedIn && (
                    <>
                      <div className="flow-root">
                        <Link
                          to="/register"
                          className="block p-2 -m-2 font-medium text-gray-900"
                        >
                          Create an account
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/login"
                          className="block p-2 -m-2 font-medium text-gray-900"
                        >
                          Sign in
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                <div className="px-4 py-6 space-y-6 border-t border-gray-200"></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative z-10">
        <nav aria-label="Top">
          {/* Coupon nav  bar*/}
          {!coupon?.isExpired && (
            <div className="bg-yellow-500">
              <div className="flex items-center justify-between h-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <p
                  style={{ textAlign: "center", width: "100%" }}
                  className="flex-1 text-sm font-medium text-center text-gray-800 lg:flex-none"
                >
                  {coupon
                    ? `${coupon?.code} - ${coupon?.discount}%, ${coupon?.daysLeft}`
                    : "No Sales at the moment"}
                </p>
              </div>
            </div>
          )}
          {/* Top navigation  desktop*/}
          {!isLoggedIn && (
            <div className="bg-gray-800">
              <div className="flex items-center justify-between h-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    to="/register"
                    className="text-sm font-medium text-white hover:text-gray-100"
                  >
                    Create an account
                  </Link>
                  <span className="w-px h-6 bg-gray-600" aria-hidden="true" />
                  <Link
                    to="/login"
                    className="text-sm font-medium text-white hover:text-gray-100"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="bg-white">
            <div className="border-b border-gray-200">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center">
                    <Link to="/">
                      <span className="sr-only">Your Company</span>
                      <img
                        className="w-auto h-32 pt-2"
                        src={logo}
                        alt="i-novotek logo"
                      />
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/*  menus links*/}
                    <Popover.Group className="ml-8">
                      <div className="flex justify-center h-full space-x-8">
                        {accessoriesToDisplay?.length > 0 &&
                          accessoriesToDisplay?.map((category) => {
                            return (
                              <>
                                <Link
                                  key={category?._id}
                                  to={`/products-filters?category=${category?.name}`}
                                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {category?.name}
                                </Link>
                              </>
                            );
                          })}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex items-center flex-1 lg:hidden">
                    <button
                      type="button"
                      className="p-2 -ml-2 text-gray-400 bg-white rounded-md"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  {/* logo */}
                  <Link to="/" className="lg:hidden">
                    <img
                      className="w-auto h-32 mt-2"
                      src={logo}
                      alt="i-novotek logo"
                    />
                  </Link>

                  {/* login profile icon mobile */}
                  <div className="flex items-center justify-end flex-1">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        type="button"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Admin Dashboard
                      </Link>
                    )} 
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        {isLoggedIn && (
                          <div className="flex">
                            <Link
                              to="/customer-profile"
                              className="p-2 m-2 text-gray-400 hover:text-gray-500"
                            >
                              <UserIcon
                                className="w-6 h-6"
                                aria-hidden="true"
                              />
                            </Link>
                            <button type="button" onClick={logoutHandler}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="text-gray-500 size-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
                                  clipRule="evenodd"
                                />
                                <path
                                  fillRule="evenodd"
                                  d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>

                      <span
                        className="w-px h-6 mx-4 bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />
                      {/* login shopping cart mobile */}
                      <div className="flow-root">
                        <Link
                          to="/shopping-cart"
                          className="flex items-center p-2 -m-2 group"
                        >
                          <ShoppingCartIcon
                            className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            {cartItems?.length > 0 ? cartItems.length : 0}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
