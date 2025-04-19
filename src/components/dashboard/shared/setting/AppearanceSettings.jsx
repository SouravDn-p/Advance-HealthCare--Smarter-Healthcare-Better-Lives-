"use client";

import { useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import useAuth from "../../../../hooks/useAuth";

const AppearanceSettings = ({ onSave }) => {
  const { theme, setTheme } = useAuth();

  const [formData, setFormData] = useState({
    theme: theme || "system",
    fontSize: "medium",
    colorScheme: "default",
    reducedMotion: false,
    highContrast: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Update theme in real-time
    if (name === "theme") {
      setTheme(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log("Appearance settings to save:", formData);

    // Call the onSave callback to show success message
    onSave();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Appearance Settings
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Theme Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Theme
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center ${
                formData.theme === "light"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => {
                setFormData({ ...formData, theme: "light" });
                setTheme("light");
              }}
            >
              <Sun
                className={`w-8 h-8 mb-3 ${
                  formData.theme === "light"
                    ? "text-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <span
                className={`font-medium ${
                  formData.theme === "light"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Light Mode
              </span>
              <input
                type="radio"
                name="theme"
                value="light"
                checked={formData.theme === "light"}
                onChange={handleInputChange}
                className="sr-only"
              />
            </div>

            <div
              className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center ${
                formData.theme === "dark"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => {
                setFormData({ ...formData, theme: "dark" });
                setTheme("dark");
              }}
            >
              <Moon
                className={`w-8 h-8 mb-3 ${
                  formData.theme === "dark"
                    ? "text-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <span
                className={`font-medium ${
                  formData.theme === "dark"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Dark Mode
              </span>
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={formData.theme === "dark"}
                onChange={handleInputChange}
                className="sr-only"
              />
            </div>

            <div
              className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center ${
                formData.theme === "system"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => {
                setFormData({ ...formData, theme: "system" });
                setTheme("system");
              }}
            >
              <Monitor
                className={`w-8 h-8 mb-3 ${
                  formData.theme === "system"
                    ? "text-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <span
                className={`font-medium ${
                  formData.theme === "system"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                System Default
              </span>
              <input
                type="radio"
                name="theme"
                value="system"
                checked={formData.theme === "system"}
                onChange={handleInputChange}
                className="sr-only"
              />
            </div>
          </div>
        </div>

        {/* Font Size */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Font Size
          </h3>

          <div className="flex flex-wrap gap-3">
            {["small", "medium", "large", "x-large"].map((size) => (
              <label
                key={size}
                className={`px-4 py-2 border rounded-md cursor-pointer ${
                  formData.fontSize === size
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <input
                  type="radio"
                  name="fontSize"
                  value={size}
                  checked={formData.fontSize === size}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <span
                  className={
                    size === "small"
                      ? "text-sm"
                      : size === "large"
                      ? "text-lg"
                      : size === "x-large"
                      ? "text-xl"
                      : ""
                  }
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Scheme */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Color Scheme
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { id: "default", name: "Default", color: "bg-blue-500" },
              { id: "green", name: "Green", color: "bg-green-500" },
              { id: "purple", name: "Purple", color: "bg-purple-500" },
              { id: "orange", name: "Orange", color: "bg-orange-500" },
              { id: "red", name: "Red", color: "bg-red-500" },
              { id: "teal", name: "Teal", color: "bg-teal-500" },
              { id: "pink", name: "Pink", color: "bg-pink-500" },
              { id: "indigo", name: "Indigo", color: "bg-indigo-500" },
            ].map((scheme) => (
              <label
                key={scheme.id}
                className={`p-3 border rounded-lg cursor-pointer flex flex-col items-center ${
                  formData.colorScheme === scheme.id
                    ? "border-blue-500"
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full mb-2 ${scheme.color}`}
                ></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {scheme.name}
                </span>
                <input
                  type="radio"
                  name="colorScheme"
                  value={scheme.id}
                  checked={formData.colorScheme === scheme.id}
                  onChange={handleInputChange}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Accessibility Options */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Accessibility
          </h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="reducedMotion"
                  name="reducedMotion"
                  checked={formData.reducedMotion}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="reducedMotion"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Reduced Motion
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Minimize animations and transitions throughout the interface
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="highContrast"
                  name="highContrast"
                  checked={formData.highContrast}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="highContrast"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  High Contrast Mode
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Increase contrast between text and background for better
                  readability
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppearanceSettings;
