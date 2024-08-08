import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewAction } from "../../../redux/slices/reviews/reviewsSlice";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../shared/components/LoadingComponent";


export default function AddReview() {
  //dispatch
  const dispatch = useDispatch();

  //get params
  const {id} = useParams()
  //---form data---
  const [formData, setFormData] = useState({
    rating: "",
    message: "",
  });

  //onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createReviewAction({
      productId: id,
      message: formData.message,
      rating: formData.rating,
    }))
  };

  //get data from store
  const {loading} = useSelector(state => state?.reviews)

  return (
    <>
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
            Add Your Review
          </h2>
          <div className="mt-2 text-sm text-center text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              You are reviewing:{" "}
              <span className="text-gray-900">Product Name</span>
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rating
                </label>
                <select
                  value={formData.rating}
                  onChange={handleOnChange}
                  name="rating"
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  {/* review rating */}

                  <option key={1} value="1">
                    1
                  </option>
                  <option key={2} value="2">
                    2
                  </option>
                  <option key={3} value="3">
                    3
                  </option>
                  <option key={4} value="4">
                    4
                  </option>
                  <option key={5} value="5">
                    5{" "}
                  </option>
                </select>
              </div>

              {/* description */}
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleOnChange}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button
                    type="submit"
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add New Review
                  </button>
                )}
              </div>

              <div>
                <Link
                  to={`/products/${id}`}
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  I have Changed my mind
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
