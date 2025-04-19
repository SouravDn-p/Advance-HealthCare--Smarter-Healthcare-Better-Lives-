"use client";

import { useState } from "react";
import {
  X,
  MessageSquare,
  User,
  Calendar,
  Tag,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  XCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const FeedbackDetails = ({
  feedback,
  onClose,
  onRespond,
  onStatusChange,
  isAdmin,
}) => {
  const [status, setStatus] = useState(feedback.status);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "under_review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "in_progress":
        return <RefreshCw className="w-4 h-4" />;
      case "under_review":
        return <AlertCircle className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case "feedback":
        return <ThumbsUp className="w-4 h-4" />;
      case "complaint":
        return <ThumbsDown className="w-4 h-4" />;
      case "suggestion":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  // Handle status change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            {feedback.title}
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Feedback Details */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col space-y-4">
            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Submitted By
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {feedback.createdBy.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Date Submitted
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(feedback.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Tag className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {feedback.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  {getTypeIcon(feedback.type)}
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {feedback.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">
                  Status:
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                    feedback.status
                  )}`}
                >
                  {getStatusIcon(feedback.status)}
                  <span className="ml-1 capitalize">
                    {feedback.status.replace("_", " ")}
                  </span>
                </span>
              </div>
              {isAdmin && (
                <div className="flex items-center">
                  <label
                    htmlFor="status-change"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
                  >
                    Update:
                  </label>
                  <select
                    id="status-change"
                    value={status}
                    onChange={handleStatusChange}
                    className="text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="under_review">Under Review</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Description
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {feedback.description}
              </p>
            </div>
          </div>
        </div>

        {/* Responses */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Responses
          </h4>
          {feedback.responses.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700">
              <MessageSquare className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                No responses yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedback.responses.map((response) => (
                <div
                  key={response.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <User className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {response.createdBy.name}
                          {response.createdBy.role === "admin" && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                              Staff
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(response.createdAt)}
                        </p>
                      </div>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {response.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
          {isAdmin && onRespond && (
            <button
              type="button"
              onClick={onRespond}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Respond
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetails;
