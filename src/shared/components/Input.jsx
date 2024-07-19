import React from 'react'

const Input = ({OnChangeHandler, label, value, name}) => {
  
  const handleOnChange = (e) => {
      
      OnChangeHandler(e.target.name, e.target.value);
  }

  return (
    <div>
      <label
        htmlFor="name"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          onChange={handleOnChange}
          value={value}
          name={name}
          className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}

export default Input