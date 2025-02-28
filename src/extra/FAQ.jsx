"use client";

import { useContext, useState } from "react";
import { Search, HelpCircle, Plus, Minus } from "lucide-react";
import { AuthContexts } from "../providers/AuthProvider";

const FAQ = () => {
  const { theme } = useContext(AuthContexts);
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Advance Healthcare?",
      answer:
        "Advance Healthcare is a web-based platform that offers AI-powered medical consultations, doctor appointment booking, emergency ambulance services, and blockchain-based medical records management.",
    },
    {
      question: "How can I book a doctor's appointment?",
      answer:
        "You can book an appointment by navigating to the 'Appointments' page, selecting a doctor, choosing a date and time, and confirming your booking.",
    },
    {
      question: "Is the AI-powered diagnosis reliable?",
      answer:
        "Our AI diagnosis system is trained on vast medical datasets and provides preliminary guidance. However, it is not a replacement for professional medical advice.",
    },
    {
      question: "How do I access my medical records?",
      answer:
        "You can view and manage your medical records securely through the 'Medical Records' section in your dashboard, powered by blockchain for enhanced security.",
    },
    {
      question: "Does Advance Healthcare support telemedicine?",
      answer:
        "Yes, we provide telemedicine services where you can consult with a doctor via video or audio calls from the comfort of your home.",
    },
    {
      question: "Can I order medicines online?",
      answer:
        "Yes, you can order prescribed medicines online through our integrated e-pharmacy and get them delivered to your doorstep.",
    },
    {
      question: "What should I do in case of an emergency?",
      answer:
        "In emergencies, you can use the 'SOS' button on our platform to request immediate medical help, including ambulance booking and emergency contacts.",
    },
    {
      question: "How does the health insurance feature work?",
      answer:
        "We provide integrated health insurance solutions where users can browse and apply for insurance plans tailored to their medical needs.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      {theme === "dark" ? (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 md:p-12 transition-colors duration-300">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <HelpCircle className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Find answers to the most common questions about Advance
                Healthcare. Can't find what you're looking for? Feel free to
                contact our support team.
              </p>
            </div>

            <div className="relative max-w-2xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 
              dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100
              focus:border-blue-500 dark:focus:border-blue-400 
              focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 
              transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl 
                overflow-hidden bg-white dark:bg-gray-800 
                shadow-sm hover:shadow-md dark:shadow-gray-900/50 
                transition-all duration-300"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                  >
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <Minus className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    ) : (
                      <Plus className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className={`px-6 transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "max-h-96 py-4 opacity-100"
                        : "max-h-0 py-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No FAQs found matching your search. Please try different
                  keywords.
                </p>
              </div>
            )}

            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Still have questions?{" "}
                <a
                  href="#contact"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 
                dark:hover:text-blue-300 font-medium underline-offset-2 hover:underline"
                >
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-r from-[#D3E2CD] to-[#e8f0e5] shadow-md p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 ">
              <div className="flex justify-center mb-4">
                <HelpCircle className="h-12 w-12 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find answers to the most common questions about Advance
                Healthcare. Can't find what you're looking for? Feel free to
                contact our support team.
              </p>
            </div>

            <div className="relative max-w-2xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 "
                  >
                    <span className="text-lg font-semibold text-gray-800 ">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <Minus className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <Plus className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className={`px-6 transition-all duration-300 ease-in-out  ${
                      openIndex === index
                        ? "max-h-96 py-4 opacity-100"
                        : "max-h-0 py-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-600 leading-relaxed ">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No FAQs found matching your search. Please try different
                  keywords.
                </p>
              </div>
            )}

            <div className="mt-12 text-center">
              <p className="text-gray-600">
                Still have questions?{" "}
                <a
                  href="#contact"
                  className="text-blue-600 hover:text-blue-700 font-medium underline-offset-2 hover:underline"
                >
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FAQ;
