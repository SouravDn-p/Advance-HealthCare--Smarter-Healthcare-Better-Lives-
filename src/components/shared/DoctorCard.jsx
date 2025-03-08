import React from "react";
import { Clock, Calendar, Star, MapPin } from "lucide-react";
const DoctorCard = ({ doctor, getSpecialtyIcon, handleBookAppointment }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={doctor.image || "/placeholder.svg"}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {doctor.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400">
            {getSpecialtyIcon(doctor.specialty)}
            <span>{doctor.specialty}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{doctor.hospital}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>{doctor.rating} (120+ reviews)</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{doctor.experience}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{doctor.nextAvailable}</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {doctor.bio}
      </p>

      <div className="flex items-center justify-between mt-4">
        <div className="text-lg font-semibold text-gray-900 dark:text-white">
          {doctor.consultationFee}
        </div>
        <button
          onClick={() => handleBookAppointment(doctor)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
