import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
        path: "/doctors/:specialty",
        element: <Doctor />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/doctors/${params.specialty}`),
      },
      {
        path: "dashboard/appointments",
        element: <Appointments />,
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
