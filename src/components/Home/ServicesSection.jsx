import { Video, Pill, TestTube, Umbrella, Settings } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "Live Video Consultation",
      description:
        "Get instant video consultation or schedule your appointment",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HNLcvEdVcZjnTQ8DxJgYEpaPZypzGQ.png",
      color: "bg-blue-500",
    },
    {
      icon: <Pill className="w-8 h-8" />,
      title: "Order Medicine",
      description: "Order easily and get the medicine in 1 hour",
      color: "bg-green-500",
    },
    {
      icon: <TestTube className="w-8 h-8" />,
      title: "Diagnostic Tests",
      description:
        "Get instant video consultation or schedule your appointment",
      color: "bg-purple-500",
    },
    {
      icon: <Umbrella className="w-8 h-8" />,
      title: "Healthcare Packages",
      description: "Consultations, hospital care, insurance & more",
      color: "bg-indigo-500",
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Healthcare IT Services",
      description:
        "Our expert engineer can help build your health-tech solutions",
      color: "bg-orange-500",
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive healthcare solutions at your fingertips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Hover Effect Background */}
              <div
                className={`absolute inset-0 ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className={`${service.color} bg-opacity-10 dark:bg-opacity-20 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <div
                  className={`text-${
                    service.color.split("-")[1]
                  }-500 dark:text-${service.color.split("-")[1]}-400`}
                >
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {service.description}
              </p>

              {/* Hover Effect Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-gray-400 dark:text-gray-500"
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
    </section>
  );
};

export default ServicesSection;
