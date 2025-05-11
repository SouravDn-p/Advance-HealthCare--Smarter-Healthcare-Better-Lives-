import React from "react";
import SpecialtySelection from "./SpecialtySelection";
import useAuth from "../../hooks/useAuth";

const Doctor = () => {
  const { isDarkMode } = useAuth();
  return (
    <div
      className={`py-16 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200"
          : "bg-gradient-to-r from-[#D3E2CD] to-[#e8f0e5] text-gray-900"
      } transition-all relative duration-300`}
    >
      <SpecialtySelection />
    </div>
  );
};

export default Doctor;
