"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  Award,
  Star,
  Clock,
  Building,
  HeartPulse,
  Sun,
  Moon,
} from "lucide-react";

const StatsWithThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // If no saved preference, use system preference
      setTheme("dark");
    }
  }, []);

  // Update document when theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const stats = [
    {
      icon: (
        <Users
          className={`w-8 h-8 ${
            theme === "dark" ? "text-blue-400" : "text-blue-600"
          }`}
        />
      ),
      value: "10,000+",
      description: "Patients Served",
    },
    {
      icon: (
        <Calendar
          className={`w-8 h-8 ${
            theme === "dark" ? "text-green-400" : "text-green-600"
          }`}
        />
      ),
      value: "15,000+",
      description: "Appointments",
    },
    {
      icon: (
        <Award
          className={`w-8 h-8 ${
            theme === "dark" ? "text-yellow-400" : "text-yellow-600"
          }`}
        />
      ),
      value: "50+",
      description: "Awards Won",
    },
    {
      icon: (
        <Star
          className={`w-8 h-8 ${
            theme === "dark" ? "text-orange-400" : "text-orange-600"
          }`}
        />
      ),
      value: "4.9/5",
      description: "Patient Rating",
    },
    {
      icon: (
        <Clock
          className={`w-8 h-8 ${
            theme === "dark" ? "text-purple-400" : "text-purple-600"
          }`}
        />
      ),
      value: "24/7",
      description: "Available Support",
    },
    {
      icon: (
        <Building
          className={`w-8 h-8 ${
            theme === "dark" ? "text-indigo-400" : "text-indigo-600"
          }`}
        />
      ),
      value: "12",
      description: "Medical Centers",
    },
    {
      icon: (
        <HeartPulse
          className={`w-8 h-8 ${
            theme === "dark" ? "text-red-400" : "text-red-600"
          }`}
        />
      ),
      value: "98%",
      description: "Recovery Rate",
    },
  ];

  return (
    <section className="py-16 transition-colors duration-300 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Theme Toggle Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're proud of the difference we've made in healthcare delivery and
            patient outcomes
          </p>
        </div>

        {/* Stats Section */}
        <div
          className={`mt-8 bg-opacity-30 py-12 px-6 md:px-12 rounded-xl text-center ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          } transition-colors duration-300 shadow-lg`}
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105"
              >
                <div className="p-3 rounded-full bg-gray-50 dark:bg-gray-700">
                  {stat.icon}
                </div>
                <h3
                  className={`mt-4 text-3xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </h3>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  } text-sm mt-1`}
                >
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Context */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our commitment to excellence has helped us achieve these milestones,
            and we continue to strive for better healthcare outcomes every day.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300">
            Learn More About Our Impact
          </button>
        </div>
      </div>
    </section>
  );
};

export default StatsWithThemeToggle;
