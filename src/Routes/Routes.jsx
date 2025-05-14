import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/authPages/Login";
import Main from "../layout/Main";
import Register from "../components/authPages/Register";
import FAQ from "../extra/Faq";
import Services from "../components/Services/Services";
import Doctor from "../components/doctors/Doctor";
import ErrorPage from "../components/shared/ErrorPage";
import Appointments from "../components/appointments/Appointments";
import MedicalRecord from "../components/medicalRecords/MedicalRecord";
import Telemedicine from "../components/telemedicine/Telemedicine";
import AIDiagnosis from "../components/aiDiagnosis/AiDiagnosis";
import EmergencyServices from "../components/emargency/EmergencyServices";
import DoctorsCategory from "../components/doctors/DoctorsCategory";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../extra/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import { BloodDonors } from "../components/bloodDonations/BloodDonors";
import DoctorManagement from "../components/dashboard/admin/DoctorManagement";
import Announcements from "../components/dashboard/admin/announcement/Announcements";
import FeedbackComplaints from "../components/dashboard/shared/feedback/FeedbackComplaints";
import Settings from "../components/dashboard/shared/setting/Settings";
import HelpSupportPage from "../components/dashboard/shared/helpAndSupport/HelpSupportPage";
import ContactUs from "../components/contract/ContractUs";
import AboutUs from "../components/abouUs/AboutUs";
import AmbulanceManagement from "../components/dashboard/admin/ambulance/AmbulanceManagement";
import PatientManagement from "../components/dashboard/admin/patient/PatientManagement";
import AppointmentScheduling from "../components/dashboard/doctors/Appointment/AppointmentScheduling";
import DoctorProfile from "../components/dashboard/doctors/Profile/DoctorProfile";
import DoctorMedicalRecords from "../components/dashboard/doctors/medicalRecord/DoctorMedicalRecords";
import AppointmentManage from "../components/dashboard/admin/appointment/AppointmentManage";
import Chat from "../components/Chats/Chat";
import ReportScanner from "../components/reportScanner/ReportScanner";

const DoctorsCategoryWrapper = () => {
  const { speciality } = useParams();
  return <DoctorsCategory speciality={speciality} />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/doctors",
        element: <Doctor />,
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },

      {
        path: "/doctors/:speciality",
        element: (
          <PrivateRoute>
            <DoctorsCategoryWrapper />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "appointments",
        element: (
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        ),
      },
      {
        path: "medical-records",
        element: (
          <PrivateRoute>
            <MedicalRecord />
          </PrivateRoute>
        ),
      },
      {
        path: "consultation",
        element: (
          <PrivateRoute>
            <Telemedicine />
          </PrivateRoute>
        ),
      },
      {
        path: "emergency",
        element: <EmergencyServices />,
      },
      {
        path: "messages",
        element: <Chat />,
      },
      {
        path: "reportScanner",
        element: <ReportScanner />,
      },
      //Doctors path
      {
        path: "managePatients",
        element: (
          <PrivateRoute>
            <PatientManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "appointmentsScheduling",
        element: (
          <PrivateRoute>
            <AppointmentScheduling />
          </PrivateRoute>
        ),
      },
      {
        path: "DoctorProfile",
        element: (
          <PrivateRoute>
            <DoctorProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "DoctorMedicalRecords",
        element: (
          <PrivateRoute>
            <DoctorMedicalRecords />
          </PrivateRoute>
        ),
      },

      //Admin Pages
      {
        path: "manageAmbulance",
        element: (
          <PrivateRoute>
            <AmbulanceManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "manageAppointments",
        element: (
          <PrivateRoute>
            <AppointmentManage />
          </PrivateRoute>
        ),
      },
      {
        path: "AiDiagnosis",
        element: (
          <PrivateRoute>
            <AIDiagnosis />
          </PrivateRoute>
        ),
      },
      {
        path: "manageDoctors",
        element: (
          <PrivateRoute>
            <DoctorManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "announcements",
        element: (
          <PrivateRoute>
            <Announcements />
          </PrivateRoute>
        ),
      },
      {
        path: "feedback",
        element: (
          <PrivateRoute>
            <FeedbackComplaints />
          </PrivateRoute>
        ),
      },
      {
        path: "bloodDonors",
        element: (
          <PrivateRoute>
            <BloodDonors />
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
      {
        path: "help",
        element: (
          <PrivateRoute>
            <HelpSupportPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
