import {
  Stethoscope,
  Baby,
  Heart,
  Brain,
  Activity,
  Bone,
  TreesIcon as Lungs,
  Dna,
  Apple,
  SmileIcon as Tooth,
  HeartPulse,
  UserCircle2,
  Microscope,
  Thermometer,
  FlaskConical,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const specialties = [
  {
    title: "General Physician",
    description:
      "Cold, flu, fever, vomiting, infections, headaches, or any other general health issues.",
    icon: <Thermometer className="w-8 h-8" />,
    color: "blue",
  },
  {
    title: "Pediatrics",
    description:
      "Any children's health-related issues, including physical, behavioral, and mental health.",
    icon: <Baby className="w-8 h-8" />,
    color: "pink",
  },
  {
    title: "Gynae & Obs",
    description:
      "Any women's health-related issues, including pregnancy, menstruation, fertility issues, and hormone disorders.",
    icon: <UserCircle2 className="w-8 h-8" />,
    color: "purple",
  },
  {
    title: "Dermatology",
    description:
      "Treatment of diseases related to skin, hair, and nails, along with some cosmetic problems.",
    icon: <Microscope className="w-8 h-8" />,
    color: "teal",
  },
  {
    title: "Internal Medicine",
    description:
      "Prevention, diagnosis, and treatment of adults across the spectrum from health to complex illness.",
    icon: <Stethoscope className="w-8 h-8" />,
    color: "indigo",
  },
  {
    title: "Endocrinology",
    description: "Treatment of diseases related to problems with hormones.",
    icon: <FlaskConical className="w-8 h-8" />,
    color: "cyan",
  },
  {
    title: "Neurology",
    description:
      "Diagnosis and treatment of diseases involving the central and peripheral nervous systems.",
    icon: <Brain className="w-8 h-8" />,
    color: "yellow",
  },
  {
    title: "Gastroenterology",
    description:
      "Diseases affecting the gastrointestinal tract, which includes organs from the mouth into the anus.",
    icon: <Activity className="w-8 h-8" />,
    color: "orange",
  },
  {
    title: "Cardiology",
    description:
      "Diagnosis, treatment of congenital heart defects, coronary artery disease, heart failure, and valvular heart disease.",
    icon: <Heart className="w-8 h-8" />,
    color: "red",
  },
  {
    title: "Urology",
    description:
      "Diagnosis and treatment of diseases of the male and female urinary tract system.",
    icon: <HeartPulse className="w-8 h-8" />,
    color: "emerald",
  },
  {
    title: "Nutrition & Food Science",
    description: "Weight management, health & wellness, overall well-being.",
    icon: <Apple className="w-8 h-8" />,
    color: "green",
  },
  {
    title: "Dentistry",
    description:
      "Diagnosis, management, and treatment of defects and injuries related to the teeth and gums.",
    icon: <Tooth className="w-8 h-8" />,
    color: "sky",
  },
  {
    title: "Psychiatry",
    description:
      "Diagnosis, prevention, and treatment of mental disorders related to mood, behavior, cognition, and perceptions.",
    icon: <Brain className="w-8 h-8" />,
    color: "violet",
  },
  {
    title: "Psychology",
    description:
      "Identify and diagnose mental, behavioral, and emotional disorders.",
    icon: <UserCircle2 className="w-8 h-8" />,
    color: "fuchsia",
  },
  {
    title: "Orthopedics",
    description: "Bones, muscles, joints, tendons, ligaments.",
    icon: <Bone className="w-8 h-8" />,
    color: "amber",
  },
  {
    title: "Pulmonology",
    description:
      "Diagnosis, prevention, and treatment of diseases affecting the lungs and respiratory tract.",
    icon: <Lungs className="w-8 h-8" />,
    color: "lime",
  },
  {
    title: "Rheumatology",
    description:
      "Diagnosis and treatment of arthritis and other diseases of the joints, muscles, and bones.",
    icon: <Dna className="w-8 h-8" />,
    color: "rose",
  },
];

const SpecialtySelection = () => {
  const { isDarkMode } = useAuth();

  return (
    <div
      className={`min-h-screen  py-12 px-4 sm:px-6 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200"
          : "bg-gradient-to-r from-[#D3E2CD] to-[#e8f0e5] text-gray-900"
      } transition-all relative duration-300`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold   ${
              isDarkMode ? " text-gray-200" : " text-gray-900"
            }mb-4`}
          >
            Choose Your Specialty
          </h2>
          <p
            className={`${
              isDarkMode ? "text-gray-300 " : "text-gray-600 "
            } max-w-2xl mx-auto`}
          >
            Select from our wide range of medical specialties to find the right
            healthcare professional for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((specialty, index) => (
            <Link
              to={`/doctors/${specialty.title}`}
              key={index}
              className={`group relative ${
                isDarkMode
                  ? "bg-gray-800  border-gray-700"
                  : "bg-white  border-gray-100"
              } rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border   cursor-pointer`}
            >
              <div
                className={`absolute inset-0 bg-${specialty.color}-500 opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}
              />

              <div
                to={`/doctor/${specialty.title}`}
                className="flex items-start space-x-4"
              >
                <div
                  className={`flex-shrink-0 p-3 rounded-lg ${
                    isDarkMode
                      ? `bg-${specialty.color}-900/20 text-${specialty.color}-400`
                      : `bg-${specialty.color}-100 text-${specialty.color}-500`
                  }     group-hover:scale-110 transition-transform duration-300`}
                >
                  {specialty.icon}
                </div>

                <div className="flex-1">
                  <h3
                    className={`text-xl font-semibold ${
                      isDarkMode
                        ? "text-white  group-hover:text-blue-600"
                        : "text-gray-900 group-hover:text-blue-400"
                    }   mb-2  `}
                  >
                    {specialty.title}
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-300  " : "text-gray-600"
                    }   text-sm leading-relaxed`}
                  >
                    {specialty.description}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-300">
                <svg
                  className={`w-6 h-6  ${
                    isDarkMode ? "text-gray-500" : "text-gray-400 "
                  }`}
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialtySelection;
