import { useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";


import LoadingComponent from "../../../shared/components/LoadingComponent";


//animated components for react-select
const animatedComponents = makeAnimated();

export default function UpdateProduct() {
  //form data
  const [formData, setFormData] = useState({
    name: product?.name,
    size: product?.size,
    category: product?.category,
    brand: product?.brand,
    color: product?.color,
    canBeShipped: product?.canBeShipped,
    images: [],
    price: product?.price,
    shippingPrice: product?.shippingPrice,
    totalQty: product?.totalQty,
    description: product?.description,
  });
  //onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //----fetch brands---

  let brands,
    categories,
    product,
    error,
    isUpdated,
    sizeOptionsCoverted,
    handleSizeChange,
    colorOptionsCoverted,
    handleColorChangeOption,
    loading;

  //---onSubmit---
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      
     
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
            Update Product
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              Manage Products
            </p>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <div className="mt-1">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleOnChange}
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* size option */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Size
                </label>
                <Select
                  components={animatedComponents}
                  isMulti
                  name="sizes"
                  options={sizeOptionsCoverted}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isClearable={true}
                  isLoading={false}
                  isSearchable={true}
                  closeMenuOnSelect={false}
                  onChange={(item) => handleSizeChange(item)}
                />
              </div>
              {/* Select category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleOnChange}
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  defaultValue="Canada">
                  {/* <option>-- Select Category --</option>
                  <option value="Clothings">Clothings</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Accessories">Accessories</option> */}
                  <option>-- Select Category --</option>
                  {categories?.map((category) => (
                    <option key={category?._id} value={category?.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Select Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Brand
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleOnChange}
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  defaultValue="Canada">
                  <option>-- Select Brand --</option>
                  {brands?.map((brand) => (
                    <option key={brand?._id} value={brand?.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Color
                </label>
                <Select
                  components={animatedComponents}
                  isMulti
                  name="colors"
                  options={colorOptionsCoverted}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isClearable={true}
                  isLoading={false}
                  isSearchable={true}
                  closeMenuOnSelect={false}
                  onChange={(e) => handleColorChangeOption(e)}
                />
              </div>

              {/* upload images */}
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Upload Images
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="w-12 h-12 mx-auto text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload files</span>
                          <input
                            name="images"
                            value={formData.images}
                            onChange={handleOnChange}
                            type="file"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="mt-1">
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Ahipping price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shipping Price
                </label>
                <div className="mt-1">
                  <input
                    name="shippingPrice"
                    value={formData.shippingPrice}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Quantity
                </label>
                <div className="mt-1">
                  <input
                    name="totalQty"
                    value={formData.totalQty}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* description */}
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700">
                  Add Product Description
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleOnChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button
                    type="submit"
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Update Product
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
