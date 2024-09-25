import { Link } from "react-router-dom";



export default function ThanksForOrdering() {
  return (
    <>
      <main className="relative lg:min-h-full">
        <div className="overflow-hidden h-80 lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
          <img
            src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-hero.jpg"
            alt="TODO"
            className="object-cover object-center w-full h-full"
          />
        </div>

        <div>
          <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
            <div className="lg:col-start-2">
              <h1 className="text-sm font-medium text-indigo-600">
                Payment successful
              </h1>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Thanks for ordering
              </p>
              <p className="mt-2 text-base text-gray-500">
                We appreciate your order, we’re currently processing it. So hang
                tight and we’ll send you confirmation very soon!
              </p>


             

              

             

              <div className="py-6 mt-16 text-right border-t border-gray-200">
                <Link
                  to="/"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
