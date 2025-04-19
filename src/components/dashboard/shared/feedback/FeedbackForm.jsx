"use client";

import { useState } from "react";
import { X } from "lucide-react";

const FeedbackForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "feedback",
    category: "General",
    priority: "medium",
  });
  const [errors, setErrors] = useState({});

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

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.type) {
      newErrors.type = "Type is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
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
        status: "pending", // Default status for new submissions
      };

      onSubmit(submissionData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              Submit Feedback
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Share your feedback, suggestions, or report an issue
            </p>
          </div>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            onClick={onCancel}
          >
            <span className="sr-only">Close</span>
            <X className="h-6 w-6" />
          </button>
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
            placeholder="Brief title for your feedback"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.description
                ? "border-red-300 dark:border-red-700"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            placeholder="Please provide detailed information about your feedback, suggestion, or issue"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.description}
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
          <div className="mt-1 grid grid-cols-3 gap-3">
            <label
              className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                formData.type === "feedback"
                  ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <input
                type="radio"
                name="type"
                value="feedback"
                checked={formData.type === "feedback"}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Feedback
              </span>
            </label>
            <label
              className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                formData.type === "complaint"
                  ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <input
                type="radio"
                name="type"
                value="complaint"
                checked={formData.type === "complaint"}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Complaint
              </span>
            </label>
            <label
              className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                formData.type === "suggestion"
                  ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <input
                type="radio"
                name="type"
                value="suggestion"
                checked={formData.type === "suggestion"}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Suggestion
              </span>
            </label>
          </div>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.type}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="General">General</option>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="Doctor">Doctor/Staff</option>
            <option value="Service">Service</option>
            <option value="Website">Website/App</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.category}
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
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.priority}
            </p>
          )}
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
          Submit
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
