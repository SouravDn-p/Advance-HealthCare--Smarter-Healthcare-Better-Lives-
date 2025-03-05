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
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b001" },
    "name": "Dr. Sarah Johnson",
    "specialty": "Cardiology",
    "experience": "15 years experience",
    "image": "https://images.pexels.com/photos/4167542/pexels-photo-4167542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "rating": 4.9,
    "patients": "2,000+",
    "availability": "Mon - Fri",
    "achievements": [
      "Best Cardiology Award 2023",
      "Published 24 Research Papers"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b002" },
    "name": "Dr. Mark Benson",
    "specialty": "Neurology",
    "experience": "12 years experience",
    "image": "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg?t=st=1741025282~exp=1741028882~hmac=5e8ffc3f28dce8ab96ebae617375885a992faddf1e952621bfacee437d297347&w=740",
    "rating": 4.8,
    "patients": "1,800+",
    "availability": "Mon - Sat",
    "achievements": [
      "Neurology Excellence Award",
      "International Speaker"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b003" },
    "name": "Dr. Emily Carter",
    "specialty": "Dermatology",
    "experience": "10 years experience",
    "image": "https://img.freepik.com/free-photo/woman-medic-uniform-portrait_23-2147648683.jpg?t=st=1741025592~exp=1741029192~hmac=0db3776a916f4633feefc21474111a3f4791ea23827fa8ecd8a8f5c3bf6c25c6&w=740",
    "rating": 4.9,
    "patients": "1,500+",
    "availability": "Tue - Sat",
    "achievements": [
      "Skin Care Innovation Award",
      "Celebrity Dermatologist"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b004" },
    "name": "Dr. David Lee",
    "specialty": "Dermatology",
    "experience": "18 years",
    "image": "https://media.istockphoto.com/id/2158610739/photo/handsome-male-doctor-with-stethoscope-over-neck-working-while-looking-at-camera-in-the.jpg?s=612x612&w=0&k=20&c=WWd2ujTaKfM7VU47_z_E-2YPIGlEEvJa4qVgavD4a70=",
    "rating": 4.9,
    "patients": "3,000+",
    "availability": "Mon - Fri",
    "achievements": [
      "Skin Health Expert",
      "Inventor of Advanced Skin Cream"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b005" },
    "name": "Dr. Aisha Khan",
    "specialty": "Orthopedics",
    "experience": "14 years",
    "image": "http://media.istockphoto.com/id/2157055065/photo/female-doctor-portrait-and-smile-with-tablet-in-hospital-or-workplace-with-lens-flare.jpg?s=612x612&w=0&k=20&c=VEU22yaVyv7Dsr9CiPRFgK_a7yrVzenvG8-C4p2_L44=",
    "rating": 4.6,
    "patients": "1,500+",
    "availability": "Wed - Sun",
    "achievements": [
      "Sports Injury Specialist",
      "Published 8 Research Papers"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b006" },
    "name": "Dr. Robert Garcia",
    "specialty": "Ophthalmology",
    "experience": "20 years",
    "image": "https://media.istockphoto.com/id/1820379319/photo/healthcare-doctor-and-man-with-arms-crossed-at-hospital-with-smile-for-support-service-and.jpg?s=612x612&w=0&k=20&c=26JOTuHgbpIRxZYOBakMRFFZt9BxF-JtL97LErFMBAU=",
    "rating": 4.8,
    "patients": "3,500+",
    "availability": "Mon - Fri",
    "achievements": [
      "Vision Care Pioneer",
      "Developed New Laser Surgery Technique"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b007" },
    "name": "Dr. Jessica Williams",
    "specialty": "Gastroenterology",
    "experience": "11 years",
    "image": "https://media.istockphoto.com/id/1820378768/photo/healthcare-doctor-and-black-man-with-arms-crossed-at-hospital-with-smile-for-support-service.jpg?s=612x612&w=0&k=20&c=HCog1ZKbnzCJvu1NuZsiqmTg_Jav-KYkr9xbvVpU7VA=",
    "rating": 4.7,
    "patients": "1,900+",
    "availability": "Tue - Sat",
    "achievements": [
      "Digestive Health Advocate",
      "Published 12 Articles"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b008" },
    "name": "Dr. Michael Brown",
    "specialty": "Psychiatry",
    "experience": "16 years",
    "image": "https://media.istockphoto.com/id/1785918657/photo/portrait-of-doctor-with-smile-confidence-and-hospital-employee-with-care-support-and-trust.jpg?s=612x612&w=0&k=20&c=edx0LITtjis5zxtRZIbx24yholpv4oNicE-e69guius=",
    "rating": 4.9,
    "patients": "2,800+",
    "availability": "Mon - Fri",
    "achievements": [
      "Mental Health Expert",
      "Author of Bestselling Book"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b009" },
    "name": "Dr. Priya Patel",
    "specialty": "Endocrinology",
    "experience": "13 years",
    "image": "https://media.istockphoto.com/id/1301595548/photo/female-doctor-stock-photo.jpg?s=612x612&w=0&k=20&c=s9kTlQCWJcYmCyMwYwJfTq7jiC1NfHaXzZyGhi4fRHM=",
    "rating": 4.8,
    "patients": "2,200+",
    "availability": "Wed - Sun",
    "achievements": [
      "Diabetes Specialist",
      "Developed New Insulin Therapy"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b010" },
    "name": "Dr. Kevin Smith",
    "specialty": "Pulmonology",
    "experience": "19 years",
    "image": "https://media.istockphoto.com/id/2025170211/photo/cheerful-mature-doctor-posing-and-smiling-at-camera-healthcare-and-medicine.jpg?s=612x612&w=0&k=20&c=SMLcomEgL1ZOrnfN5x_u7b9juouFzAmxb-TNE6si5CI=",
    "rating": 4.7,
    "patients": "3,200+",
    "availability": "Mon - Sat",
    "achievements": [
      "Respiratory Health Pioneer",
      "Published 15 Research Papers"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b011" },
    "name": "Dr. Laura Wilson",
    "specialty": "Urology",
    "experience": "17 years",
    "image": "https://media.istockphoto.com/id/1969864400/photo/tablet-portrait-woman-or-mature-doctor-smile-for-healthcare-medicine-or-gp-with-digital.jpg?s=612x612&w=0&k=20&c=3C60Nmj4iO33_ux-BqEVtJy0TziAAe83ErsnHSCfPSU=",
    "rating": 4.9,
    "patients": "2,900+",
    "availability": "Mon - Fri",
    "achievements": [
      "Urological Surgery Expert",
      "Developed Minimally Invasive Technique"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b012" },
    "name": "Dr. James Taylor",
    "specialty": "Hematology",
    "experience": "12 years",
    "image": "https://media.istockphoto.com/id/2150448539/photo/hansome-doctor-looking-at-camera.jpg?s=612x612&w=0&k=20&c=6pzMIv276AGi_c8kJNZHy6KInEQIagog9Dx9e-GuAkM=",
    "rating": 4.8,
    "patients": "2,100+",
    "availability": "Tue - Sat",
    "achievements": [
      "Blood Disorder Specialist",
      "Published 9 Articles"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b014" },
    "name": "Dr. Christopher Thomas",
    "specialty": "Rheumatology",
    "experience": "14 years",
    "image": "https://media.istockphoto.com/id/2096119485/photo/doctor-talking-with-patient-in-hospital-corridor-handsome-doctor-with-gray-hair-holding.jpg?s=612x612&w=0&k=20&c=-sd1rINHBtkF8NBpxbrb_hK0pLDIeWE-7k1WIn7Rqjk=",
    "rating": 4.9,
    "patients": "2,300+",
    "availability": "Wed - Sun",
    "achievements": [
      "Joint Pain Specialist",
      "Published 11 Research Papers"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b015" },
    "name": "Dr. Elizabeth Jackson",
    "specialty": "Nephrology",
    "experience": "18 years",
    "image": "https://media.istockphoto.com/id/2079306898/photo/doctor-patient-and-consultation-with-conversation-for-healthcare-people-in-office-with-advice.jpg?s=612x612&w=0&k=20&c=dfNVIQJBPwi-BjoWTmQo393nvycwOczXufXuKAdq4s8=",
    "rating": 4.6,
    "patients": "3,100+",
    "availability": "Mon - Fri",
    "achievements": [
      "Kidney Disease Expert",
      "Developed New Dialysis Technique"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b016" },
    "name": "Dr. Matthew White",
    "specialty": "Infectious Disease",
    "experience": "16 years",
    "image": "https://media.istockphoto.com/id/2192903246/photo/concerned-doctor-explains-the-treatment-plan-to-a-patient-experiencing-abdominal-discomfort.jpg?s=612x612&w=0&k=20&c=KXGGUuhAJBI_Bx_qEbCp24GrD5MHzjLbaK0_DakbGes=",
    "rating": 4.8,
    "patients": "2,700+",
    "availability": "Tue - Sat",
    "achievements": [
      "Infection Control Specialist",
      "Published 13 Articles"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b017" },
    "name": "Dr. Brittany Harris",
    "specialty": "Allergy and Immunology",
    "experience": "10 years",
    "image": "https://media.istockphoto.com/id/1772453030/photo/comprehensive-care-planning-cheerful-senior-woman-doctor-in-white-coat-with-stethoscope.jpg?s=612x612&w=0&k=20&c=efP6fxh4cZUT81FKDAiQqx7qEboif3OvbtbuT0lRueA=",
    "rating": 4.7,
    "patients": "1,800+",
    "availability": "Mon - Fri",
    "achievements": [
      "Allergy Treatment Expert",
      "Developed New Immunotherapy"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b018" },
    "name": "Dr. Joseph Martin",
    "specialty": "Emergency Medicine",
    "experience": "15 years",
    "image": "https://media.istockphoto.com/id/2167960672/photo/portrait-of-caucasian-middle-eastern-multiracial-ethnicity-mature-man-medical-doctor-surgeon.jpg?s=612x612&w=0&k=20&c=aagBF3lNZYrN6ra3F2sygHJvP0sO3ZAOtCm9jz7DasE=",
    "rating": 4.9,
    "patients": "4,000+",
    "availability": "24/7",
    "achievements": [
      "Trauma Care Specialist",
      "Published 18 Research Papers"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b019" },
    "name": "Dr. Sarah Thompson",
    "specialty": "Family Medicine",
    "experience": "12 years",
    "image": "https://media.istockphoto.com/id/1997397032/photo/male-doctor-taking-notes-while-working-on-laptop-in-the-office.jpg?s=612x612&w=0&k=20&c=zmqQKs-IMzxagtZzyMZOaYwv9FlOQN9nRuj4_en-1HE=",
    "rating": 4.8,
    "patients": "2,500+",
    "availability": "Mon - Sat",
    "achievements": [
      "Primary Care Provider",
      "Published 7 Articles"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b020" },
    "name": "Dr. Anthony Garcia",
    "specialty": "Geriatrics",
    "experience": "20 years",
    "image": "https://media.istockphoto.com/id/1635982957/photo/happy-asian-man-doctor-and-arms-crossed-in-confidence-of-healthcare-consultant-at-the-office.jpg?s=612x612&w=0&k=20&c=h6afWku3v9XVNVtZ86zYn0nIH8lOw-3v4rdIIt_VwA8=",
    "rating": 4.7,
    "patients": "3,500+",
    "availability": "Mon - Fri",
    "achievements": [
      "Elderly Care Specialist",
      "Published 14 Research Papers"
    ]
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b021" },
    "name": "Dr. Linda Rodriguez",
    "specialty": "General Physician",
    "experience": "11 years",
    "image": "https://media.istockphoto.com/id/2193298525/photo/portrait-of-a-smiling-female-doctor-looking-at-camera.jpg?s=612x612&w=0&k=20&c=v7RzSTtNuC7mOQiXiFRVrEDDVNCtE_Oqw6J1gscXrW0=",
    "rating": 4.6,
    "patients": "2,200+",
    "availability": "Mon - Sat",
    "achievements": [
      "Community Health Advocate",
      "Published 5 Articles"
    ],
    "hospital": "Popular Medical College Hospital",
    "consultation_fee": "$125"
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b022" },
    "name": "Dr. Paul Wilson",
    "specialty": "Gynae & Obs",
    "experience": "17 years",
    "image": "https://media.istockphoto.com/id/1772458949/photo/happy-confident-old-male-doctor-in-white-coat-with-stethoscope-and-crossed-arms-on-chest.jpg?s=612x612&w=0&k=20&c=v9emv-EwclBpVboJsOmjw1zWcfT9u0uqWSsJ_B47e2M=",
    "rating": 4.9,
    "patients": "3,000+",
    "availability": "Tue - Sun",
    "achievements": [
      "Women's Health Pioneer",
      "Developed Advanced Surgical Technique"
    ],
    "hospital": "Popular Medical College Hospital",
    "consultation_fee": "$155"
    
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b023" },
    "name": "Dr. Maria Martinez",
    "specialty": "Internal Medicine",
    "experience": "19 years",
    "image":
      "https://media.istockphoto.com/id/1806602692/photo/portrait-of-a-female-doctor-holding-a-clipboard.jpg?s=612x612&w=0&k=20&c=873RCAa3gpF_bhsgfOfITcaHup3AULqR4WO0szMZyY0=",
    "rating": 4.8,
    "patients": "3,300+",
    "availability": "Mon - Fri",
    "achievements": ["Adult Health Specialist", "Published 16 Research Papers"],
    "hospital": "Bangabandhu Sheikh Mujib Medical University: BSMMU",
    "consultation_fee": "$125"
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b024" },
    "name": "Dr. Richard Davis",
    "specialty": "Nutrition & Food Science",
    "experience": "13 years",
    "image":
      "https://media.istockphoto.com/id/1959485915/photo/a-smiling-young-male-doctor-is-working-in-the-office-of-the-clinic-using-a-laptop-sitting-in.jpg?s=612x612&w=0&k=20&c=owRFBLIJVl4zpCb5sJMBmMNPiUP9PpBI0I9hWq0XWfM=",
    "rating": 4.7,
    "patients": "2,600+",
    "availability": "Wed - Sat",
    "achievements": [
      "Weight Management Expert",
      "Author of Healthy Eating Cookbook"
    ],
    "hospital": "Dhaka Medical College and Hospital",
    "consultation_fee": "$125"
  },
  {
    "_id": { "$oid": "65e6a9f7c3a4b3d2f8a1b025" },
    "name": "Dr. Susan Garcia",
    "specialty": "Dentistry",
    "experience": "15 years",
    "image":
      "https://media.istockphoto.com/id/2153720801/photo/portrait-of-brunette-european-young-woman-doctor-with-stethoscope.jpg?s=612x612&w=0&k=20&c=1umAir8oLQj7H2pJJFp1f21066An0hJg5B801YVcpcM=",
    "rating": 4.9,
    "patients": "2,900+",
    "availability": "Mon - Fri",
    "achievements": [
      "Cosmetic Dentistry Pioneer",
      "Developed New Dental Implant Technique"
    ]
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
          <h2
            className={`text-3xl md:text-4xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            Meet Our Expert Doctors
          </h2>
          <p
            className={`text-lg  ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
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
