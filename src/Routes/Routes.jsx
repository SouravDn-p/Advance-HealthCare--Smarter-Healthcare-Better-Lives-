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
        path: "/emergency",
        element: <EmergencyServices />,
      },
      {
        path: "/doctors/:speciality",
        element: <DoctorsCategoryWrapper />,
      },
      {
        path: "dashboard/appointments",
        element: (
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/medical-records",
        element: <MedicalRecord />,
      },
      {
        path: "dashboard/consultation",
        element: <Telemedicine />,
      },
      {
        path: "dashboard/AIDiagnosis",
        element: <AIDiagnosis />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
