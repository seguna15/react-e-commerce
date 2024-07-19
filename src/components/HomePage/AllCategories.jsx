import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategoryAction } from "../../redux/slices/categories/categoriesSlices";
import LoadingComponent from "../../shared/components/LoadingComponent";

const AllCategories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  //get data from store

  const { categories, loading} = useSelector((state) => state?.categories);
 

  return (
    <>
      <div className="bg-white">
        <div className="px-4 py-12 mx-auto text-center max-w-7xl sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">
              Total Categories [{categories?.length}]
            </span>
          </h2>
          <p>Browse our categories and find the best products for you.</p>
        </div>
      </div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="flow-root mt-4">
          <div className="-my-2">
            <div className="box-content relative py-2 overflow-x-auto h-80 xl:overflow-visible">
              <div className="absolute flex px-4 m-2 space-x-8 min-w-screen-xl sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {categories?.map((category) => (
                  <Link
                    key={category?._id}
                    to={`/products-filters?category=${category?.name}`}
                    className="relative flex flex-col w-56 p-6 mt-4 overflow-hidden rounded-lg h-80 hover:opacity-75 xl:w-auto"
                  >
                    <span aria-hidden="true" className="absolute inset-0">
                      <img
                        src={category?.image}
                        alt={category?.name}
                        className="object-cover object-center w-full h-full"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-t from-gray-800"
                    />
                    <span className="relative mt-auto text-xl font-bold text-center text-white">
                      {category.name} ({category.products.length})
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllCategories;
