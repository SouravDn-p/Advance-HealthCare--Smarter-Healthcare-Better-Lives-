import {
  Video,
  Pill,
  TestTube,
  BriefcaseMedical,
  Clock,
  Users,
  CheckCircle,
  Star,
  Download,
  Headset,
  Hospital,
} from "lucide-react";
import { useContext } from "react";
import { AuthContexts } from "../../providers/AuthProvider";

const ServicesSection = () => {
  const { theme } = useContext(AuthContexts);

  const services = [
    {
      icon: <Video className="w-10 h-10" />,
      title: "Live Video Consultation",
      description:
        "Connect instantly with expert doctors through high-quality video calls or schedule an appointment at your convenience.",
      color: "blue",
    },
    {
      icon: <Pill className="w-10 h-10" />,
      title: "Order Medicine",
      description:
        "Easily browse and order prescribed medicines with doorstep delivery within 1 hour, ensuring hassle-free healthcare.",
      color: "green",
    },
    {
      icon: <TestTube className="w-10 h-10" />,
      title: "Diagnostic Tests",
      description:
        "Book diagnostic tests online and receive accurate reports from trusted laboratories within 24 hours.",
      color: "purple",
    },
    {
      icon: <BriefcaseMedical className="w-10 h-10" />,
      title: "Healthcare Packages",
      description:
        "Avail personalized healthcare packages including doctor consultations, hospital care, insurance, and wellness programs.",
      color: "indigo",
    },
  ];

  const stats = [
    {
      icon: <Clock className="w-12 h-12 text-blue-500" />,
      value: "10 Minutes",
      description: "Average consultation waiting time",
    },
    {
      icon: <Users className="w-12 h-12 text-pink-500" />,
      value: "4M+",
      description: "People under healthcare coverage",
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-green-500" />,
      value: "561K+",
      description: "Video consultation successfully completed",
    },
    {
      icon: <Star className="w-12 h-12 text-yellow-500" />,
      value: "95%",
      description: "Customers gave 5-star rating",
    },
    {
      icon: <Download className="w-12 h-12 text-blue-500" />,
      value: "1+ Million",
      description: "App downloads on Playstore",
    },
    {
      icon: <Headset className="w-12 h-12 text-purple-500" />,
      value: "24/7",
      description: "Doctors available round the clock",
    },
    {
      icon: <Hospital className="w-12 h-12 text-orange-500" />,
      value: "500+",
      description: "Partnered with reputed hospitals",
    },
  ];

  return (
    <section
      className={`py-16 px-6 md:px-12 transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className={`text-4xl md:text-5xl font-bold tracking-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Our Services
          </h2>
          <p
            className={`mt-4 text-lg md:text-xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Comprehensive healthcare solutions at your fingertips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border
                ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
            >
              <div
                className={`absolute inset-0 bg-${service.color}-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 
                  ${
                    theme === "dark"
                      ? `bg-${service.color}-400 bg-opacity-20`
                      : `bg-${service.color}-500 bg-opacity-10`
                  } group-hover:scale-110`}
              >
                <div
                  className={`${
                    theme === "dark"
                      ? `text-${service.color}-300`
                      : `text-${service.color}-500`
                  }`}
                >
                  {service.icon}
                </div>
              </div>
              <h3
                className={`text-2xl font-semibold mb-3 group-hover:text-${
                  service.color
                }-500 transition-colors duration-300
                  ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {service.title}
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } text-base leading-relaxed`}
              >
                {service.description}
              </p>
              <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-300">
                <svg
                  className={`${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  } w-6 h-6`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-16 bg-opacity-30 py-12 px-6 md:px-12 rounded-xl text-center ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <div className="text-center mb-14">
            <h2
              className={`text-4xl md:text-5xl font-bold tracking-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Our Impact in Numbers
            </h2>
            <p
              className={`mt-4 text-lg md:text-xl ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              We're proud of the difference we've made in healthcare delivery
              and patient outcomes
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                {stat.icon}
                <h3
                  className={`mt-4 text-2xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </h3>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  } text-sm`}
                >
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p
              className={` max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Our commitment to excellence has helped us achieve these
              milestones, and we continue to strive for better healthcare
              outcomes every day.
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300">
              Learn More About Our Impact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
