import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { createCouponAction } from "../../../redux/slices/coupons/couponsSlice";
import { useDispatch, useSelector } from "react-redux";


export default function AddCoupon() {
  //dispatch
  const dispatch = useDispatch()

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [formData, setFormData] = useState({
    code: "",
    discount: "",
  });

  //---onHandleChange---
  const onHandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //---onHandleSubmit---
  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCouponAction({
      discount: formData?.discount,
      code: formData.code,
      startDate,
      endDate
    }))
    //reset form
    setFormData({
      code: "",
      discount: "",
    });
  };
  
  //---coupon from store---
  const { loading, } = useSelector(state => state?.coupons)
  return (
    <>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Add New Coupon
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onHandleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {/* name */}
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={onHandleChange}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {/* discount */}
                Discount (in %)
              </label>
              <div className="mt-1">
                <input
                  name="discount"
                  value={formData.discount}
                  onChange={onHandleChange}
                  type="number"
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            {/* start date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <div className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>

            {/* end date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <div className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </div>
            </div>
            <div>
              {loading ? (
                <LoadingComponent />
              ) : (
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add Coupon
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
