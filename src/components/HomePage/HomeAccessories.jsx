import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessoriesAction } from "../../redux/slices/accessories/accessoriesSlices";

const HomeAccessories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccessoriesAction());
  }, [dispatch]);

  //get data from store

  const { accessories } = useSelector((state) => state?.accessories);

  
  const accessoriesToShow = accessories.slice(0,5);

  return (
    <>
      <div className="flow-root mt-4">
        <div className="-my-2">
          <div className="box-content relative py-2 overflow-x-auto h-80 xl:overflow-visible">
            <div className="absolute flex px-4 space-x-8 min-w-screen-xl sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
              {accessoriesToShow?.map((accessory) => (
                <Link
                  key={accessory.name}
                  to={`/products-filters?accessory=${accessory.name}`}
                  className="relative flex flex-col w-56 p-6 overflow-hidden rounded-lg h-80 hover:opacity-75 xl:w-auto">
                  <span aria-hidden="true" className="absolute inset-0">
                    <img
                      src={accessory.image}
                      alt=""
                      className="object-cover object-center w-full h-full"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-t from-gray-800"
                  />
                  <span className="relative mt-auto text-xl font-bold text-center text-white">
                    {accessory.name} ({accessory.products.length})
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAccessories;
