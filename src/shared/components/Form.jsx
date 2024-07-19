import React from 'react'


const Form = (submitHandler, changeHandler ) => {

    
   

  return (
    <form className="space-y-6" onSubmit={handleOnSubmit}>
      
      <div>
        <button
          type="submit"
          className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Product Brand
        </button>
      </div>
    </form>
  );
}

export default Form