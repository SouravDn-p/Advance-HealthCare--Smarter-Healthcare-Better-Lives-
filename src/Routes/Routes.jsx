import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/authPages/Login";
import Main from "../layout/Main";
import Register from "../components/authPages/Register";
import FAQ from "../extra/Faq";
import Services from "../components/Services/Services";
import Doctor from "../components/doctors/Doctor";
import ErrorPage from "../components/shared/ErrorPage";

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
        element: <Login/>,
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
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
