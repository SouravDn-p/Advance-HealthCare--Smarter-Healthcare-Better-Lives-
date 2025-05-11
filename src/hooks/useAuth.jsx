import { useContext } from "react";
import { AuthContexts } from "../providers/AuthProvider";
const useAuth = () => {
  const {
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
    signOutUser,
    isDarkMode,
    isMobile,
    setIsMobile,
    selectedUser,
    setSelectedUser,
  } = useContext(AuthContexts);
  return {
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
    signOutUser,
    isDarkMode,
    isMobile,
    setIsMobile,
    selectedUser,
    setSelectedUser,
  };
};

export default useAuth;
