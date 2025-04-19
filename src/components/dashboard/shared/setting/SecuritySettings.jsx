"use client";

import { useState } from "react";
import {
  Key,
  Shield,
  Smartphone,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

const SecuritySettings = ({ onSave }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState("");

  // Mock login history data
  const loginHistory = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "New York, USA",
      time: "Today, 10:30 AM",
      current: true,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "New York, USA",
      time: "Yesterday, 8:15 PM",
      current: false,
    },
    {
      id: 3,
      device: "Firefox on MacOS",
      location: "Boston, USA",
      time: "Apr 18, 2025, 3:45 PM",
      current: false,
    },
    {
      id: 4,
      device: "Chrome on Android",
      location: "Chicago, USA",
      time: "Apr 15, 2025, 11:20 AM",
      current: false,
    },
  ];

  // Check password strength
  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength(0);
      setPasswordFeedback("");
      return;
    }

    // Simple password strength checker
    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;

    // Contains numbers
    if (/[0-9]/.test(password)) strength += 1;

    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);

    // Set feedback based on strength
    if (strength <= 1) {
      setPasswordFeedback(
        "Very weak - Use a longer password with mixed characters"
      );
    } else if (strength <= 2) {
      setPasswordFeedback("Weak - Add numbers and special characters");
    } else if (strength <= 3) {
      setPasswordFeedback("Medium - Add more variety of characters");
    } else if (strength <= 4) {
      setPasswordFeedback("Strong - Good password");
    } else {
      setPasswordFeedback("Very strong - Excellent password");
    }
  };

  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setNewPassword(newPass);
    checkPasswordStrength(newPass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match");
      return;
    }

    // Validate password strength
    if (passwordStrength < 3 && newPassword) {
      alert("Please use a stronger password");
      return;
    }

    // Call the onSave function passed from parent
    onSave();

    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordStrength(0);
    setPasswordFeedback("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Security Settings
      </h2>

      {/* Password Change Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200 flex items-center">
          <Key className="w-5 h-5 mr-2" />
          Change Password
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required={!!newPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password strength indicator */}
              {newPassword && (
                <div className="mt-2">
                  <div className="flex items-center mb-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          passwordStrength <= 1
                            ? "bg-red-500"
                            : passwordStrength <= 2
                            ? "bg-orange-500"
                            : passwordStrength <= 3
                            ? "bg-yellow-500"
                            : passwordStrength <= 4
                            ? "bg-green-500"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <p
                    className={`text-xs ${
                      passwordStrength <= 1
                        ? "text-red-500"
                        : passwordStrength <= 2
                        ? "text-orange-500"
                        : passwordStrength <= 3
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {passwordFeedback}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    confirmPassword && newPassword !== confirmPassword
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  Passwords don't match
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="py-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Two-Factor Authentication
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              Add an extra layer of security to your account by requiring a
              verification code in addition to your password.
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              We'll send a code to your phone or email when you sign in on a new
              device.
            </p>
          </div>
          <div className="ml-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={twoFactorEnabled}
                onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {twoFactorEnabled && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Two-factor authentication is enabled. You'll be asked for a
              verification code when signing in from a new device or browser.
            </p>
          </div>
        )}
      </div>

      {/* Login Alerts */}
      <div className="py-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Login Alerts
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              Get notified when someone logs into your account from a new device
              or location.
            </p>
          </div>
          <div className="ml-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={loginAlerts}
                onChange={() => setLoginAlerts(!loginAlerts)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Recent Login Activity */}
      <div className="py-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Recent Login Activity
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Device
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loginHistory.map((login) => (
                <tr key={login.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {login.device}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {login.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {login.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {login.current ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        Current Session
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        Previous
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Security Settings
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;
