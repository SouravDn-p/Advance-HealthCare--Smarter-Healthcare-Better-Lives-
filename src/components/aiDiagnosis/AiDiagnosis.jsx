"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  AlertCircle,
  Info,
  ChevronRight,
  X,
  Clock,
  Calendar,
  Download,
  Share2,
  User,
  Bot,
  Stethoscope,
  Brain,
  ArrowRight,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  FileText,
  Pill,
  Heart,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const AIDiagnosis = () => {
  const { user, theme } = useAuth();
  const [activeTab, setActiveTab] = useState("new-consultation");
  const [message, setMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [consultationHistory, setConsultationHistory] = useState([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [showHistoryDetails, setShowHistoryDetails] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample conversation for the demo
  const [conversation, setConversation] = useState([
    {
      sender: "ai",
      content:
        "Hello! I'm your AI health assistant. I can help analyze your symptoms and provide information about potential conditions. What symptoms are you experiencing today?",
      timestamp: new Date().toISOString(),
    },
  ]);

  // Sample diagnosis results
  const [diagnosisResults, setDiagnosisResults] = useState({
    symptoms: ["Headache", "Fever", "Fatigue", "Sore throat"],
    possibleConditions: [
      {
        name: "Common Cold",
        confidence: 85,
        description:
          "The common cold is a viral infection of your nose and throat (upper respiratory tract). It's usually harmless, although it might not feel that way. Many types of viruses can cause a common cold.",
        symptoms: [
          "Runny or stuffy nose",
          "Sore throat",
          "Cough",
          "Congestion",
          "Slight body aches",
          "Mild headache",
          "Sneezing",
          "Low-grade fever",
          "Generally feeling unwell",
        ],
        treatment:
          "Rest, staying hydrated, and over-the-counter cold medications can help alleviate symptoms. Antibiotics are not effective against the common cold.",
        urgency: "low",
        recommendations: [
          "Rest and drink plenty of fluids",
          "Use over-the-counter pain relievers like acetaminophen or ibuprofen for fever and aches",
          "Use a humidifier to add moisture to the air",
          "Try saline nasal drops or sprays",
          "Consult a doctor if symptoms persist beyond 10 days or worsen significantly",
        ],
      },
      {
        name: "Influenza (Flu)",
        confidence: 65,
        description:
          "Influenza is a viral infection that attacks your respiratory system — your nose, throat and lungs. Influenza is commonly called the flu, but it's not the same as stomach 'flu' viruses that cause diarrhea and vomiting.",
        symptoms: [
          "Fever over 100.4 F (38 C)",
          "Aching muscles",
          "Chills and sweats",
          "Headache",
          "Dry, persistent cough",
          "Shortness of breath",
          "Fatigue and weakness",
          "Nasal congestion",
          "Sore throat",
        ],
        treatment:
          "Antiviral medications can be prescribed to reduce the severity and duration of flu symptoms. Rest and hydration are also important.",
        urgency: "medium",
        recommendations: [
          "Rest and stay home to avoid spreading the infection",
          "Drink plenty of liquids to prevent dehydration",
          "Consider antiviral medications (consult a doctor within 48 hours of symptoms)",
          "Take over-the-counter pain relievers for fever and aches",
          "Seek medical attention if you have difficulty breathing, persistent chest pain, or other severe symptoms",
        ],
      },
      {
        name: "Strep Throat",
        confidence: 40,
        description:
          "Strep throat is a bacterial infection that can make your throat feel sore and scratchy. Strep throat accounts for only a small portion of sore throats.",
        symptoms: [
          "Throat pain that usually comes on quickly",
          "Painful swallowing",
          "Red and swollen tonsils",
          "White patches or streaks of pus on the tonsils",
          "Tiny red spots on the roof of the mouth",
          "Swollen, tender lymph nodes in your neck",
          "Fever",
          "Headache",
          "Rash",
          "Nausea or vomiting, especially in younger children",
        ],
        treatment:
          "Antibiotics are necessary to treat strep throat. Without treatment, complications can occur.",
        urgency: "medium",
        recommendations: [
          "See a doctor for proper diagnosis and antibiotic prescription if needed",
          "Take all prescribed antibiotics exactly as directed",
          "Rest and drink plenty of fluids",
          "Use over-the-counter pain relievers for throat pain and fever",
          "Gargle with salt water to relieve throat pain",
        ],
      },
    ],
    generalAdvice:
      "Remember that this is not a definitive diagnosis. If your symptoms are severe or persistent, please consult with a healthcare professional.",
  });

  // Sample consultation history
  const [pastConsultations, setPastConsultations] = useState([
    {
      id: 1,
      date: "2023-10-15T14:30:00",
      symptoms: ["Chest pain", "Shortness of breath", "Dizziness"],
      topCondition: "Possible Angina",
      urgency: "high",
      recommendation: "Seek immediate medical attention",
    },
    {
      id: 2,
      date: "2023-09-22T10:15:00",
      symptoms: ["Rash", "Itching", "Redness"],
      topCondition: "Contact Dermatitis",
      urgency: "low",
      recommendation: "Apply hydrocortisone cream, avoid irritants",
    },
    {
      id: 3,
      date: "2023-08-05T16:45:00",
      symptoms: ["Runny nose", "Sneezing", "Watery eyes"],
      topCondition: "Seasonal Allergies",
      urgency: "low",
      recommendation: "Take over-the-counter antihistamines",
    },
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message to conversation
    const userMessage = {
      sender: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setConversation([...conversation, userMessage]);
    setMessage("");

    // Simulate AI thinking
    setTimeout(() => {
      // If this is the first user message, ask a follow-up question
      if (conversation.length === 1) {
        const aiResponse = {
          sender: "ai",
          content:
            "How long have you been experiencing these symptoms? Do you have any other symptoms like fever or body aches?",
          timestamp: new Date().toISOString(),
        };
        setConversation((prev) => [...prev, aiResponse]);
      }
      // If this is the second user message, ask another follow-up
      else if (conversation.length === 3) {
        const aiResponse = {
          sender: "ai",
          content:
            "Thank you for providing that information. Have you taken any medications to relieve your symptoms? If so, did they help?",
          timestamp: new Date().toISOString(),
        };
        setConversation((prev) => [...prev, aiResponse]);
      }
      // If this is the third user message, start analysis
      else if (conversation.length === 5) {
        const aiResponse = {
          sender: "ai",
          content:
            "I have enough information to analyze your symptoms now. Let me process this data and provide you with some insights.",
          timestamp: new Date().toISOString(),
        };
        setConversation((prev) => [...prev, aiResponse]);

        // Start analysis
        setIsAnalyzing(true);
        setTimeout(() => {
          setIsAnalyzing(false);
          setShowResults(true);
        }, 3000);
      }
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case "high":
        return "Seek immediate medical attention";
      case "medium":
        return "Consult a healthcare provider soon";
      case "low":
        return "Self-care may be appropriate";
      default:
        return "Consult a healthcare provider";
    }
  };

  const handleStartNewConsultation = () => {
    setConversation([
      {
        sender: "ai",
        content:
          "Hello! I'm your AI health assistant. I can help analyze your symptoms and provide information about potential conditions. What symptoms are you experiencing today?",
        timestamp: new Date().toISOString(),
      },
    ]);
    setShowResults(false);
    setSelectedCondition(null);
    setActiveTab("new-consultation");
  };

  const handleViewHistoryItem = (item) => {
    setSelectedHistoryItem(item);
    setShowHistoryDetails(true);
  };

  const handleCloseHistoryDetails = () => {
    setShowHistoryDetails(false);
    setSelectedHistoryItem(null);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Health Assistant</h1>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Describe your symptoms for an AI-powered preliminary analysis
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
              Important Health Disclaimer
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              This AI assistant provides preliminary information only and is not
              a substitute for professional medical advice, diagnosis, or
              treatment. Always seek the advice of your physician or other
              qualified health provider with any questions you may have
              regarding a medical condition.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 mb-6">
          <button
            onClick={() => setActiveTab("new-consultation")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "new-consultation"
                ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            } transition-colors duration-200`}
          >
            New Consultation
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "history"
                ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            } transition-colors duration-200`}
          >
            Consultation History
          </button>
        </div>

        {activeTab === "new-consultation" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Section */}
            <div
              className={`lg:col-span-${
                showResults ? "1" : "3"
              } bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              } overflow-hidden flex flex-col h-[600px]`}
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <h2 className="font-semibold text-gray-900 dark:text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
                  Symptom Assessment
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      <div className="flex items-start mb-1">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                            msg.sender === "user"
                              ? "bg-blue-600"
                              : "bg-gray-200 dark:bg-gray-600"
                          }`}
                        >
                          {msg.sender === "user" ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              msg.sender === "user"
                                ? "text-blue-100"
                                : "text-gray-600 dark:text-gray-300"
                            }`}
                          >
                            {msg.sender === "user" ? "You" : "AI Assistant"}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`text-sm ${
                          msg.sender === "user"
                            ? "text-white"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {msg.content}
                      </p>
                      <p
                        className={`text-xs mt-1 text-right ${
                          msg.sender === "user"
                            ? "text-blue-100"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isAnalyzing && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div
                            className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Analyzing symptoms...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your symptoms..."
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none"
                    rows={2}
                    disabled={isAnalyzing || showResults}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isAnalyzing || showResults}
                    className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            {showResults && (
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[600px]">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <h2 className="font-semibold text-gray-900 dark:text-white flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
                    Analysis Results
                  </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {/* Symptoms Summary */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Reported Symptoms
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {diagnosisResults.symptoms.map((symptom, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Possible Conditions */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Possible Conditions
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Based on your symptoms, these conditions might be
                      relevant. Select one to learn more.
                    </p>

                    <div className="space-y-3">
                      {diagnosisResults.possibleConditions.map(
                        (condition, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedCondition(condition)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                              selectedCondition?.name === condition.name
                                ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {condition.name}
                              </h4>
                              <div className="flex items-center">
                                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                                  <div
                                    className={`h-full rounded-full ${
                                      condition.confidence >= 70
                                        ? "bg-green-500"
                                        : condition.confidence >= 40
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                    }`}
                                    style={{
                                      width: `${condition.confidence}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {condition.confidence}%
                                </span>
                              </div>
                            </div>

                            <div
                              className={`mt-2 overflow-hidden transition-all duration-300 ${
                                selectedCondition?.name === condition.name
                                  ? "max-h-96"
                                  : "max-h-0"
                              }`}
                            >
                              <p className="text-gray-700 dark:text-gray-300 mb-3">
                                {condition.description}
                              </p>

                              <div className="mb-3">
                                <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                                  Common Symptoms
                                </h5>
                                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                                  {condition.symptoms.map((symptom, i) => (
                                    <li key={i}>{symptom}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="mb-3">
                                <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                                  Treatment
                                </h5>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {condition.treatment}
                                </p>
                              </div>

                              <div className="mb-3">
                                <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                                  Recommendations
                                </h5>
                                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                                  {condition.recommendations.map((rec, i) => (
                                    <li key={i}>{rec}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="mt-4">
                                <div
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(
                                    condition.urgency
                                  )}`}
                                >
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {getUrgencyText(condition.urgency)}
                                </div>
                              </div>
                            </div>

                            {selectedCondition?.name !== condition.name && (
                              <div className="mt-2 text-blue-600 dark:text-blue-400 text-sm flex items-center">
                                <span>View details</span>
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* General Advice */}
                  <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-500 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">
                          Important Note
                        </h3>
                        <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                          {diagnosisResults.generalAdvice}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Was this helpful?
                    </h3>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200 flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4" />
                        Yes, it was helpful
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200 flex items-center gap-2">
                        <ThumbsDown className="w-4 h-4" />
                        No, not helpful
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleStartNewConsultation}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Start New Consultation
                    </button>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Results
                    </button>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share with Doctor
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {showHistoryDetails ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Consultation Details
                  </h2>
                  <button
                    onClick={handleCloseHistoryDetails}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {selectedHistoryItem && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Date & Time
                        </h3>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <span className="text-gray-900 dark:text-white font-medium">
                            {formatDate(selectedHistoryItem.date)}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Urgency Level
                        </h3>
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(
                            selectedHistoryItem.urgency
                          )}`}
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {getUrgencyText(selectedHistoryItem.urgency)}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Reported Symptoms
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedHistoryItem.symptoms.map((symptom, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Top Condition
                      </h3>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {selectedHistoryItem.topCondition}
                        </h4>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Recommendation
                      </h3>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300">
                          {selectedHistoryItem.recommendation}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        View Full Report
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200 flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Share with Doctor
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Consultation History
                </h2>

                {pastConsultations.length > 0 ? (
                  <div className="space-y-4">
                    {pastConsultations.map((consultation) => (
                      <div
                        key={consultation.id}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 cursor-pointer"
                        onClick={() => handleViewHistoryItem(consultation)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {formatDate(consultation.date)}
                              </span>
                            </div>
                            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                              {consultation.topCondition}
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {consultation.symptoms.map((symptom, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs"
                                >
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(
                              consultation.urgency
                            )}`}
                          >
                            {getUrgencyText(consultation.urgency)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {consultation.recommendation}
                          </p>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <FileText className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No consultation history
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                      You haven't had any AI consultations yet. Start a new
                      consultation to get personalized health insights.
                    </p>
                    <button
                      onClick={handleStartNewConsultation}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Start New Consultation
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Educational Resources */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Health Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Understanding Symptoms
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Learn how to accurately describe your symptoms to healthcare
                providers for better diagnosis.
              </p>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline"
              >
                Read more <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Pill className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Medication Safety
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Important information about medication interactions, side
                effects, and proper usage.
              </p>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline"
              >
                Read more <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Preventive Health
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Tips and guidelines for maintaining good health and preventing
                common illnesses.
              </p>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline"
              >
                Read more <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                Need help?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                If you're experiencing a medical emergency, please call
                emergency services immediately. For questions about the AI
                Health Assistant, contact our support team.
              </p>
              <div className="mt-3">
                <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDiagnosis;
