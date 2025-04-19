"use client";

import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";

const LanguageSettings = ({ onSave }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    language: user?.language || "en",
    region: user?.region || "US",
    dateFormat: user?.dateFormat || "MM/DD/YYYY",
    timeFormat: user?.timeFormat || "12h",
    timezone: user?.timezone || "America/New_York",
    measurementSystem: user?.measurementSystem || "imperial",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log("Language settings to save:", formData);

    // Call the onSave callback to show success message
    onSave();
  };

  // Language options
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español (Spanish)" },
    { code: "fr", name: "Français (French)" },
    { code: "de", name: "Deutsch (German)" },
    { code: "zh", name: "中文 (Chinese)" },
    { code: "ja", name: "日本語 (Japanese)" },
    { code: "ar", name: "العربية (Arabic)" },
    { code: "hi", name: "हिन्दी (Hindi)" },
    { code: "pt", name: "Português (Portuguese)" },
    { code: "ru", name: "Русский (Russian)" },
  ];

  // Region options
  const regions = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "IN", name: "India" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "JP", name: "Japan" },
    { code: "BR", name: "Brazil" },
    { code: "MX", name: "Mexico" },
  ];

  // Timezone options (abbreviated list)
  const timezones = [
    { code: "America/New_York", name: "Eastern Time (ET)" },
    { code: "America/Chicago", name: "Central Time (CT)" },
    { code: "America/Denver", name: "Mountain Time (MT)" },
    { code: "America/Los_Angeles", name: "Pacific Time (PT)" },
    { code: "America/Anchorage", name: "Alaska Time" },
    { code: "Pacific/Honolulu", name: "Hawaii Time" },
    { code: "Europe/London", name: "Greenwich Mean Time (GMT)" },
    { code: "Europe/Paris", name: "Central European Time (CET)" },
    { code: "Asia/Tokyo", name: "Japan Standard Time (JST)" },
    { code: "Australia/Sydney", name: "Australian Eastern Time (AET)" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Language & Region Settings
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Language */}
        <div className="mb-6">
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Language
          </label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            This will change the language used throughout the application
          </p>
        </div>

        {/* Region */}
        <div className="mb-6">
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Region
          </label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {regions.map((region) => (
              <option key={region.code} value={region.code}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time Format */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Date & Time Format
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="dateFormat"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Date Format
              </label>
              <select
                id="dateFormat"
                name="dateFormat"
                value={formData.dateFormat}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="MM/DD/YYYY">
                  MM/DD/YYYY (e.g., 04/20/2023)
                </option>
                <option value="DD/MM/YYYY">
                  DD/MM/YYYY (e.g., 20/04/2023)
                </option>
                <option value="YYYY-MM-DD">
                  YYYY-MM-DD (e.g., 2023-04-20)
                </option>
                <option value="DD.MM.YYYY">
                  DD.MM.YYYY (e.g., 20.04.2023)
                </option>
                <option value="MMMM D, YYYY">
                  MMMM D, YYYY (e.g., April 20, 2023)
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="timeFormat"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Time Format
              </label>
              <select
                id="timeFormat"
                name="timeFormat"
                value={formData.timeFormat}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="12h">12-hour (e.g., 2:30 PM)</option>
                <option value="24h">24-hour (e.g., 14:30)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="mb-6">
          <label
            htmlFor="timezone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Timezone
          </label>
          <select
            id="timezone"
            name="timezone"
            value={formData.timezone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {timezones.map((timezone) => (
              <option key={timezone.code} value={timezone.code}>
                {timezone.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default LanguageSettings;
