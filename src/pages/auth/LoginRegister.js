import React, { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebase/firebase';
import { useAuth } from "../../contexts/auth/AuthContext";
import { LOGIN } from "../../contexts/auth/authActionTypes";
import { useToast } from "../../contexts/toast/ToastContext";

const LoginRegister = () => {
  const { dispatch } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (activeTab === "login") {
        const res = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        dispatch({ type: LOGIN, payload: res.user });
      } else {
        if (formData.password !== formData.confirmPassword) {
          return showToast("Passwords do not match", "error");
        }

        const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        dispatch({ type: LOGIN, payload: res.user });
        await setDoc(doc(db, "users", res.user.uid), {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        });
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      switch (error.code) {
        // Login-related
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password";
          break;
        case "auth/user-disabled":
          errorMessage = "This user account has been disabled";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your internet connection";
          break;

        // Signup-related
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters";
          break;
        case "auth/missing-password":
          errorMessage = "Please enter your password";
          break;

        // Shared
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Email/password accounts are not enabled";
          break;

        // Fallback
        default:
          errorMessage = error.message || "An unknown error occurred";
      }

      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSigninWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    try {
      const res = await signInWithPopup(auth, provider);
      console.log("Google sign-in successful:", res.user);

      const user = await getDoc(doc(db, "users", res.user.uid));

      if (!user.exists()) {
        await setDoc(doc(db, "users", res.user.uid), {
          name: res.user.displayName,
          email: res.user.email,
          phone: null,
        });
      }
    } catch (error) {
      let errorMessage = "Google sign-in failed";

      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Sign-in popup was closed before completing";
          break;
        case "auth/cancelled-popup-request":
          errorMessage = "Sign-in was canceled due to another popup request";
          break;
        case "auth/popup-blocked":
          errorMessage = "Sign-in popup was blocked by the browser";
          break;
        case "auth/account-exists-with-different-credential":
          errorMessage = "An account already exists with a different credential";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid credentials provided for Google sign-in";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Google sign-in is not enabled in Firebase Console";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your internet connection";
          break;
        default:
          errorMessage = error.message || "An unknown error occurred during Google sign-in";
      }

      showToast(`Error: ${errorMessage}`, 'error');
    }
  };


  return (
    <div className="flex items-center justify-center bg-amber-50 min-h-screen font-sans">
      {/* Main content wrapper */}
      <div className="max-w-md mx-auto p-4">


        {/* Login/Register Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <div className="flex border-b border-amber-200">
            <button
              className={`flex-1 py-4 text-center text-sm font-medium ${activeTab === "login"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-600"
                }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-4 text-center text-sm font-medium ${activeTab === "register"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-600"
                }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {activeTab === "register" && (
                <>
                  {/* Name Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative ">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 !pl-10 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Enter your full name"
                        required
                      />
                      <User className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 !pl-10 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Enter your phone number"
                        required
                      />
                      <Phone className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
                    </div>
                  </div>
                </>
              )}

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 !pl-10 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Enter your email address"
                    required
                  />
                  <Mail className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-3 !pl-10 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Enter your password"
                    required
                  />
                  <Lock className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-4 right-3 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (only for register) */}
              {activeTab === "register" && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full p-3 !pl-10 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="Confirm your password"
                      required
                    />
                    <Lock className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
                  </div>
                </div>
              )}

              {/* Forgot Password Link (only for login) */}
              {activeTab === "login" && (
                <div className="flex justify-end mb-6">
                  <a
                    href="/forgot-password"
                    className="text-sm text-amber-700 hover:text-amber-900"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 text-white rounded-lg py-3 font-medium text-md hover:bg-amber-700 transition-colors disabled:bg-amber-300 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {activeTab === "login" ? "Logging in..." : "Creating Account..."}
                  </>
                ) : (
                  activeTab === "login" ? "Login" : "Create Account"
                )}
              </button>
            </form>

            {/* OR Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button onClick={handleSigninWithGoogle} className="w-full bg-white border border-gray-300 rounded-lg py-3 font-medium text-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <p className="text-center text-xs text-gray-600 mt-6">
          By continuing, you agree to our{" "}
          <a href="/terms-of-service" className="text-amber-700">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="text-amber-700">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
