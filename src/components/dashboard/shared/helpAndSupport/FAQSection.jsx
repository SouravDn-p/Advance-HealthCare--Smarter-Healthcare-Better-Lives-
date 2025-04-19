import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I schedule an appointment?",
      answer:
        'You can schedule an appointment through your patient dashboard. Simply log in, click on "Appointments" in the navigation menu, and then click "Schedule New Appointment." Follow the prompts to select a doctor, date, time, and reason for your visit.',
    },
    {
      question: "How can I view my medical records?",
      answer:
        'Your medical records are available in the "Medical Records" section of your patient dashboard. You can view past appointments, test results, prescriptions, and doctor notes. If you need to download or share your records, use the export options available on each record.',
    },
    {
      question: "What insurance plans do you accept?",
      answer:
        'We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Medicare, and Medicaid. For specific questions about your coverage, please contact our billing department or check the "Insurance" section in your account settings.',
    },
    {
      question: "How do I update my personal information?",
      answer:
        'You can update your personal information in the "Settings" section of your account. Click on "Profile Settings" to update your contact information, address, emergency contacts, and other personal details. Make sure to save your changes before exiting.',
    },
    {
      question: "What should I do if I need to cancel my appointment?",
      answer:
        'If you need to cancel an appointment, please do so at least 24 hours in advance. Go to the "Appointments" section, find the appointment you wish to cancel, and click the "Cancel" button. You\'ll have the option to reschedule at that time or do so later.',
    },
    {
      question: "How do I request a prescription refill?",
      answer:
        'To request a prescription refill, navigate to the "Prescriptions" section of your dashboard. Find the medication you need refilled, click "Request Refill," and follow the prompts. Your doctor will be notified and will approve or deny the request, typically within 24-48 hours.',
    },
    {
      question: "Is telemedicine available for consultations?",
      answer:
        'Yes, we offer telemedicine consultations for many types of appointments. When scheduling, look for the "Virtual Visit" option. You\'ll need a device with a camera and microphone, and a stable internet connection. Instructions for joining the virtual waiting room will be sent before your appointment.',
    },
    {
      question: "How do I pay my medical bills online?",
      answer:
        'You can pay your medical bills through the "Billing" section of your account. We accept major credit cards, HSA/FSA cards, and electronic bank transfers. You can also set up payment plans or automatic payments for recurring bills.',
    },
    {
      question: "What should I do in case of a medical emergency?",
      answer:
        'In case of a medical emergency, please call 911 or go to your nearest emergency room immediately. Our platform is not designed to handle emergency situations. For urgent but non-emergency issues, you can use the "Urgent Care" option to find the nearest facility.',
    },
    {
      question: "How can I communicate with my doctor between appointments?",
      answer:
        'You can send secure messages to your healthcare provider through the "Messages" section of your dashboard. This should be used for non-urgent questions or concerns. For urgent matters, please call our office directly or use the emergency services if necessary.',
    },
  ];

  const categories = [
    "All FAQs",
    "Appointments",
    "Medical Records",
    "Billing & Insurance",
    "Medications",
    "Technical Support",
    "Account Management",
  ];

  const [activeCategory, setActiveCategory] = useState("All FAQs");

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>

        <div className="flex overflow-x-auto mb-6 pb-2 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 mr-2 whitespace-nowrap rounded-md ${
                activeCategory === category
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-800 dark:text-white">
                  {faq.question}
                </span>
                {openFAQ === index ? (
                  <ChevronUp className="text-gray-500" size={20} />
                ) : (
                  <ChevronDown className="text-gray-500" size={20} />
                )}
              </button>

              {openFAQ === index && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">
          Didn't find what you're looking for?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Our support team is here to help with any questions you may have.
        </p>
        <button
          onClick={() => setActiveCategory("Contact Support")}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md transition-colors"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQSection;
