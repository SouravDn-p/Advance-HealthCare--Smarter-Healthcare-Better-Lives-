import {
  UserPlus,
  CalendarCheck,
  Stethoscope,
  FileText,
  ArrowRight,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const { theme, user } = useAuth();
  const steps = [
    {
      icon: <UserPlus className="w-12 h-12" />,
      title: "Sign Up",
      description: "Register and create your profile to get started.",
      color: "blue",
    },
    {
      icon: <CalendarCheck className="w-12 h-12" />,
      title: "Book a Consultation",
      description: "Schedule an appointment with a specialist.",
      color: "green",
    },
    {
      icon: <Stethoscope className="w-12 h-12" />,
      title: "Get Treatment Plans",
      description: "Receive AI-based health analysis and prescriptions.",
      color: "purple",
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Access Records",
      description: "Securely store and view your medical history.",
      color: "red",
    },
  ];

  return (
    <section
      className={`py-16
        ${
          theme === "dark"
            ? "bg-gray-900 text-gray-200"
            : "bg-gray-50 text-gray-900 "
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold  ${
              theme === "dark" ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            How It Works
          </h2>
          <p
            className={`max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Get started with our simple four-step process to access quality
            healthcare services
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2" />

          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`group rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative z-10 border ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  } h-full`}
                >
                  <div
                    className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400 `}
                  >
                    {index + 1}
                  </div>

                  <div
                    className={`mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300 text-${step.color}-500 dark:text-${step.color}-400 `}
                  >
                    {step.icon}
                  </div>

                  <h3
                    className={`text-xl font-semibold mb-2  transition-colors duration-300
                  ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`  ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {step.description}
                  </p>

                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-500 animate-pulse" />
                    </div>
                  )}
                </div>

                {index < steps.length - 1 && (
                  <div className="md:hidden absolute left-1/2 bottom-0 transform -translate-x-1/2 w-0.5 h-8 bg-gray-200 dark:bg-gray-700" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to={user ? "/doctors" : "/login"}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-300 transform hover:scale-105"
          >
            {user ? "Book a Consultation" : "Get Started Now With SignUp "}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
