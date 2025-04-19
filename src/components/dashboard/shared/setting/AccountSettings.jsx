"use client";

import { useState } from "react";
import { AlertCircle, Check, X } from "lucide-react";
import useAuth from "../../../../hooks/useAuth";

const AccountSettings = ({ onSave }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    email: user?.email || "john.doe@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: user?.twoFactorEnabled || false,
    receiveEmails: user?.receiveEmails || true,
    accountType: user?.accountType || "patient",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Check password strength when new password changes
    if (name === "newPassword") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    // Simple password strength checker
    let score = 0;
    let feedback = "";

    if (password.length === 0) {
      setPasswordStrength({ score: 0, feedback: "" });
      return;
    }

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Provide feedback based on score
    if (score <= 2) {
      feedback =
        "Weak password. Try adding numbers, symbols, and varying case.";
    } else if (score <= 4) {
      feedback = "Moderate password. Consider making it longer.";
    } else {
      feedback = "Strong password!";
    }

    setPasswordStrength({ score, feedback });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate passwords match if changing password
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      alert("New passwords don't match");
      return;
    }

    // Here you would typically send the data to your API
    console.log("Account settings to save:", formData);

    // Call the onSave callback to show success message
    onSave();
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText !== "DELETE") {
      alert("Please type DELETE to confirm account deletion");
      return;
    }

    // Here you would typically send a request to delete the account
    console.log("Deleting account...");

    // Redirect to logout or home page after deletion
    // window.location.href = "/logout"
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Account Settings
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Email Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Email Address
          </h3>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Primary Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              This email is used for account login and notifications
            </p>
          </div>
        </div>

        {/* Password Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Change Password
          </h3>

          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />

            {formData.newPassword && (
              <div className="mt-2">
                <div className="flex items-center mb-1">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        passwordStrength.score <= 2
                          ? "bg-red-500"
                          : passwordStrength.score <= 4
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${(passwordStrength.score / 6) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <p
                  className={`text-xs ${
                    passwordStrength.score <= 2
                      ? "text-red-500"
                      : passwordStrength.score <= 4
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {passwordStrength.feedback}
                </p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {formData.newPassword &&
              formData.confirmPassword &&
              formData.newPassword !== formData.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  Passwords don't match
                </p>
              )}
          </div>
        </div>

        {/* Security Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Security Settings
          </h3>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="twoFactorEnabled"
              name="twoFactorEnabled"
              checked={formData.twoFactorEnabled}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="twoFactorEnabled"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Enable Two-Factor Authentication
            </label>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Two-factor authentication adds an extra layer of security to your
            account. When enabled, you'll need to provide a code from your phone
            in addition to your password when logging in.
          </p>

          {formData.twoFactorEnabled && (
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Set Up Two-Factor Authentication
            </button>
          )}
        </div>

        {/* Communication Preferences */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Communication Preferences
          </h3>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="receiveEmails"
              name="receiveEmails"
              checked={formData.receiveEmails}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="receiveEmails"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Receive email notifications about appointments, test results, and
              health updates
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Delete Account Section */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 text-red-600 dark:text-red-400">
          Delete Account
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>

        {!showDeleteConfirm ? (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete Account
          </button>
        ) : (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-red-800 dark:text-red-300">
                  Are you sure you want to delete your account?
                </h4>
                <p className="mt-2 text-sm text-red-700 dark:text-red-300">
                  This action cannot be undone. All of your data will be
                  permanently removed. Type "DELETE" to confirm.
                </p>
                <div className="mt-3">
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Type DELETE to confirm"
                  />
                </div>
                <div className="mt-3 flex space-x-3">
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    disabled={deleteConfirmText !== "DELETE"}
                  >
                    Permanently Delete Account
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmText("");
                    }}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
