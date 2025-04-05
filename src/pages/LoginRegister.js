import React, { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status states
    setError(null);
    setSuccess(null);
    setLoading(true);
    
    try {
      if (activeTab === "login") {
        const loginData = {
          email: formData.email,
          password: formData.password
        };
      
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
      
        const data = await response.json();
      
        if (!response.ok) {
          throw new Error(data.message || "Login failed. Please check your credentials.");
        }
      
        // ✅ Login success
        setSuccess("Login successful!");
      
        // ✅ Store JWT token
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          console.log("JWT Token stored:", data.token); // optional, for debug
          // Redirect user
          window.location.href = "/";
        } else {
          throw new Error("No token received from server.");
        }
        
      } else {
        // Register logic
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        
        // Prepare data for API
        const registrationData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        };
        
        // Make API call to register endpoint
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }
        
        // Registration success
        setSuccess("Account created successfully! You can now log in.");
        
        // Reset form if successful
        setFormData({
          email: "",
          password: "",
          name: "",
          phone: "",
          confirmPassword: "",
        });
        
        // Switch to login tab after successful registration
        setActiveTab("login");
      }
    } catch (err) {
      setError(err.message || `An error occurred during ${activeTab === "login" ? "login" : "registration"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen font-sans">
      {/* Main content wrapper */}
      <div className="max-w-md mx-auto p-4">
        
        {/* Login/Register Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <div className="flex border-b border-amber-200">
            <button
              className={`flex-1 py-4 text-center text-sm font-medium ${
                activeTab === "login"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-4 text-center text-sm font-medium ${
                activeTab === "register"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          <div className="p-6">
            {/* Display success message */}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                {success}
              </div>
            )}
            
            {/* Display error message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}
            
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
                    value={formData.email }
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
                className={`w-full bg-amber-600 text-white rounded-lg py-3 font-medium text-md hover:bg-amber-700 transition-colors ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {activeTab === "login" 
                  ? (loading ? "Logging in..." : "Login") 
                  : (loading ? "Creating Account..." : "Create Account")}
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
              <button className="w-full bg-white border border-gray-300 rounded-lg py-3 font-medium text-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center">
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
              <button className="w-full bg-blue-600 rounded-lg py-3 font-medium text-md text-white hover:bg-blue-700 transition-colors flex items-center justify-center">
                <svg className="h-5 w-5 mr-2 fill-current" viewBox="0 0 24 24">
                  <path d="M22,12.1c0-3.2-1.3-6.2-3.5-8.4C16.3,1.5,13.3,0.1,10.1,0C6.8,0,3.7,1.4,1.5,3.7C-0.4,5.8-0.5,9,1.2,11.3c0.1,0.1,0.2,0.3,0.3,0.4c1.7,2.1,4.2,3.4,6.8,3.7c0.5,0,0.9,0.2,1.3,0.5c0.3,0.2,0.6,0.5,0.9,0.7c0.5,0.4,1.1,0.6,1.7,0.6c0.6,0,1.1-0.2,1.6-0.5c0.4-0.3,0.8-0.6,1.2-0.9c0.3-0.2,0.6-0.3,0.9-0.3c2.6-0.3,5-1.6,6.7-3.7c0.1-0.1,0.2-0.2,0.3-0.4C22,11.5,22,11.3,22,12.1z" />
                </svg>
                Continue with Facebook
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