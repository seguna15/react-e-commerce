import { Fragment, useContext, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Link, Outlet } from "react-router-dom";
import {ordersLinks,productsLinks,couponsLinks,AccessoryLinks,colorsLinks,brandsLinks} from '../../shared/data/data'
import {
  Bars3CenterLeftIcon,
  
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo3.png";
import { logoutAction } from "../../redux/slices/users/usersSlice";
import { useDispatch } from "react-redux";
import useProfile from "../../shared/hooks/useProfile";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



export default function AdminDashboard() {
  //dispatch
  const dispatch = useDispatch();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //logoutHandler
  const logoutHandler = async () => {
    await dispatch(logoutAction());
    window.location.reload();
  };

  
  const {profile} = useProfile(dispatch);

  

  return (
    <>
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
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
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
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
                <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-cyan-700">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 pt-2 -mr-12">
                      <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex items-center flex-shrink-0 px-4"></div>
                  <nav
                    className="flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-cyan-800"
                    aria-label="Sidebar"
                  >
                    {/* orders links mobile */}
                    <div className="pt-1 mt-1">
                      <div className="px-2 space-y-1">
                        {ordersLinks.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-cyan-100 hover:bg-cyan-600 hover:text-white"
                          >
                            <item.icon
                              className="w-6 h-6 mr-4 text-cyan-200"
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="px-2 mt-8 space-y-1">
                      {/*Products  links mobile */}
                      {productsLinks.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-cyan-800 text-white"
                              : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                            "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className="flex-shrink-0 w-6 h-6 mr-4 text-cyan-200"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="pt-6 mt-6">
                      <div className="px-2 space-y-1">
                        {couponsLinks.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-cyan-100 hover:bg-cyan-600 hover:text-white"
                          >
                            <item.icon
                              className="w-6 h-6 mr-4 text-cyan-200"
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Categories mobile */}
                    <div className="pt-3 mt-3">
                      <div className="px-2 space-y-1">
                        {AccessoryLinks.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-cyan-100 hover:bg-cyan-600 hover:text-white"
                          >
                            <item.icon
                              className="w-6 h-6 mr-4 text-cyan-200"
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* colors links mobile */}
                    <div className="pt-3 mt-3">
                      <div className="px-2 space-y-1">
                        {colorsLinks.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-cyan-100 hover:bg-cyan-600 hover:text-white"
                          >
                            <item.icon
                              className="w-6 h-6 mr-4 text-cyan-200"
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* brands links mobile */}
                    <div className="pt-3 mt-3">
                      <div className="px-2 space-y-1">
                        {brandsLinks.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-cyan-100 hover:bg-cyan-600 hover:text-white"
                          >
                            <item.icon
                              className="w-6 h-6 mr-4 text-cyan-200"
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </nav>
                  {/* end of mobile nav */}
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-32 pb-4 overflow-y-auto bg-cyan-900">
            <nav
              className="flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-cyan-800"
              aria-label="Sidebar"
            >
              {/* orders links desktop */}
              <div className="pt-1 mt-1">
                <div className="px-2 space-y-1">
                  {ordersLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-cyan-100 hover:bg-cyan-600 hover:text-white"
                    >
                      <item.icon
                        className="w-6 h-6 mr-4 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="px-2 mt-8 space-y-1">
                {/*Products  links desktop */}
                {productsLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-cyan-800 text-white"
                        : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                      "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className="flex-shrink-0 w-6 h-6 mr-4 text-cyan-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="pt-6 mt-6">
                <div className="px-2 space-y-1">
                  {couponsLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-cyan-100 hover:bg-cyan-600 hover:text-white"
                    >
                      <item.icon
                        className="w-6 h-6 mr-4 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Categories desktop */}
              <div className="pt-3 mt-3">
                <div className="px-2 space-y-1">
                  {AccessoryLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-cyan-100 hover:bg-cyan-600 hover:text-white"
                    >
                      <item.icon
                        className="w-6 h-6 mr-4 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              {/* colors links desktop */}
              <div className="pt-3 mt-3">
                <div className="px-2 space-y-1">
                  {colorsLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-cyan-100 hover:bg-cyan-600 hover:text-white"
                    >
                      <item.icon
                        className="w-6 h-6 mr-4 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              {/* brands links desktop */}
              <div className="pt-3 mt-3">
                <div className="px-2 space-y-1">
                  {brandsLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-cyan-100 hover:bg-cyan-600 hover:text-white"
                    >
                      <item.icon
                        className="w-6 h-6 mr-4 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              {/**Logout */}
              <div className="pt-3 mt-3">
                <div className="px-1 space-y-1 ">
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-4 px-4 py-2 text-sm font-medium leading-6 rounded-md group text-cyan-100 hover:bg-cyan-600 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-6"
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

                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-col flex-1 lg:pl-64">
          <div className="flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:border-none">
            <button
              type="button"
              className="px-4 text-gray-400 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 pb-8">
            {/* Page header */}
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                  <div className="flex-1 min-w-0">
                    {/* Profile */}
                    <div className="flex items-center">
                     
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="hidden w-16 h-16 rounded-full sm:block size-16"
                      >
                        <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                      </svg>

                      <div>
                        <div className="flex items-center">
                          <img
                            className="w-16 h-16 rounded-full sm:hidden"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                            alt=""
                          />
                          <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                            {profile.fullname}
                          </h1>
                        </div>
                        <dl className="flex flex-col mt-6 sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                          <dd className="flex items-center text-sm font-medium text-gray-500 capitalize sm:mr-6">
                            {/* Role */}
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              ></path>
                            </svg>
                            Role: Admin
                          </dd>
                          {/* Date Joined */}
                          <dd className="flex items-center mt-3 text-sm font-medium text-gray-500 capitalize sm:mr-6 sm:mt-0">
                            <svg
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              ></path>
                            </svg>
                            {new Date(profile.createdAt).toLocaleDateString()}
                          </dd>
                          {/* email */}
                          <dd className="flex items-center mt-3 text-sm font-medium text-gray-500 sm:mr-6 sm:mt-0">
                            <svg
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                              ></path>
                            </svg>
                            {profile.email}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex mt-6 space-x-3 md:mt-0 md:ml-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
                      Add money
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
                      Send money
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            <Outlet />
            {/* content */}
          </main>
        </div>
      </div>
    </>
  );
}
