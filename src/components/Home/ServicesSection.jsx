import {
  Video,
  Pill,
  TestTube,
  Umbrella,
  Settings,
  Clock,
  Users,
  CheckCircle,
  Star,
  Download,
  Headset,
  Hospital,
} from "lucide-react";
import { useContext } from "react";
import Lottie from "lottie-react";
import { AuthContexts } from "../../providers/AuthProvider";
import service from "../../../public/service.json";
const ServicesSection = () => {
  const { theme, user } = useContext(AuthContexts);

  const services = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "Live Video Consultation",
      description:
        "Get instant video consultation or schedule your appointment",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HNLcvEdVcZjnTQ8DxJgYEpaPZypzGQ.png",
      color: "blue",
    },
    {
      icon: <Pill className="w-8 h-8" />,
      title: "Order Medicine",
      description: "Order easily and get the medicine in 1 hour",
      color: "green",
    },
    {
      icon: <TestTube className="w-8 h-8" />,
      title: "Diagnostic Tests",
      description:
        "Get instant video consultation or schedule your appointment",
      color: "purple",
    },
    {
      icon: <Umbrella className="w-8 h-8" />,
      title: "Healthcare Packages",
      description: "Consultations, hospital care, insurance & more",
      color: "indigo",
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Healthcare IT Services",
      description:
        "Our expert engineers can help build your health-tech solutions",
      color: "orange",
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
      className={`py-12 px-4 md:px-8 transition-all duration-300 
        ${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-gradient-to-r from-[#D3E2CD] to-[#e8f0e5] text-gray-900 "
        }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center ">
          <h2
            className={`text-3xl md:text-4xl font-bold transition-colors 
              ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Our Services
          </h2>
          <p
            className={`max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Comprehensive healthcare solutions at your fingertips
          </p>
        </div>
        <Lottie
          className="h-40 pr-12 my-12"
          animationData={service}
          loop={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border
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
                className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 
                  ${
                    theme === "dark"
                      ? `bg-${service.color}-400 bg-opacity-20`
                      : `bg-${service.color}-500 bg-opacity-10`
                  }`}
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
                className={`text-xl font-semibold mb-2 group-hover:text-${
                  service.color
                }-500 transition-colors duration-300
                  ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {service.title}
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } text-sm`}
              >
                {service.description}
              </p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-300">
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
            We're proud of the difference we've made in healthcare delivery and
            patient outcomes
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
            Our commitment to excellence has helped us achieve these milestones,
            and we continue to strive for better healthcare outcomes every day.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300">
            Learn More About Our Impact
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
