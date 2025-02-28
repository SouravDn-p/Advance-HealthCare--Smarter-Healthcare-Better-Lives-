import React, { useContext } from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import { AuthContexts } from "../providers/AuthProvider";

export default function Main() {
  const { theme } = useContext(AuthContexts);
  const location = useLocation();
  const isLogin = location.pathname.includes("login", "register");
  return (
    <div
      className={`rounded-xl shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800
          ${
            theme === "light"
              ? "bg-white/90 text-gray-900"
              : "bg-gray-900/90 text-gray-100"
          }`}
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <Header />
      {isLogin || <Navbar />}
      <Outlet />
      {isLogin || <Footer />}
    </div>
  );
}
