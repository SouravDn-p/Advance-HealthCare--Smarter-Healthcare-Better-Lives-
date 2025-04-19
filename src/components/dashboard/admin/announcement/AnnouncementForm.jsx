"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Info, CheckCircle, Calendar } from "lucide-react";

const AnnouncementForm = ({ announcement, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "info",
    priority: "medium",
    expiresAt: "",
  });
  const [errors, setErrors] = useState({});

  // If editing, populate form with announcement data
  useEffect(() => {
    if (announcement) {
      setFormData({
        ...announcement,
        expiresAt: announcement.expiresAt
          ? new Date(announcement.expiresAt).toISOString().split("T")[0]
          : "",
      });
    }
  }, [announcement]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!formData.type) {
      newErrors.type = "Type is required";
    }

    if (!formData.priority) {
      newErrors.priority = "Priority is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Format data for submission
      const submissionData = {
        ...formData,
        id: announcement?.id || null,
        expiresAt: formData.expiresAt
          ? new Date(formData.expiresAt).toISOString()
          : null,
      };

      onSubmit(submissionData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            {announcement ? "Edit Announcement" : "Create New Announcement"}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {announcement
              ? "Update the details of this announcement"
              : "Fill in the details to create a new announcement"}
          </p>
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.title
                ? "border-red-300 dark:border-red-700"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.title}
            </p>
          )}
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows={4}
            value={formData.content}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.content
                ? "border-red-300 dark:border-red-700"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.content}
            </p>
          )}
        </div>

        {/* Type */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Type
          </label>
          <div className="mt-1 grid grid-cols-2 gap-3">
            <label
              className={`flex items-center p-3 border rounded-md cursor-pointer ${
                formData.type === "info"
                  ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <input
                type="radio"
                name="type"
                value="info"
                checked={formData.type === "info"}
                onChange={handleChange}
                className="sr-only"
              />
              <Info className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Information
              </span>
            </label>
            <label
              className={`flex items-center p-3 border rounded-md cursor-pointer ${
                formData.type === "warning"
                  ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <input
                type="radio"
                name="type"
                value="warning"
                checked={formData.type === "warning"}
                onChange={handleChange}
                className="sr-only"
              />
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Warning
              </span>
            </label>
            <label
              className={`flex items-center p-3 border rounded-md cursor-pointer ${
                formData.type === "success"
                  ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <input
                type="radio"
                name="type"
                value="success"
                checked={formData.type === "success"}
                onChange={handleChange}
                className="sr-only"
              />
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Success
              </span>
            </label>
            <label
              className={`flex items-center p-3 border rounded-md cursor-pointer ${
                formData.type === "error"
                  ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <input
                type="radio"
                name="type"
                value="error"
                checked={formData.type === "error"}
                onChange={handleChange}
                className="sr-only"
              />
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Error
              </span>
            </label>
          </div>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.type}
            </p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.priority}
            </p>
          )}
        </div>

        {/* Expiration Date */}
        <div>
          <label
            htmlFor="expiresAt"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Expiration Date (Optional)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="date"
              name="expiresAt"
              id="expiresAt"
              value={formData.expiresAt}
              onChange={handleChange}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Select a date"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Leave blank if the announcement does not expire
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {announcement ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default AnnouncementForm;
