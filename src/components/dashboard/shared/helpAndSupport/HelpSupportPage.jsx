import React, { useState } from "react";
import {
  Search,
  HelpCircle,
  MessageSquare,
  FileText,
  Phone,
  Mail,
  Video,
  Users,
  BookOpen,
  ChevronRight,
  ExternalLink,
} from "react-feather";
import { Ticket } from "lucide-react";
import FAQSection from "./FAQSection";
import ContactForm from "./ContactForm";
import SupportTickets from "./SupportTickets";
import UserGuides from "./UserGuides";

const HelpSupportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "faq":
        return <FAQSection />;
      case "contact":
        return <ContactForm />;
      case "tickets":
        return <SupportTickets />;
      case "guides":
        return <UserGuides />;
      default:
        return (
          <div className="overview-section">
            <h2 className="text-2xl font-semibold mb-6">
              How can we help you today?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200 dark:border-gray-700"
                  onClick={() => setActiveTab(option.tab)}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 mr-4">
                      {option.icon}
                    </div>
                    <h3 className="text-lg font-medium">{option.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {option.description}
                  </p>
                  <div className="flex items-center text-teal-600 dark:text-teal-400 font-medium">
                    <span>Learn more</span>
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg p-6 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">
                    Need urgent medical assistance?
                  </h3>
                  <p className="mb-4">
                    For medical emergencies, please call emergency services
                    immediately.
                  </p>
                  <div className="flex items-center">
                    <Phone className="mr-2" size={20} />
                    <span className="text-xl font-bold">911</span>
                    <span className="mx-2">or</span>
                    <span className="text-xl font-bold">1-800-HEALTH-HELP</span>
                  </div>
                </div>
                <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Emergency Contact
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  const supportOptions = [
    {
      title: "Frequently Asked Questions",
      description:
        "Find quick answers to common questions about our services, appointments, and account management.",
      icon: <HelpCircle size={24} />,
      tab: "faq",
    },
    {
      title: "Contact Support",
      description:
        "Reach out to our support team directly through our contact form for personalized assistance.",
      icon: <MessageSquare size={24} />,
      tab: "contact",
    },
    {
      title: "Support Tickets",
      description:
        "View and manage your existing support tickets or create a new one to track your issues.",
      icon: <Ticket size={24} />,
      tab: "tickets",
    },
    {
      title: "User Guides",
      description:
        "Access comprehensive guides and documentation to help you navigate our healthcare platform.",
      icon: <BookOpen size={24} />,
      tab: "guides",
    },
    {
      title: "Video Tutorials",
      description:
        "Watch step-by-step video tutorials on how to use various features of our healthcare platform.",
      icon: <Video size={24} />,
      tab: "videos",
    },
    {
      title: "Community Forum",
      description:
        "Connect with other users, share experiences, and find community-sourced solutions.",
      icon: <Users size={24} />,
      tab: "community",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Help & Support
        </h1>

        <form onSubmit={handleSearch} className="relative mb-8">
          <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search for help topics..."
              className="w-full px-4 py-3 text-gray-700 dark:text-gray-200 bg-transparent outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 transition-colors"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        <div className="flex overflow-x-auto mb-6 pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 mr-2 whitespace-nowrap rounded-md ${
              activeTab === "overview"
                ? "bg-teal-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Overview
          </button>
          {supportOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(option.tab)}
              className={`px-4 py-2 mr-2 whitespace-nowrap rounded-md ${
                activeTab === option.tab
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {option.title}
            </button>
          ))}
        </div>

        {renderTabContent()}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="#"
            className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FileText className="text-teal-500 mr-3" size={24} />
            <span>Download Patient Guide</span>
            <ExternalLink size={16} className="ml-auto text-gray-400" />
          </a>
          <a
            href="#"
            className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Mail className="text-teal-500 mr-3" size={24} />
            <span>Subscribe to Newsletter</span>
            <ExternalLink size={16} className="ml-auto text-gray-400" />
          </a>
          <a
            href="#"
            className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Phone className="text-teal-500 mr-3" size={24} />
            <span>Contact Directory</span>
            <ExternalLink size={16} className="ml-auto text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
