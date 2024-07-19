import React from 'react'
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <section class="flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-900">
      <div class="container flex flex-col items-center ">
        <div class="flex flex-col gap-6 max-w-md text-center">
          <h2 class="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
            <span class="sr-only">Access</span>Denied
          </h2>
          <p class="text-2xl md:text-3xl dark:text-gray-300">
            Sorry, this page is admin only.
          </p>
          <Link
            to="/login"
            class="px-8 py-4 text-xl font-semibold rounded bg-blue-800 text-gray-50 hover:text-gray-200"
          >
            Back to login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Forbidden