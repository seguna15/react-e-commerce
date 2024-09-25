import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import Input from "../../../shared/components/Input";
import { createCategoryAction } from "../../../redux/slices/categories/categoriesSlices";

export default function AddCategory() {
  const dispatch = useDispatch()
  //form data
  const [formData, setFormData] = useState({
    name: "",
  });
  
  //onChange
  const handleOnChange = (name, value) => {
    setFormData({...formData, name: value});
  };

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategoryAction(formData))
    setFormData({
      name: ""
    })
  };

  const { loading, isAdded}  = useSelector(state => state?.categories)
  return (
    <>
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <svg
            className="w-auto h-10 mx-auto text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
            />
          </svg>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
            Add Product Brand
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            {loading ? (
              <LoadingComponent />
            ) : (
              <form className="space-y-6" onSubmit={handleOnSubmit}>
                <Input
                  OnChangeHandler={handleOnChange}
                  label="Name"
                  name="name"
                  value={formData.name}
                />
                <div>
                  <button
                    type="submit"
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Product Brand
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 bg-white">Or</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div>
                  <Link
                    to="/admin/add-brand"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                  >
                    Add Brand
                  </Link>
                </div>

                <div>
                  <div>
                    <Link
                      to="/admin/add-color"
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                    >
                      Add Color
                    </Link>
                  </div>
                </div>

                <div>
                  <div>
                    <Link
                      to="/admin/add-category"
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                    >
                      Add Category
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
