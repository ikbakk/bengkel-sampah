import React from "react";

const InputLabel = ({ label, ...props }) => {
  return (
    <div className="my-5 flex flex-col text-black">
      <label htmlFor="name" className="font-semibold">
        {label}
      </label>
      <input
        {...props}
        className="mt-2 h-10 rounded-lg border border-blue-gray-300 p-5 placeholder:italic"
      />
    </div>
  );
};

export default InputLabel;
