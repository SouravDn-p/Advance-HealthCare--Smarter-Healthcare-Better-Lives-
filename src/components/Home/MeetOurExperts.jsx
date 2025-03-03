import {
  Award,
  MessageCircle,
  Calendar,
  Star,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useContext } from "react";
import { AuthContexts } from "../../providers/AuthProvider";

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "15 years experience",
    image:
      "https://images.pexels.com/photos/4167542/pexels-photo-4167542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.9,
    patients: "2,000+",
    availability: "Mon - Fri",
    achievements: [
      "Best Cardiology Award 2023",
      "Published 24 Research Papers",
    ],
  },
  {
    name: "Dr. Mark Benson",
    specialty: "Neurologist",
    experience: "12 years experience",
    image:
      "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg?t=st=1741025282~exp=1741028882~hmac=5e8ffc3f28dce8ab96ebae617375885a992faddf1e952621bfacee437d297347&w=740",
    rating: 4.8,
    patients: "1,800+",
    availability: "Mon - Sat",
    achievements: ["Neurology Excellence Award", "International Speaker"],
  },
  {
    name: "Dr. Emily Carter",
    specialty: "Dermatologist",
    experience: "10 years experience",
    image:
      "https://img.freepik.com/free-photo/woman-medic-uniform-portrait_23-2147648683.jpg?t=st=1741025592~exp=1741029192~hmac=0db3776a916f4633feefc21474111a3f4791ea23827fa8ecd8a8f5c3bf6c25c6&w=740",
    rating: 4.9,
    patients: "1,500+",
    availability: "Tue - Sat",
    achievements: ["Skin Care Innovation Award", "Celebrity Dermatologist"],
  },
];

const MeetOurExperts = () => {
  const { theme } = useContext(AuthContexts);
  return (
    <section
      className={`py-16 bg-gradient-to-b ${
        theme === "dark"
          ? "bg-gray-800 text-gray-200"
          : "bg-gradient-to-r from-[#D3E2CD] to-[#e8f0e5] text-gray-900 "
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Expert Doctors
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our team of highly qualified medical professionals is here to
            provide you with the best healthcare services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-full  object-cover object-center group-hover:scale-105 transition-transform duration-300 h-96"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{doctor.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {doctor.specialty}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {doctor.experience}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {doctor.patients} Patients
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Achievements
                    </span>
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {doctor.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </button>
                  <button className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 rounded-lg transition-colors duration-300">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/doctors"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold group"
          >
            View All Doctors
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MeetOurExperts;
