"use client";

import { useState } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreHorizontal,
  Plus,
  RefreshCw,
  User,
  Calendar,
  Tag,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import FeedbackForm from "./FeedbackForm";
import ResponseForm from "./ResponseForm";
import FeedbackDetails from "./FeedbackDetails";
import useAuth from "../../../../hooks/useAuth";

// Sample feedback data - in a real app, this would come from an API
const sampleFeedback = [
  {
    id: "1",
    title: "Appointment Scheduling Issues",
    description:
      "I've been trying to schedule an appointment for the past week but the system keeps showing errors.",
    type: "complaint",
    category: "Technical",
    status: "pending",
    priority: "high",
    createdAt: "2023-04-28T10:30:00Z",
    createdBy: {
      id: "user1",
      name: "John Smith",
      email: "john.smith@example.com",
    },
    responses: [],
  },
  {
    id: "2",
    title: "Great Experience with Dr. Johnson",
    description:
      "I had an excellent experience with Dr. Johnson during my recent visit. She was very thorough and took the time to explain everything clearly.",
    type: "feedback",
    category: "Doctor",
    status: "resolved",
    priority: "medium",
    createdAt: "2023-04-25T14:15:00Z",
    createdBy: {
      id: "user2",
      name: "Emily Davis",
      email: "emily.davis@example.com",
    },
    responses: [
      {
        id: "resp1",
        content:
          "Thank you for your positive feedback! We're glad you had a great experience with Dr. Johnson.",
        createdAt: "2023-04-26T09:20:00Z",
        createdBy: {
          id: "admin1",
          name: "Admin User",
          role: "admin",
        },
      },
    ],
  },
  {
    id: "3",
    title: "Billing Discrepancy",
    description:
      "I was charged twice for my last appointment. Please review and refund the extra charge.",
    type: "complaint",
    category: "Billing",
    status: "in_progress",
    priority: "high",
    createdAt: "2023-04-20T09:45:00Z",
    createdBy: {
      id: "user3",
      name: "Robert Wilson",
      email: "robert.wilson@example.com",
    },
    responses: [
      {
        id: "resp2",
        content:
          "We apologize for the inconvenience. Our billing department is reviewing your case and will process a refund if a double charge is confirmed.",
        createdAt: "2023-04-21T11:30:00Z",
        createdBy: {
          id: "admin2",
          name: "Billing Support",
          role: "admin",
        },
      },
    ],
  },
  {
    id: "4",
    title: "Suggestion for Patient Portal",
    description:
      "It would be helpful if the patient portal had a feature to download all medical records at once instead of one by one.",
    type: "suggestion",
    category: "Website",
    status: "under_review",
    priority: "medium",
    createdAt: "2023-04-18T16:20:00Z",
    createdBy: {
      id: "user4",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
    },
    responses: [
      {
        id: "resp3",
        content:
          "Thank you for your suggestion. We're currently evaluating improvements to our patient portal and will consider this feature in our next update.",
        createdAt: "2023-04-19T10:15:00Z",
        createdBy: {
          id: "admin3",
          name: "IT Support",
          role: "admin",
        },
      },
    ],
  },
  {
    id: "5",
    title: "Long Wait Times",
    description:
      "I had to wait over an hour past my scheduled appointment time. This has happened multiple times now.",
    type: "complaint",
    category: "Service",
    status: "pending",
    priority: "high",
    createdAt: "2023-04-15T13:10:00Z",
    createdBy: {
      id: "user5",
      name: "David Lee",
      email: "david.lee@example.com",
    },
    responses: [],
  },
];

const FeedbackComplaints = () => {
  const { user, dbUser, theme } = useAuth();
  const [feedbackList, setFeedbackList] = useState(sampleFeedback);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const isAdmin = dbUser?.role === "admin";

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

  // Get type badge color
  const getTypeBadge = (type) => {
    switch (type) {
      case "feedback":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "complaint":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "suggestion":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
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

  // Get priority badge color
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  // Handle creating a new feedback
  const handleCreateFeedback = (newFeedback) => {
    // In a real app, you would make an API call here
    const feedbackWithId = {
      ...newFeedback,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: {
        id: user?.id || "user",
        name: user?.displayName || "User",
        email: user?.email || "user@example.com",
      },
      responses: [],
    };
    setFeedbackList([feedbackWithId, ...feedbackList]);
    setShowForm(false);
  };

  // Handle responding to feedback
  const handleRespondToFeedback = (feedbackId, responseContent) => {
    // In a real app, you would make an API call here
    const updatedFeedbackList = feedbackList.map((feedback) => {
      if (feedback.id === feedbackId) {
        const newResponse = {
          id: `resp${Date.now()}`,
          content: responseContent,
          createdAt: new Date().toISOString(),
          createdBy: {
            id: user?.id || "admin",
            name: user?.displayName || "Admin User",
            role: "admin",
          },
        };
        return {
          ...feedback,
          responses: [...feedback.responses, newResponse],
          status: "in_progress", // Automatically update status when admin responds
        };
      }
      return feedback;
    });
    setFeedbackList(updatedFeedbackList);
    setShowResponseForm(false);
  };

  // Handle updating feedback status
  const handleUpdateStatus = (feedbackId, newStatus) => {
    // In a real app, you would make an API call here
    const updatedFeedbackList = feedbackList.map((feedback) => {
      if (feedback.id === feedbackId) {
        return {
          ...feedback,
          status: newStatus,
        };
      }
      return feedback;
    });
    setFeedbackList(updatedFeedbackList);
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort feedback
  const filteredAndSortedFeedback = [...feedbackList]
    .filter((feedback) => {
      // For regular users, only show their own feedback
      if (!isAdmin && feedback.createdBy.id !== (user?.id || "user")) {
        return false;
      }

      const matchesSearch =
        feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || feedback.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || feedback.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || feedback.priority === priorityFilter;
      return matchesSearch && matchesType && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  // View feedback details
  const viewFeedbackDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setShowDetails(true);
  };

  // Open response form
  const openResponseForm = (feedback) => {
    setSelectedFeedback(feedback);
    setShowResponseForm(true);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Feedback & Complaints
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {isAdmin
              ? "Manage and respond to user feedback and complaints"
              : "Submit and track your feedback and complaints"}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          <Plus className="w-4 h-4" />
          {isAdmin ? "Add Feedback" : "Submit Feedback"}
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Filter className="w-4 h-4" />
            Filters
            {showFilters ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">All Types</option>
              <option value="feedback">Feedback</option>
              <option value="complaint">Complaint</option>
              <option value="suggestion">Suggestion</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="under_review">Under Review</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort By
            </label>
            <select
              value={`${sortConfig.key}-${sortConfig.direction}`}
              onChange={(e) => {
                const [key, direction] = e.target.value.split("-");
                setSortConfig({ key, direction });
              }}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="priority-desc">Priority (High to Low)</option>
              <option value="priority-asc">Priority (Low to High)</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        </div>
      )}

      {/* Feedback List */}
      {filteredAndSortedFeedback.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No feedback found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchTerm ||
            typeFilter !== "all" ||
            statusFilter !== "all" ||
            priorityFilter !== "all"
              ? "No feedback matches your filters. Try adjusting your search criteria."
              : isAdmin
              ? "There are no feedback submissions at this time."
              : "You haven't submitted any feedback yet."}
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              {isAdmin ? "Add Feedback" : "Submit Feedback"}
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 ">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-6"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 hidden md:table-cell"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 hidden lg:table-cell"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 hidden lg:table-cell"
                >
                  Priority
                </th>
                {isAdmin && (
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 hidden md:table-cell"
                  >
                    Submitted By
                  </th>
                )}
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 hidden sm:table-cell"
                >
                  Date
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              {filteredAndSortedFeedback.map((feedback) => (
                <tr
                  key={feedback.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                  onClick={() => viewFeedbackDetails(feedback)}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                    <div className="flex items-center">
                      <span className="truncate max-w-[200px]">
                        {feedback.title}
                      </span>
                      {feedback.responses.length > 0 && (
                        <span className="ml-2 flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          {feedback.responses.length}{" "}
                          {feedback.responses.length === 1
                            ? "response"
                            : "responses"}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadge(
                        feedback.type
                      )}`}
                    >
                      {getTypeIcon(feedback.type)}
                      <span className="ml-1 capitalize">{feedback.type}</span>
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">
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
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(
                        feedback.priority
                      )}`}
                    >
                      <span className="capitalize">{feedback.priority}</span>
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="ml-2">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {feedback.createdBy.name}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs">
                            {feedback.createdBy.email}
                          </div>
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(feedback.createdAt)}
                    </div>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div
                      className="flex justify-end items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {isAdmin && (
                        <div className="relative inline-block text-left">
                          <div>
                            <button
                              type="button"
                              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                openResponseForm(feedback);
                              }}
                            >
                              <span className="sr-only">Respond</span>
                              <MessageSquare className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      )}
                      <div className="relative inline-block text-left ml-2">
                        <div>
                          <button
                            type="button"
                            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              viewFeedbackDetails(feedback);
                            }}
                          >
                            <span className="sr-only">View Details</span>
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Submit Feedback Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <FeedbackForm
                onSubmit={handleCreateFeedback}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Response Form Modal */}
      {showResponseForm && selectedFeedback && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <ResponseForm
                feedback={selectedFeedback}
                onSubmit={(response) =>
                  handleRespondToFeedback(selectedFeedback.id, response)
                }
                onCancel={() => setShowResponseForm(false)}
                onStatusChange={(status) =>
                  handleUpdateStatus(selectedFeedback.id, status)
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Feedback Details Modal */}
      {showDetails && selectedFeedback && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <FeedbackDetails
                feedback={selectedFeedback}
                onClose={() => setShowDetails(false)}
                onRespond={
                  isAdmin
                    ? () => {
                        setShowDetails(false);
                        openResponseForm(selectedFeedback);
                      }
                    : null
                }
                onStatusChange={
                  isAdmin
                    ? (status) =>
                        handleUpdateStatus(selectedFeedback.id, status)
                    : null
                }
                isAdmin={isAdmin}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackComplaints;
