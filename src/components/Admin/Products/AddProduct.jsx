import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { fetchAccessoriesAction } from "../../../redux/slices/accessories/accessoriesSlices";
import { fetchBrandsAction } from "../../../redux/slices/brands/brandsSlices";
import { fetchColorsAction } from "../../../redux/slices/colors/colorsSlice";
import { createProductAction } from "../../../redux/slices/products/productSlices";
import { imagesValidator } from "../../../shared/validators";
import ImageComponent from "../../../shared/components/ImageComponent";
import {  sizes } from "../../../shared/data/data";
import { fetchCategoriesAction } from "../../../redux/slices/categories/categoriesSlices";

export default function AddProduct() {
  const dispatch = useDispatch();

  //files 
  const [files, setFiles] = useState([]);
  const [fileErrs, setFileErrs] = useState([]);


  //file handleChange
  const fileHandleChange = (event) => {
    const newFiles = Array.from(event);
    //validation
    const errors = imagesValidator(newFiles);
    setFileErrs(errors);
    setFiles(newFiles)
  }

  //accessories
  useEffect(() => {
    dispatch(fetchAccessoriesAction());
  }, [dispatch]);
  //select data from store
  const { accessories} = useSelector(
    (state) => state?.accessories
  );

  //categories 
  useEffect(() => {
    dispatch(fetchCategoriesAction())
  },[dispatch])

  //select date from store
  const {categories} = useSelector((state) =>  state?.categories);

  //brands
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);

  const {brands} = useSelector((state) => state?.brands)

  
  
  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);

  const { colors } = useSelector((state) => state?.colors);
  

  //size, colour and quantity
    const [sizeColourQty, setSizeColourQty] = useState([
      { size: "", colour: "", qty: "" },
    ]);

  //handle creating new product size, colour, qty input
  const handleAddSizeColourQty = () => {
    setSizeColourQty([...sizeColourQty, {size: "", colour: "", qty: ""}])
  }

  const handleChangeSizeColourQty = (e, i) => {
    const {name, value} = e.target;
    const onChangeVal = [...sizeColourQty];
    onChangeVal[i][name] = value;
    setSizeColourQty(onChangeVal);
  }

  const handleDeleteSizeColourQty = (i) => {
    const deleteVal = [...sizeColourQty];
    deleteVal.splice(i,1)
    setSizeColourQty(deleteVal);
  }



  //---form data---
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    sizes: "",
    brand: "",
    colors: "",
    price: "",
    totalQty: "",
  });

  //onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //get product from store
  const {product, loading} = useSelector((state) => state?.products)

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProductAction({
        ...formData, 
        files,
        sizeColourQty
      })
    ) 
    //reset form data
    /* setFormData({
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
    setSizeColourQty([{ size: "", colour: "", qty: "" }]); */
  };

  return (
    <>
      <div className="flex flex-col justify-center min-h-full py-12 mx-auto border border-red-100 sm:px-6 lg:px-8 md:w-11/12">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
            Create New Product
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              Manage Products
            </p>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto md:w-2/3 ">
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

              <div className="flex flex-col">
                <div className="flex justify-between text-sm">
                  <label htmlFor="">Size</label>
                  <label htmlFor="">Colour</label>
                  <label htmlFor="">Quantity</label>
                </div>
                {sizeColourQty?.map((val, i) => (
                  <div className="flex-col">
                    <div className="flex gap-4 my-2">
                      <select
                        name="size"
                        onChange={(e) => handleChangeSizeColourQty(e, i)}
                        className="w-1/3 py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>-- Select Size --</option>
                        {sizes?.map((size) => (
                          <option
                            key={size}
                            value={size}
                            selected={size === val.size ? true : false}
                          >
                            {size}
                          </option>
                        ))}
                      </select>
                      <select
                        name="colour"
                        onChange={(e) => handleChangeSizeColourQty(e, i)}
                        className="w-1/3 py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>-- Select Colour --</option>
                        {colors?.map((color) => (
                          <option
                            key={color?._id}
                            value={color?.name}
                            selected={color?.name === val.colour ? true : false}
                          >
                            {color.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        name="qty"
                        onChange={(e) => handleChangeSizeColourQty(e, i)}
                        value={val.qty}
                        className="w-1/3 px-2 mt-1 text-base border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="px-1 py-1 text-red-500 bg-transparent rounded size-6 hover:text-red-700 hover:bg-red-200"
                        onClick={() => handleDeleteSizeColourQty(i)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="px-1 py-1 text-indigo-500 bg-transparent rounded size-6 hover:text-indigo-700 hover:bg-indigo-200"
                        onClick={handleAddSizeColourQty}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
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
                  defaultValue="Canada"
                >
                  <option>-- Select Category --</option>
                  {categories?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

               {/* Select for People */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Accessory
                </label>
                <select
                  name="accessory"
                  value={formData.accessory}
                  onChange={handleOnChange}
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  defaultValue="Canada"
                >
                  <option>-- Select Accessory --</option>
                  {accessories?.map((accessory) => (
                    <option key={accessory?._id} value={accessory?.name}>
                      {accessory.name}
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
                  defaultValue="Canada"
                >
                  <option>-- Select Brand --</option>
                  {brands?.map((brand) => (
                    <option key={brand?._id} value={brand?.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* upload images */}
              <ImageComponent
                label="Upload images"
                value={formData.images}
                onFileChangeHandler={fileHandleChange}
                multiple
                imageErrors={fileErrs}
              />

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
                    value={formData.description}
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
                    disabled={fileErrs?.length > 0}
                    type="submit"
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
                  >
                    Add Product
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
