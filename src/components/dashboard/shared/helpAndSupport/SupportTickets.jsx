import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "react-feather";

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "technical",
    priority: "medium",
    description: "",
  });

  // Mock data for tickets
  const mockTickets = [
    {
      id: "TKT-1001",
      subject: "Cannot access my medical records",
      category: "technical",
      status: "open",
      priority: "high",
      createdAt: "2023-04-15T10:30:00Z",
      updatedAt: "2023-04-15T14:45:00Z",
      messages: [
        {
          sender: "user",
          message:
            'I\'m trying to view my lab results but I keep getting an error message saying "Access Denied".',
          timestamp: "2023-04-15T10:30:00Z",
        },
        {
          sender: "support",
          message:
            "Thank you for reporting this issue. Could you please provide more details about when this started happening and which specific records you're trying to access?",
          timestamp: "2023-04-15T14:45:00Z",
        },
      ],
    },
    {
      id: "TKT-1002",
      subject: "Appointment scheduling error",
      category: "appointment",
      status: "in_progress",
      priority: "medium",
      createdAt: "2023-04-14T09:15:00Z",
      updatedAt: "2023-04-14T16:20:00Z",
      messages: [
        {
          sender: "user",
          message:
            'When I try to schedule an appointment with Dr. Smith, I get an error message saying "Calendar unavailable".',
          timestamp: "2023-04-14T09:15:00Z",
        },
        {
          sender: "support",
          message:
            "We're currently investigating this issue with Dr. Smith's calendar integration. As a workaround, you can call our office directly to schedule.",
          timestamp: "2023-04-14T11:30:00Z",
        },
        {
          sender: "user",
          message:
            "Thank you for the information. Is there an estimated time when this will be fixed?",
          timestamp: "2023-04-14T13:45:00Z",
        },
        {
          sender: "support",
          message:
            "Our technical team is working on it and we expect it to be resolved within 24-48 hours. We'll notify you once it's fixed.",
          timestamp: "2023-04-14T16:20:00Z",
        },
      ],
    },
    {
      id: "TKT-1003",
      subject: "Billing discrepancy on recent visit",
      category: "billing",
      status: "resolved",
      priority: "medium",
      createdAt: "2023-04-10T13:20:00Z",
      updatedAt: "2023-04-12T15:10:00Z",
      messages: [
        {
          sender: "user",
          message:
            "I was charged twice for my visit on April 5th. Please help resolve this issue.",
          timestamp: "2023-04-10T13:20:00Z",
        },
        {
          sender: "support",
          message:
            "I've reviewed your account and confirmed the duplicate charge. We'll process a refund which should appear on your account in 3-5 business days.",
          timestamp: "2023-04-11T09:45:00Z",
        },
        {
          sender: "user",
          message: "Thank you for the quick resolution!",
          timestamp: "2023-04-11T10:30:00Z",
        },
        {
          sender: "support",
          message:
            "You're welcome! The refund has been processed. Is there anything else you need help with?",
          timestamp: "2023-04-12T15:10:00Z",
        },
      ],
    },
    {
      id: "TKT-1004",
      subject: "Password reset not working",
      category: "technical",
      status: "closed",
      priority: "low",
      createdAt: "2023-04-08T16:40:00Z",
      updatedAt: "2023-04-09T11:25:00Z",
      messages: [
        {
          sender: "user",
          message: "I requested a password reset but never received the email.",
          timestamp: "2023-04-08T16:40:00Z",
        },
        {
          sender: "support",
          message:
            "I've manually sent a password reset link to your email. Please check your spam folder if you don't see it in your inbox.",
          timestamp: "2023-04-09T09:15:00Z",
        },
        {
          sender: "user",
          message: "Found it in spam. Thanks for your help!",
          timestamp: "2023-04-09T10:30:00Z",
        },
        {
          sender: "support",
          message: "Great! Let us know if you need anything else.",
          timestamp: "2023-04-09T11:25:00Z",
        },
      ],
    },
  ];

  useEffect(() => {
    // Simulate API call to fetch tickets
    setTimeout(() => {
      setTickets(mockTickets);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const toggleTicketExpand = (ticketId) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  const handleNewTicketChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({
      ...newTicket,
      [name]: value,
    });
  };

  const handleNewTicketSubmit = (e) => {
    e.preventDefault();

    // Create new ticket object
    const newTicketObj = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: newTicket.subject,
      category: newTicket.category,
      status: "open",
      priority: newTicket.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          sender: "user",
          message: newTicket.description,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Add to tickets list
    setTickets([newTicketObj, ...tickets]);

    // Reset form and hide it
    setNewTicket({
      subject: "",
      category: "technical",
      priority: "medium",
      description: "",
    });
    setShowNewTicketForm(false);
  };

  // Filter and sort tickets
  const filteredTickets = tickets
    .filter((ticket) => {
      const matchesSearch =
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || ticket.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "priority") {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <AlertCircle size={16} className="text-yellow-500" />;
      case "in_progress":
        return <Clock size={16} className="text-blue-500" />;
      case "resolved":
        return <CheckCircle size={16} className="text-green-500" />;
      case "closed":
        return <XCircle size={16} className="text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "open":
        return "Open";
      case "in_progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      case "closed":
        return "Closed";
      default:
        return status;
    }
  };

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

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0">Support Tickets</h2>
        <button
          onClick={() => setShowNewTicketForm(!showNewTicketForm)}
          className="flex items-center bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={18} className="mr-2" />
          <span>New Ticket</span>
        </button>
      </div>

      {showNewTicketForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4">
            Create New Support Ticket
          </h3>
          <form onSubmit={handleNewTicketSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={newTicket.subject}
                  onChange={handleNewTicketChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={newTicket.category}
                    onChange={handleNewTicketChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="appointment">Appointment</option>
                    <option value="medical">Medical</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={newTicket.priority}
                    onChange={handleNewTicketChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={newTicket.description}
                onChange={handleNewTicketChange}
                required
                rows="4"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Please describe your issue in detail..."
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowNewTicketForm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <button className="flex items-center px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                <Filter size={16} className="mr-2" />
                <span>
                  Status:{" "}
                  {statusFilter === "all" ? "All" : getStatusText(statusFilter)}
                </span>
                <ChevronDown size={16} className="ml-2" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700 py-1">
                <button
                  onClick={() => handleStatusFilterChange("all")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    statusFilter === "all"
                      ? "bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  All
                </button>
                <button
                  onClick={() => handleStatusFilterChange("open")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    statusFilter === "open"
                      ? "bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  Open
                </button>
                <button
                  onClick={() => handleStatusFilterChange("in_progress")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    statusFilter === "in_progress"
                      ? "bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => handleStatusFilterChange("resolved")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    statusFilter === "resolved"
                      ? "bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  Resolved
                </button>
                <button
                  onClick={() => handleStatusFilterChange("closed")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    statusFilter === "closed"
                      ? "bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  Closed
                </button>
              </div>
            </div>

            <div className="relative">
              <button className="flex items-center px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                <span>
                  Sort by:{" "}
                  {sortBy === "newest"
                    ? "Newest"
                    : sortBy === "oldest"
                    ? "Oldest"
                    : "Priority"}
                </span>
                <ChevronDown size={16} className="ml-2" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700 py-1">
                <button
                  onClick={() => handleSortChange("newest")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    sortBy === "newest"
                      ? "bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  Newest First
                </button>
                <button
                  onClick={() => handleSortChange("oldest")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    sortBy === "oldest"
                      ? "bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  Oldest First
                </button>
                <button
                  onClick={() => handleSortChange("priority")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    sortBy === "priority"
                      ? "bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  Priority
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No tickets found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => toggleTicketExpand(ticket.id)}
                >
                  <div className="flex items-start md:items-center mb-4 md:mb-0">
                    <div className="mr-4">{getStatusIcon(ticket.status)}</div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        {ticket.subject}
                      </h3>
                      <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="mr-3">#{ticket.id}</span>
                        <span className="mr-3">
                          Created: {formatDate(ticket.createdAt)}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ticket.priority === "high"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : ticket.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          }`}
                        >
                          {ticket.priority.charAt(0).toUpperCase() +
                            ticket.priority.slice(1)}{" "}
                          Priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ticket.status === "open"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : ticket.status === "in_progress"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : ticket.status === "resolved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {getStatusText(ticket.status)}
                    </span>
                    <div className="ml-4">
                      {expandedTicket === ticket.id ? (
                        <ChevronUp size={20} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedTicket === ticket.id && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Conversation
                      </h4>
                      <div className="space-y-4">
                        {ticket.messages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex ${
                              message.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-3/4 p-3 rounded-lg ${
                                message.sender === "user"
                                  ? "bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200"
                                  : "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                              }`}
                            >
                              <p className="text-sm">{message.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatDate(message.timestamp)} •{" "}
                                {message.sender === "user"
                                  ? "You"
                                  : "Support Agent"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {ticket.status !== "closed" && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                          Reply
                        </h4>
                        <div className="flex">
                          <textarea
                            className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Type your message here..."
                            rows="2"
                          ></textarea>
                          <button className="px-4 bg-teal-500 hover:bg-teal-600 text-white rounded-r-md transition-colors">
                            <MessageSquare size={20} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportTickets;
