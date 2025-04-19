"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  Key,
  Smartphone,
  FileText,
  ChevronRight,
  Check,
} from "lucide-react";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import PrivacySettings from "./PrivacySettings";
import AppearanceSettings from "./AppearanceSettings";
import LanguageSettings from "./LanguageSettings";
import SecuritySettings from "./SecuritySettings";
import DevicesSettings from "./DevicesSettings";
import DocumentsSettings from "./DocumentsSettings";
import useAuth from "../../../../hooks/useAuth";

const Settings = () => {
  const { user, theme, dbUser } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings navigation items
  const settingsNavigation = [
    {
      id: "profile",
      name: "Profile Information",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "account",
      name: "Account Settings",
      icon: <Key className="w-5 h-5" />,
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: <Bell className="w-5 h-5" />,
    },
    {
      id: "privacy",
      name: "Privacy & Data",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: "appearance",
      name: "Appearance",
      icon: <Palette className="w-5 h-5" />,
    },
    {
      id: "language",
      name: "Language & Region",
      icon: <Globe className="w-5 h-5" />,
    },
    { id: "security", name: "Security", icon: <Key className="w-5 h-5" /> },
    {
      id: "devices",
      name: "Connected Devices",
      icon: <Smartphone className="w-5 h-5" />,
    },
    {
      id: "documents",
      name: "Documents & Files",
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  // Show success message for 3 seconds when settings are saved
  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // Render the active settings section
  const renderSettingsSection = () => {
    switch (activeSection) {    
      case "profile":
        return <ProfileSettings onSave={handleSaveSettings} />;
      case "account":
        return <AccountSettings onSave={handleSaveSettings} />;
      case "notifications":
        return <NotificationSettings onSave={handleSaveSettings} />;
      case "privacy":
        return <PrivacySettings onSave={handleSaveSettings} />;
      case "appearance":
        return <AppearanceSettings onSave={handleSaveSettings} />;
      case "language":
        return <LanguageSettings onSave={handleSaveSettings} />;
      case "security":
        return <SecuritySettings onSave={handleSaveSettings} />;
      case "devices":
        return <DevicesSettings onSave={handleSaveSettings} />;
      case "documents":
        return <DocumentsSettings onSave={handleSaveSettings} />;
      default:
        return <ProfileSettings onSave={handleSaveSettings} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Settings
      </h1>

      {/* Success notification */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg shadow-md flex items-center z-50">
          <Check className="w-5 h-5 mr-2" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Mobile settings navigation dropdown */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            {settingsNavigation.find((item) => item.id === activeSection)?.icon}
            <span className="ml-3 font-medium text-gray-900 dark:text-white">
              {
                settingsNavigation.find((item) => item.id === activeSection)
                  ?.name
              }
            </span>
          </div>
          <ChevronRight
            className={`w-5 h-5 transition-transform ${
              isMobileMenuOpen ? "rotate-90" : ""
            }`}
          />
        </button>

        {isMobileMenuOpen && (
          <div className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
            {settingsNavigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center p-3 text-left ${
                  activeSection === item.id
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop settings navigation sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
            <nav className="flex flex-col">
              {settingsNavigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center p-3 text-left ${
                    activeSection === item.id
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Help section */}
          <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4">
            <div className="flex items-center mb-3">
              <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="ml-2 font-medium text-gray-900 dark:text-white">
                Need Help?
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              If you're having trouble with your settings, our support team is
              here to help.
            </p>
            <a
              href="#"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Settings content area */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
            {renderSettingsSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
