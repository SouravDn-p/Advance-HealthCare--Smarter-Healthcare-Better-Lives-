"use client";

import { useState } from "react";
import {
  Search,
  FileText,
  Video,
  Download,
  ExternalLink,
  ChevronRight,
} from "react-feather";

const UserGuides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const categories = [
    { id: "all", name: "All Guides" },
    { id: "getting-started", name: "Getting Started" },
    { id: "account", name: "Account Management" },
    { id: "appointments", name: "Appointments" },
    { id: "medical-records", name: "Medical Records" },
    { id: "billing", name: "Billing & Insurance" },
    { id: "telehealth", name: "Telehealth" },
  ];

  const guides = [
    {
      id: 1,
      title: "Getting Started with Your Patient Portal",
      description:
        "Learn how to set up your account and navigate the patient portal.",
      category: "getting-started",
      type: "article",
      icon: <FileText size={20} />,
      timeToRead: "5 min read",
    },
    {
      id: 2,
      title: "How to Schedule an Appointment",
      description:
        "Step-by-step guide to scheduling appointments with your healthcare provider.",
      category: "appointments",
      type: "video",
      icon: <Video size={20} />,
      timeToRead: "3 min video",
    },
    {
      id: 3,
      title: "Accessing and Understanding Your Medical Records",
      description:
        "Learn how to view, download, and interpret your medical records.",
      category: "medical-records",
      type: "article",
      icon: <FileText size={20} />,
      timeToRead: "8 min read",
    },
    {
      id: 4,
      title: "Managing Your Account Settings",
      description:
        "How to update your personal information, password, and notification preferences.",
      category: "account",
      type: "article",
      icon: <FileText size={20} />,
      timeToRead: "4 min read",
    },
    {
      id: 5,
      title: "Understanding Your Medical Bill",
      description:
        "A guide to reading and understanding your healthcare bills and insurance coverage.",
      category: "billing",
      type: "article",
      icon: <FileText size={20} />,
      timeToRead: "6 min read",
    },
    {
      id: 6,
      title: "Setting Up for Your Telehealth Appointment",
      description:
        "Technical requirements and tips for a successful virtual visit.",
      category: "telehealth",
      type: "video",
      icon: <Video size={20} />,
      timeToRead: "4 min video",
    },
    {
      id: 7,
      title: "How to Request Prescription Refills",
      description:
        "Learn how to request medication refills through the patient portal.",
      category: "medical-records",
      type: "article",
      icon: <FileText size={20} />,
      timeToRead: "3 min read",
    },
    {
      id: 8,
      title: "Submitting Insurance Information",
      description:
        "How to add or update your insurance information in your account.",
      category: "billing",
      type: "article",
      icon: <FileText size={20} />,
      timeToRead: "5 min read",
    },
    {
      id: 9,
      title: "Using the Mobile App",
      description:
        "Tips and tricks for using our mobile application effectively.",
      category: "getting-started",
      type: "video",
      icon: <Video size={20} />,
      timeToRead: "6 min video",
    },
    {
      id: 10,
      title: "Setting Up Emergency Contacts",
      description:
        "How to add and manage emergency contacts in your healthcare profile.",
      category: "account",
      type: "article",
      icon: <FileText size={20} />,
      timeToRead: "3 min read",
    },
  ];

  // Filter guides based on search query and active category
  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || guide.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        User Guides & Documentation
      </h2>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search guides..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <div className="flex overflow-x-auto mb-6 pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 mr-2 whitespace-nowrap rounded-md ${
              activeCategory === category.id
                ? "bg-teal-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {filteredGuides.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No guides found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <a
              key={guide.id}
              href="#"
              className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`p-2 rounded-full ${
                      guide.type === "video"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                        : "bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300"
                    } mr-4`}
                  >
                    {guide.icon}
                  </div>
                  <span className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
                    {guide.type}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                  {guide.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {guide.timeToRead}
                  </span>
                  <div className="flex items-center text-teal-600 dark:text-teal-400 text-sm font-medium">
                    <span>Read more</span>
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="mt-12 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Downloadable Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="#"
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
          >
            <Download className="text-teal-500 mr-3" size={24} />
            <div>
              <span className="block font-medium text-gray-800 dark:text-white">
                Complete Patient Guide
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                PDF • 2.4 MB
              </span>
            </div>
            <ExternalLink size={16} className="ml-auto text-gray-400" />
          </a>
          <a
            href="#"
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
          >
            <Download className="text-teal-500 mr-3" size={24} />
            <div>
              <span className="block font-medium text-gray-800 dark:text-white">
                Insurance Coverage Guide
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                PDF • 1.8 MB
              </span>
            </div>
            <ExternalLink size={16} className="ml-auto text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserGuides;
