import React, { useEffect, useState } from "react";
import { getUserProfileAction, updateUserShippingAddressAction } from "../../../redux/slices/users/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingComponent from "../../../shared/components/LoadingComponent";

const AddShippingAddress = () => {
  const dispatch = useDispatch();

  //user profile
  useEffect(() => {
    dispatch(getUserProfileAction())
  },[dispatch])

  const { loading, profile } = useSelector((state) => state?.users);

 

  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    region: "",
    postalCode: "",
    phoneNumber: "",
  });
  //onchange
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //onsubmit
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserShippingAddressAction(formData));
  };

  return (
    <>
      {/* shipping details */}
      {profile?.hasShippingAddress ? (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">
            Shipping details
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Double check your information.
          </p>
          <div>
            <p className="mt-1 text-sm text-gray-500">
              First Name : {profile?.shippingAddress?.firstName}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Last Name : {profile?.shippingAddress?.lastName}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Address : {profile?.shippingAddress?.address}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              City : {profile?.shippingAddress?.city}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Country : {profile?.shippingAddress?.country}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              phone : {profile?.shippingAddress?.phoneNumber}
            </p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
        >
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              First name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="firstName"
                onChange={onChange}
                value={formData.firstName}
                autoComplete="given-name"
                className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700"
            >
              Last name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="lastName"
                onChange={onChange}
                value={formData.lastName}
                className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="address"
                onChange={onChange}
                value={formData.address}
                autoComplete="street-address"
                className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="city"
                onChange={onChange}
                value={formData.city}
                autoComplete="address-level2"
                className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <div className="mt-1">
              <select
                id="country"
                name="country"
                autoComplete="country"
                value={formData.country}
                onChange={onChange}
                className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Kindly choose a country</option>
                <option value="USA">United States</option>
                <option value="CAN">Canada</option>
                <option value="MEX">Mexico</option>
                <option value="Ghana">Ghana</option>
                <option value="Nigeria">Nigeria</option>
                <option value="South Africa">South Africa</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="region"
              className="block text-sm font-medium text-gray-700"
            >
              State / Province
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="region"
                onChange={onChange}
                value={formData.region}
                autoComplete="address-level1"
                className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium text-gray-700"
            >
              Postal code
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="postalCode"
                onChange={onChange}
                value={formData.postalCode}
                autoComplete="postal-code"
                className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                onChange={onChange}
                value={formData.phone}
                autoComplete="tel"
                className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              type="submit"
              className="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Add Shipping Address
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default AddShippingAddress;
