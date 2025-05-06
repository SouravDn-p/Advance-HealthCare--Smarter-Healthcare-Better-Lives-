import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosPublic from "../hooks/useAxiosPublic";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContexts = createContext("");

const AuthProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [response, setResponse] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [loader, setLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, [theme]);

  // get specific user data
  useEffect(() => {
    if (user?.email) {
      setLoader(true);
      axiosPublic
        .get(`/user/${user?.email}`)
        .then((res) => {
          setDbUser(res.data);
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setErrorMessage("Failed to load user data");
          setLoader(false);
        });
    }
  }, [user?.email, axiosPublic]);

  const createUser = async (email, password) => {
    setLoader(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } finally {
      setLoader(false);
    }
  };

  const signInUser = async (email, password) => {
    setLoader(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } finally {
      setLoader(false);
    }
  };

  const signOutUser = async () => {
    setLoader(true);
    try {
      await signOut(auth);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        axiosSecure.post("/jwt").then((res) => setResponse(res));
        axiosPublic
          .post("/user", {
            email: currentUser?.email || "demo user",
            displayName: currentUser?.displayName || "demo displayName",
          })
          .then((res) => setResponse(res))
          .catch((err) => {
            console.error(
              "Error adding user:",
              err.response?.data || err.message
            );
          });
      } else {
        axiosSecure.post("/logout").then((res) => setResponse(res));
      }
      setLoader(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    signInUser,
    signOutUser,
    user,
    setUser,
    theme,
    toggleTheme,
    loader,
    setLoader,
    response,
    setResponse,
    doctors,
    setDoctors,
    dbUser,
    setDbUser,
    errorMessage,
    setErrorMessage,
    isDarkMode,
  };

  return (
    <AuthContexts.Provider value={authInfo}>{children}</AuthContexts.Provider>
  );
};

export default AuthProvider;
