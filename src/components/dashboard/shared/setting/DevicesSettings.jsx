"use client";

import { useState } from "react";
import {
  Smartphone,
  Laptop,
  Tablet,
  Monitor,
  Clock,
  MapPin,
  AlertCircle,
  X,
  Check,
  Info,
} from "lucide-react";

const DevicesSettings = ({ onSave }) => {
  // Mock connected devices data
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "iPhone 13 Pro",
      type: "mobile",
      lastActive: "Active now",
      location: "New York, USA",
      browser: "Safari",
      os: "iOS 16.5",
      trusted: true,
      current: true,
    },
    {
      id: 2,
      name: "MacBook Pro",
      type: "laptop",
      lastActive: "2 hours ago",
      location: "New York, USA",
      browser: "Chrome",
      os: "macOS 13.4",
      trusted: true,
      current: false,
    },
    {
      id: 3,
      name: "iPad Air",
      type: "tablet",
      lastActive: "Yesterday",
      location: "Boston, USA",
      browser: "Safari",
      os: "iPadOS 16.5",
      trusted: true,
      current: false,
    },
    {
      id: 4,
      name: "Windows PC",
      type: "desktop",
      lastActive: "3 days ago",
      location: "Chicago, USA",
      browser: "Firefox",
      os: "Windows 11",
      trusted: false,
      current: false,
    },
    {
      id: 5,
      name: "Android Phone",
      type: "mobile",
      lastActive: "1 week ago",
      location: "Miami, USA",
      browser: "Chrome",
      os: "Android 13",
      trusted: false,
      current: false,
    },
  ]);

  const [confirmLogout, setConfirmLogout] = useState(null);
  const [notificationSettings, setNotificationSettings] = useState({
    newDeviceLogin: true,
    unusualActivity: true,
    deviceUpdates: false,
  });

  // Get device icon based on type
  const getDeviceIcon = (type) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="w-6 h-6" />;
      case "tablet":
        return <Tablet className="w-6 h-6" />;
      case "laptop":
        return <Laptop className="w-6 h-6" />;
      case "desktop":
        return <Monitor className="w-6 h-6" />;
      default:
        return <Smartphone className="w-6 h-6" />;
    }
  };

  // Handle device removal/logout
  const handleLogoutDevice = (deviceId) => {
    setDevices(devices.filter((device) => device.id !== deviceId));
    setConfirmLogout(null);
  };

  // Toggle trusted status
  const toggleTrustedDevice = (deviceId) => {
    setDevices(
      devices.map((device) =>
        device.id === deviceId
          ? { ...device, trusted: !device.trusted }
          : device
      )
    );
  };

  // Handle notification settings change
  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Connected Devices
      </h2>

      {/* Current device info */}
      {devices.find((device) => device.current) && (
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
              {getDeviceIcon(devices.find((device) => device.current).type)}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200">
                Current Device
              </h3>
              <p className="text-blue-700 dark:text-blue-300">
                {devices.find((device) => device.current).name} •{" "}
                {devices.find((device) => device.current).browser} on{" "}
                {devices.find((device) => device.current).os}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                <MapPin className="w-4 h-4 inline mr-1" />
                {devices.find((device) => device.current).location}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* All devices list */}
      <div className="space-y-6">
        {devices.map((device) => (
          <div
            key={device.id}
            className={`p-4 rounded-lg border ${
              device.current
                ? "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 p-2 rounded-full ${
                    device.current
                      ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {getDeviceIcon(device.type)}
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    {device.name}
                    {device.current && (
                      <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 py-0.5 px-2 rounded-full">
                        Current
                      </span>
                    )}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {device.browser} on {device.os}
                  </p>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{device.lastActive}</span>
                    <span className="mx-2">•</span>
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{device.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {!device.current && (
                  <>
                    <button
                      onClick={() => toggleTrustedDevice(device.id)}
                      className={`p-2 rounded-full ${
                        device.trusted
                          ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                      title={
                        device.trusted ? "Trusted Device" : "Mark as Trusted"
                      }
                    >
                      {device.trusted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Info className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      onClick={() => setConfirmLogout(device.id)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-red-900/20 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                      title="Log out from this device"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Logout confirmation */}
            {confirmLogout === device.id && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200">
                  Are you sure you want to log out from this device?
                </p>
                <div className="mt-2 flex space-x-3">
                  <button
                    onClick={() => handleLogoutDevice(device.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                  >
                    Log Out
                  </button>
                  <button
                    onClick={() => setConfirmLogout(null)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Device status */}
            <div className="mt-3 flex items-center">
              <div
                className={`w-2 h-2 rounded-full ${
                  device.lastActive === "Active now"
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              ></div>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                {device.lastActive === "Active now"
                  ? "Online"
                  : "Last active: " + device.lastActive}
              </span>

              {device.trusted && (
                <span className="ml-3 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 py-0.5 px-2 rounded-full">
                  Trusted Device
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Device Notifications */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
          Device Notifications
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                New device login alerts
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get notified when someone logs in from a new device
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationSettings.newDeviceLogin}
                onChange={() => handleNotificationChange("newDeviceLogin")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                Unusual activity alerts
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get notified about suspicious login attempts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationSettings.unusualActivity}
                onChange={() => handleNotificationChange("unusualActivity")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 dark:text-gray-300">Device updates</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get notified about security updates for your devices
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationSettings.deviceUpdates}
                onChange={() => handleNotificationChange("deviceUpdates")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-800 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div className="ml-3">
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Device Security Tips
            </h4>
            <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside space-y-1">
              <li>Log out from devices you no longer use</li>
              <li>Only mark devices as trusted if you use them regularly</li>
              <li>Review your connected devices regularly</li>
              <li>Enable two-factor authentication for additional security</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Device Settings
        </button>
      </div>
    </div>
  );
};

export default DevicesSettings;
