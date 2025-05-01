import React from "react";

export default function Loader() {
  const theme = true;
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="relative">
        <div
          className={`w-20 h-20 border-4 rounded-full animate-spin ${
            theme
              ? "border-gray-700 border-t-purple-400"
              : "border-purple-200 border-t-purple-600"
          }`}
        ></div>
        <div
          className={`w-16 h-16 border-4 border-transparent rounded-full animate-spin absolute top-2 left-2 ${
            theme ? "border-t-indigo-300" : "border-t-indigo-400"
          }`}
        ></div>
        <div
          className={`mt-4 text-center font-medium ${
            theme ? "text-purple-300" : "text-purple-600"
          }`}
        >
          Loading your cars...
        </div>
      </div>
    </div>
  );
}
