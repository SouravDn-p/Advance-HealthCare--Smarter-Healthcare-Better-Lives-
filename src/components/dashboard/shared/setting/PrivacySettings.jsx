"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import useAuth from "../../../../hooks/useAuth";


const PrivacySettings = ({ onSave }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    dataSharing: {
      researchConsent: user?.privacy?.dataSharing?.researchConsent || false,
      anonymizedData: user?.privacy?.dataSharing?.anonymizedData || true,
      thirdPartySharing: user?.privacy?.dataSharing?.thirdPartySharing || false,
    },
    profileVisibility: {
      showProfileToOtherPatients:
        user?.privacy?.profileVisibility?.showProfileToOtherPatients || false,
      showAppointmentsToFamily:
        user?.privacy?.profileVisibility?.showAppointmentsToFamily || true,
      showMedicalRecordsToFamily:
        user?.privacy?.profileVisibility?.showMedicalRecordsToFamily || false,
    },
    cookiePreferences: {
      essential: true, // Essential cookies cannot be disabled
      functional: user?.privacy?.cookiePreferences?.functional || true,
      analytics: user?.privacy?.cookiePreferences?.analytics || true,
      advertising: user?.privacy?.cookiePreferences?.advertising || false,
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
    console.log("Privacy settings to save:", formData);

    // Call the onSave callback to show success message
    onSave();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Privacy & Data Settings
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Data Sharing */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Data Sharing
          </h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="researchConsent"
                  checked={formData.dataSharing.researchConsent}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "dataSharing",
                      "researchConsent",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="researchConsent"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Research Consent
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Allow your anonymized health data to be used for medical
                  research purposes
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="anonymizedData"
                  checked={formData.dataSharing.anonymizedData}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "dataSharing",
                      "anonymizedData",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="anonymizedData"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Anonymized Data Collection
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Allow collection of anonymized usage data to improve our
                  services
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="thirdPartySharing"
                  checked={formData.dataSharing.thirdPartySharing}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "dataSharing",
                      "thirdPartySharing",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="thirdPartySharing"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Third-Party Data Sharing
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Allow sharing of your data with trusted third-party healthcare
                  providers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Visibility */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Profile Visibility
          </h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="showProfileToOtherPatients"
                  checked={
                    formData.profileVisibility.showProfileToOtherPatients
                  }
                  onChange={(e) =>
                    handleCheckboxChange(
                      "profileVisibility",
                      "showProfileToOtherPatients",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="showProfileToOtherPatients"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Show Profile to Other Patients
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Allow other patients to see your basic profile information
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="showAppointmentsToFamily"
                  checked={formData.profileVisibility.showAppointmentsToFamily}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "profileVisibility",
                      "showAppointmentsToFamily",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="showAppointmentsToFamily"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Show Appointments to Family Members
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Allow authorized family members to see your appointment
                  schedule
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="showMedicalRecordsToFamily"
                  checked={
                    formData.profileVisibility.showMedicalRecordsToFamily
                  }
                  onChange={(e) =>
                    handleCheckboxChange(
                      "profileVisibility",
                      "showMedicalRecordsToFamily",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="showMedicalRecordsToFamily"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Share Medical Records with Family
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Allow authorized family members to access your medical records
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cookie Preferences */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Cookie Preferences
          </h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="essentialCookies"
                  checked={formData.cookiePreferences.essential}
                  disabled
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="essentialCookies"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Essential Cookies
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Required for the website to function properly (cannot be
                  disabled)
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="functionalCookies"
                  checked={formData.cookiePreferences.functional}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "cookiePreferences",
                      "functional",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="functionalCookies"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Functional Cookies
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Enable enhanced functionality and personalization
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="analyticsCookies"
                  checked={formData.cookiePreferences.analytics}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "cookiePreferences",
                      "analytics",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="analyticsCookies"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Analytics Cookies
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Help us understand how you use our website
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="advertisingCookies"
                  checked={formData.cookiePreferences.advertising}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "cookiePreferences",
                      "advertising",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="advertisingCookies"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Advertising Cookies
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Used to show you relevant advertisements on other websites
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Export */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
            Your Data
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            You can download a copy of all the personal data we have stored
            about you.
          </p>

          <button
            type="button"
            className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Your Data
          </button>
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

export default PrivacySettings;
