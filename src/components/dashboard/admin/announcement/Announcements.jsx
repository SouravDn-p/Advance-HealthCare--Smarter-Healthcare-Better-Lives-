"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Plus,
  Search,
  Edit2,
  Trash2,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Calendar,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import AnnouncementForm from "./AnnouncementForm";
import DeleteConfirmation from "./DeleteConfirmation";
import useAuth from "../../../../hooks/useAuth";

// Sample announcement data - in a real app, this would come from an API
const sampleAnnouncements = [
  {
    id: "1",
    title: "System Maintenance",
    content:
      "The system will be down for maintenance on Sunday, May 5th from 2:00 AM to 4:00 AM EST.",
    type: "warning",
    createdAt: "2023-04-28T10:30:00Z",
    createdBy: "System Admin",
    expiresAt: "2023-05-06T00:00:00Z",
    priority: "high",
  },
  {
    id: "2",
    title: "New Feature: Online Prescription Renewal",
    content:
      "We're excited to announce that patients can now renew their prescriptions online through the patient portal.",
    type: "info",
    createdAt: "2023-04-25T14:15:00Z",
    createdBy: "Product Team",
    expiresAt: null,
    priority: "medium",
  },
  {
    id: "3",
    title: "COVID-19 Vaccination Clinic",
    content:
      "A COVID-19 vaccination clinic will be held in the main lobby on May 10th from 9:00 AM to 5:00 PM. No appointment necessary.",
    type: "info",
    createdAt: "2023-04-20T09:45:00Z",
    createdBy: "Dr. Sarah Johnson",
    expiresAt: "2023-05-11T00:00:00Z",
    priority: "medium",
  },
  {
    id: "4",
    title: "Electronic Health Records Update Complete",
    content:
      "The update to our electronic health records system has been completed successfully. All patient data is now accessible.",
    type: "success",
    createdAt: "2023-04-18T16:20:00Z",
    createdBy: "IT Department",
    expiresAt: "2023-04-30T00:00:00Z",
    priority: "low",
  },
  {
    id: "5",
    title: "Urgent: Network Outage",
    content:
      "We are currently experiencing network issues affecting the laboratory results system. Our IT team is working to resolve this issue.",
    type: "error",
    createdAt: "2023-04-29T08:05:00Z",
    createdBy: "IT Support",
    expiresAt: null,
    priority: "critical",
  },
];

const Announcements = () => {
  const { dbUser, user, theme } = useAuth();
  const [announcements, setAnnouncements] = useState(sampleAnnouncements);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [showFilters, setShowFilters] = useState(false);

  const isAdmin = dbUser?.role === "admin";

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "No expiration";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get icon based on announcement type
  const getAnnouncementIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  // Get background color based on announcement type
  const getAnnouncementBg = (type) => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
      case "info":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      default:
        return "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
    }
  };

  // Get priority badge color
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  // Handle creating a new announcement
  const handleCreateAnnouncement = (newAnnouncement) => {
    // In a real app, you would make an API call here
    const announcementWithId = {
      ...newAnnouncement,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: user?.displayName || "Admin User",
    };
    setAnnouncements([announcementWithId, ...announcements]);
    setShowForm(false);
  };

  // Handle updating an announcement
  const handleUpdateAnnouncement = (updatedAnnouncement) => {
    // In a real app, you would make an API call here
    const updatedAnnouncements = announcements.map((announcement) =>
      announcement.id === updatedAnnouncement.id
        ? updatedAnnouncement
        : announcement
    );
    setAnnouncements(updatedAnnouncements);
    setShowForm(false);
    setCurrentAnnouncement(null);
  };

  // Handle deleting an announcement
  const handleDeleteAnnouncement = () => {
    // In a real app, you would make an API call here
    const filteredAnnouncements = announcements.filter(
      (announcement) => announcement.id !== announcementToDelete.id
    );
    setAnnouncements(filteredAnnouncements);
    setShowDeleteConfirmation(false);
    setAnnouncementToDelete(null);
  };

  // Open edit form
  const openEditForm = (announcement) => {
    setCurrentAnnouncement(announcement);
    setShowForm(true);
  };

  // Open delete confirmation
  const openDeleteConfirmation = (announcement) => {
    setAnnouncementToDelete(announcement);
    setShowDeleteConfirmation(true);
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort announcements
  const filteredAndSortedAnnouncements = [...announcements]
    .filter((announcement) => {
      const matchesSearch =
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        typeFilter === "all" || announcement.type === typeFilter;
      const matchesPriority =
        priorityFilter === "all" || announcement.priority === priorityFilter;
      return matchesSearch && matchesType && matchesPriority;
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

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Announcements
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage system announcements and notifications
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => {
              setCurrentAnnouncement(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <Plus className="w-4 h-4" />
            New Announcement
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search announcements..."
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
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
              <option value="info">Information</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
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
              <option value="critical">Critical</option>
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

      {/* Announcements List */}
      {filteredAndSortedAnnouncements.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No announcements
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchTerm || typeFilter !== "all" || priorityFilter !== "all"
              ? "No announcements match your filters. Try adjusting your search criteria."
              : "There are no announcements at this time."}
          </p>
          {isAdmin && (
            <div className="mt-6">
              <button
                onClick={() => {
                  setCurrentAnnouncement(null);
                  setShowForm(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Announcement
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className={`p-4 rounded-lg border ${getAnnouncementBg(
                announcement.type
              )} relative`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  {getAnnouncementIcon(announcement.type)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {announcement.title}
                    </h3>
                    <div className="mt-2 sm:mt-0 flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getPriorityBadge(
                          announcement.priority
                        )}`}
                      >
                        {announcement.priority.charAt(0).toUpperCase() +
                          announcement.priority.slice(1)}{" "}
                        Priority
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(announcement.createdAt)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {announcement.content}
                  </p>
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                    <div className="text-gray-500 dark:text-gray-400">
                      Posted by: {announcement.createdBy}
                    </div>
                    <div className="mt-2 sm:mt-0 text-gray-500 dark:text-gray-400">
                      {announcement.expiresAt && (
                        <span>
                          Expires: {formatDate(announcement.expiresAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Actions */}
              {isAdmin && (
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => openEditForm(announcement)}
                    className="p-1 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openDeleteConfirmation(announcement)}
                    className="p-1 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Form Modal */}
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
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <AnnouncementForm
                announcement={currentAnnouncement}
                onSubmit={
                  currentAnnouncement
                    ? handleUpdateAnnouncement
                    : handleCreateAnnouncement
                }
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          announcement={announcementToDelete}
          onConfirm={handleDeleteAnnouncement}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </div>
  );
};

export default Announcements;
