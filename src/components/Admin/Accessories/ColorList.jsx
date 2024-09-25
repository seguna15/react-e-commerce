import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import NoDataFound from "../../../shared/components/NoDataFound";
import { fetchColorsAction } from "../../../redux/slices/colors/colorsSlice";

export default function ColorList() {
  //dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);

  const { colors, loading } = useSelector((state) => state?.colors);
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center"></div>

      <h3 className="mt-3 text-lg font-medium leading-6 text-gray-900">
        All Colours [{colors?.length}]
      </h3>
      <div className="mt-3 -mx-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        {loading ? (
          <LoadingComponent />
        ) : colors?.length <= 0 ? (
          <NoDataFound />
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Colour Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Created At
                </th>

                {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {colors.map((color) => (
                <tr key={color.name}>
                  <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {color.name}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {new Date(color.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-4 pl-3 pr-4 text-sm font-medium text-right sm:pr-6">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit<span className="sr-only">, {color.name}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
