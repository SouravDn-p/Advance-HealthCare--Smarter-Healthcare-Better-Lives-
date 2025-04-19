"use client";

import { useState } from "react";
import { X, MessageSquare } from "lucide-react";

const ResponseForm = ({ feedback, onSubmit, onCancel, onStatusChange }) => {
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(feedback.status);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!response.trim()) {
      setError("Response cannot be empty");
      return;
    }

    // Submit response and update status if changed
    onSubmit(response);
    if (status !== feedback.status) {
      onStatusChange(status);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              Respond to Feedback
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Provide a response to: {feedback.title}
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

        {/* Original Feedback */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-start">
            <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {feedback.createdBy.name}
              </p>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                {feedback.description}
              </p>
            </div>
          </div>
        </div>

        {/* Response */}
        <div>
          <label
            htmlFor="response"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Your Response
          </label>
          <textarea
            name="response"
            id="response"
            rows={4}
            value={response}
            onChange={(e) => {
              setResponse(e.target.value);
              if (error) setError("");
            }}
            className={`mt-1 block w-full px-3 py-2 border ${
              error
                ? "border-red-300 dark:border-red-700"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            placeholder="Type your response here..."
          />
          {error && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>

        {/* Update Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Update Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="under_review">Under Review</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
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
          Send Response
        </button>
      </div>
    </form>
  );
};

export default ResponseForm;
