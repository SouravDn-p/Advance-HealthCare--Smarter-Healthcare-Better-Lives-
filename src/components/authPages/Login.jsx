"use client";

import { useContext, useState } from "react";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContexts } from "../../providers/AuthProvider";
import auth from "../../firebase/firebase.init";
import { Eye, EyeOff, Mail, Lock, LogOut, Loader } from "lucide-react";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser, signInUser } = useContext(AuthContexts);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const googleProvider = new GoogleAuthProvider();

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await signInUser(email, password);
      setUser(userCredential.user);
      Swal.fire({
        title: "Login successful",
        text: "Welcome back! Login successful",
        icon: "success",
      });
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      console.log("result.user", result.user);

      toast.success("Welcome! Google sign-in successful", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
    } catch (err) {
      console.error("Google Sign-In error:", err.message);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
      toast.success("Successfully signed out", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Sign-Out error:", err.message);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Welcome Back
            </h2>
            <NavLink
              to="/"
              className="w-full px-4 py-3 mb-3 flex items-center justify-center gap-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-300 disabled:opacity-50"
            >
              Home page
            </NavLink>

            {user ? (
              <div className="text-center space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-800 dark:text-gray-200">
                    Welcome, {user.displayName || user.email}
                  </p>
                </div>
                <button
                  className="w-full px-4 py-3 flex items-center justify-center gap-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-300 disabled:opacity-50"
                  onClick={handleGoogleSignOut}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </>
                  )}
                </button>
              </div>
            ) : (
              <>
                <form onSubmit={handleEmailPasswordLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 pl-12 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-300"
                        required
                      />
                      <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          navigate("/forgot-password", { state: { email } })
                        }
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm text-center">
                      {error}
                    </p>
                  </div>
                )}

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
                      Or continue with
                    </span>
                  </div>
                </div>

                <button
                  className="w-full px-4 py-3 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <img
                        src="https://www.google.com/favicon.ico"
                        alt="Google"
                        className="w-5 h-5"
                      />
                      Sign in with Google
                    </>
                  )}
                </button>

                <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
