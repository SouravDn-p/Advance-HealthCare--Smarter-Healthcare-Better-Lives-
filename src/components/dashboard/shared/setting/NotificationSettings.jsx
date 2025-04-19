"use client";

import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";


const NotificationSettings = ({ onSave }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    emailNotifications: {
      appointments: user?.notifications?.email?.appointments || true,
      reminders: user?.notifications?.email?.reminders || true,
      results: user?.notifications?.email?.results || true,
      billing: user?.notifications?.email?.billing || true,
      marketing: user?.notifications?.email?.marketing || false,
    },
    pushNotifications: {
      appointments: user?.notifications?.push?.appointments || true,
      reminders: user?.notifications?.push?.reminders || true,
      results: user?.notifications?.push?.results || true,
      billing: user?.notifications?.push?.billing || false,
      marketing: user?.notifications?.push?.marketing || false,
    },
    smsNotifications: {
      appointments: user?.notifications?.sms?.appointments || false,
      reminders: user?.notifications?.sms?.reminders || true,
      results: user?.notifications?.sms?.results || false,
      billing: user?.notifications?.sms?.billing || false,
      marketing: user?.notifications?.sms?.marketing || false,
    },
  });

  const handleCheckboxChange = (category, type, checked) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [type]: checked,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log("Notification settings to save:", formData);

    // Call the onSave callback to show success message
    onSave();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Notification Settings
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Choose how you want to be notified about important updates related
            to your healthcare.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Notification Type</th>
                  <th className="px-4 py-3 font-medium text-center">Email</th>
                  <th className="px-4 py-3 font-medium text-center">Push</th>
                  <th className="px-4 py-3 font-medium text-center">SMS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      Appointments
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      Notifications about upcoming and changed appointments
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.emailNotifications.appointments}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "emailNotifications",
                          "appointments",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.pushNotifications.appointments}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "pushNotifications",
                          "appointments",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.smsNotifications.appointments}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "smsNotifications",
                          "appointments",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                </tr>

                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      Medication Reminders
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      Reminders to take your medications
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.emailNotifications.reminders}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "emailNotifications",
                          "reminders",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.pushNotifications.reminders}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "pushNotifications",
                          "reminders",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.smsNotifications.reminders}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "smsNotifications",
                          "reminders",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                </tr>

                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      Test Results
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      Notifications when new test results are available
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.emailNotifications.results}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "emailNotifications",
                          "results",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.pushNotifications.results}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "pushNotifications",
                          "results",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.smsNotifications.results}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "smsNotifications",
                          "results",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                </tr>

                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      Billing & Payments
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      Notifications about bills, payments, and insurance claims
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.emailNotifications.billing}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "emailNotifications",
                          "billing",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.pushNotifications.billing}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "pushNotifications",
                          "billing",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.smsNotifications.billing}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "smsNotifications",
                          "billing",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                </tr>

                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      Marketing & Updates
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      Health tips, service updates, and promotional content
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.emailNotifications.marketing}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "emailNotifications",
                          "marketing",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.pushNotifications.marketing}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "pushNotifications",
                          "marketing",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={formData.smsNotifications.marketing}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "smsNotifications",
                          "marketing",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Quiet Hours
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Set a time period when you don't want to receive push or SMS
            notifications. Emergency notifications will still be delivered.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="quietHoursStart"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Start Time
              </label>
              <input
                type="time"
                id="quietHoursStart"
                name="quietHoursStart"
                defaultValue="22:00"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="quietHoursEnd"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                End Time
              </label>
              <input
                type="time"
                id="quietHoursEnd"
                name="quietHoursEnd"
                defaultValue="07:00"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
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
    </div>
  );
};

export default NotificationSettings;
