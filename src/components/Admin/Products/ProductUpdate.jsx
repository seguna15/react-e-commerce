import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { fetchCategoriesAction } from "../../../redux/slices/categories/categoriesSlices";
import { fetchBrandsAction } from "../../../redux/slices/brands/brandsSlices";
import { fetchColorsAction } from "../../../redux/slices/colors/colorsSlice";
import {  updateProductAction } from "../../../redux/slices/products/productSlices";
import useFetchProduct from "../../../shared/hooks/useFetchCoupon";



//animated components for react-select
const animatedComponents = makeAnimated();

export default function ProductUpdate() {
  //dispatch
  const dispatch = useDispatch();

  //get id from params
  const { id } = useParams();

  //fetch single product and formData
  const { formData, setFormData } = useFetchProduct(id);

  //Sizes
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [sizeOptions, setSizeOptions] = useState([]);

  const handleSizeChange = (sizes) => {
    setSizeOptions(sizes);
  };

  //converted sizes
  const sizeOptionsConverted = sizes?.map((size) => {
    return {
      value: size,
      label: size,
    };
  });

  //categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  //select data from store
  const { categories } = useSelector((state) => state?.categories);

  //brands
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);

  const { brands } = useSelector((state) => state?.brands);
  
  // colors
  const [colorOptions, setColorOptions] = useState([formData?.colors]);
 
  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);

  const { colors } = useSelector((state) => state?.colors);

  const handleColorChangeOption = (colors) => {
    setColorOptions(colors);
  };

  const colorOptionsConverted = colors?.map((color) => {
    return {
      value: color?.name,
      label: color?.name,
    };
  });

  //onChange
  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    //setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProductAction({
        ...formData,
        id,
        colors: colorOptions?.map((color) => color?.label),
        sizes: sizeOptions?.map((size) => size?.label),
      })
    );
    //reset form data
    setFormData({
      name: "",
      description: "",
      category: "",
      sizes: "",
      brand: "",
      colors: "",
      images: "",
      price: "",
      totalQty: "",
    });
  };

  //get product from store
  const {loading } = useSelector((state) => state?.products);

  return (
    <>
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
            Update Product
          </h2>
          <div className="mt-2 text-sm text-center text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              Manage Products
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-4 bg-white shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <div className="mt-1">
                  <input
                    name="name"
                    value={formData?.name}
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
                  options={sizeOptionsConverted}
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
                  value={formData?.category}
                  onChange={handleOnChange}
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  
                >
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
                  value={formData?.brand}
                  onChange={handleOnChange}
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  
                >
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
                  options={colorOptionsConverted}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isClearable={true}
                  isLoading={false}
                  isSearchable={true}
                  closeMenuOnSelect={false}
                  onChange={(e) => handleColorChangeOption(e)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="mt-1">
                  <input
                    name="price"
                    value={formData?.price}
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
                    value={formData?.totalQty}
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
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Product Description
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="description"
                    value={formData?.description}
                    onChange={handleOnChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button
                    type="submit"
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
                  >
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
