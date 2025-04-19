import React, { useState } from "react";
import { Send, Phone, Mail, MessageCircle } from "react-feather";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    contactPreference: "email",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (formData.contactPreference === "phone" && !formData.phone.trim()) {
      errors.phone = "Phone number is required for phone contact preference";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          contactPreference: "email",
        });
      }, 3000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <Phone size={20} />,
      title: "Call Us",
      description: "For immediate assistance",
      contact: "1-800-HEALTH-HELP",
      hours: "Mon-Fri: 8am-8pm, Sat: 9am-5pm",
    },
    {
      icon: <Mail size={20} />,
      title: "Email Us",
      description: "For general inquiries",
      contact: "support@healthcareapp.com",
      hours: "Response within 24 hours",
    },
    {
      icon: <MessageCircle size={20} />,
      title: "Live Chat",
      description: "For quick questions",
      contact: "Available on bottom right",
      hours: "Mon-Fri: 9am-6pm",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Contact Support</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {contactMethods.map((method, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 mr-4">
                {method.icon}
              </div>
              <h3 className="font-medium">{method.title}</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              {method.description}
            </p>
            <p className="font-medium text-gray-800 dark:text-white mb-1">
              {method.contact}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {method.hours}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Send us a message</h3>

        {submitSuccess ? (
          <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-4 rounded-lg mb-6">
            <p className="font-medium">Thank you for contacting us!</p>
            <p>We've received your message and will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md border ${
                    formErrors.name
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="John Doe"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md border ${
                    formErrors.email
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="john.doe@example.com"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md border ${
                    formErrors.phone
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="(123) 456-7890"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>

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
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md border ${
                    formErrors.subject
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="Appointment Issue"
                />
                {formErrors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.subject}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={`w-full px-4 py-2 rounded-md border ${
                  formErrors.message
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="Please describe your issue or question in detail..."
              ></textarea>
              {formErrors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Contact Method
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contactPreference"
                    value="email"
                    checked={formData.contactPreference === "email"}
                    onChange={handleChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    Email
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contactPreference"
                    value="phone"
                    checked={formData.contactPreference === "phone"}
                    onChange={handleChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    Phone
                  </span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                * Required fields
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center px-6 py-2 rounded-md ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-500 hover:bg-teal-600"
                } text-white transition-colors`}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
