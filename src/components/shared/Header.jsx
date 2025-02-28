"use client";

import { useState } from "react";
import { Search, Phone, HelpCircle, LogIn, Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import plus from "../../assets/plus.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-gradient-to-r from-[#D3E2CD] to-[#e8f0e5] shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="transition-transform hover:scale-105">
              <img
                src={plus || "/placeholder.svg"}
                alt="Plus icon"
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
              />
            </div>
            <div className="transition-transform hover:scale-105">
              <img
                src={logo || "/placeholder.svg"}
                alt="Advance HealthService logo"
                className="h-12 w-32 sm:h-16 sm:w-40 object-contain"
              />
            </div>
          </div>

          <button
            className="lg:hidden absolute right-4 top-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>

          <div
            className={`lg:flex flex-col items-end space-y-3 w-full lg:w-auto ${
              isMenuOpen ? "flex" : "hidden"
            }`}
          >
            <div className="flex items-center space-x-2 w-full max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button className="bg-[#2d2e4a] hover:bg-[#3e3f64] text-white px-4 py-2 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
                Search
              </button>
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                <Phone className="h-4 w-4" />
                <span>+88 0179450666</span>
              </button>
              <NavLink to={'/faq'} className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                <HelpCircle className="h-4 w-4" />
                <span>FAQs</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
