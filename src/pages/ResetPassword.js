import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL when component mounts
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token");
    
    if (tokenParam) {
      setToken(tokenParam);
      
      // Validate token (simulated)
      validateToken(tokenParam);
    } else {
      setIsTokenValid(false);
      setErrorMessage("Invalid or missing reset token. Please request a new password reset link.");
    }
  }, [location]);

  // Simulate token validation
  const validateToken = async (tokenToValidate) => {
    try {
      // In a real app, you would call your API to validate the token
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, consider all tokens valid except "invalid"
      if (tokenToValidate === "invalid") {
        setIsTokenValid(false);
        setErrorMessage("This password reset link has expired or is invalid. Please request a new one.");
      } else {
        setIsTokenValid(true);
      }
    } catch (error) {
      setIsTokenValid(false);
      setErrorMessage("Failed to validate reset token. Please try again.");
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setErrorMessage("Please enter a valid 6-digit OTP");
      return;
    }
    
    setIsVerifyingOtp(true);
    setErrorMessage("");
    
    try {
      // Simulate API call to verify OTP
      // In a real app, you would send both the token and OTP to verify
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, consider all OTPs valid except "000000"
      if (otp === "000000") {
        setErrorMessage("Invalid OTP. Please check your email and try again.");
      } else {
        console.log(`OTP verified successfully with token: ${token}`);
        setIsOtpVerified(true);
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage("Failed to verify OTP. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Handle password reset form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      // Simulate API call to reset password
      // In a real app, you would send the token along with the new password
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Password reset successfully with token: ${token}`);
      // Success
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage("Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to resend OTP
  const handleResendOtp = async () => {
    try {
      // In a real app, you would call your API to resend OTP using the token
      console.log(`Resending OTP with token: ${token}`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("New OTP sent to your email!");
    } catch (error) {
      alert("Failed to resend OTP. Please try again.");
    }
  };

  // If success, show success message
  if (isSuccess) {
    return (
      <div className="bg-amber-50 min-h-screen font-sans flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Password Reset Successful</h3>
              <p className="text-gray-600 mb-6">
                Your password has been successfully reset. You can now log in with your new password.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-amber-600 text-white rounded-lg py-3 font-medium text-md hover:bg-amber-700 transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 min-h-screen font-sans flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Main content wrapper */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            {/* Back button */}
            <button 
              onClick={() => navigate("/login")}
              className="flex items-center text-gray-600 hover:text-amber-700 mb-6 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </button>
            
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-amber-100">
                <Lock className="h-10 w-10 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Reset Your Password</h3>
              <p className="text-gray-600">
                {isOtpVerified 
                  ? "Please enter your new password below."
                  : "Enter the OTP sent to your email address."
                }
              </p>
            </div>

            {/* Show error if token is invalid */}
            {!isTokenValid ? (
              <div className="mb-6 text-center">
                <p className="text-red-600 mb-6">{errorMessage}</p>
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="w-full bg-amber-600 text-white rounded-lg py-3 font-medium text-md hover:bg-amber-700 transition-colors"
                >
                  Request New Reset Link
                </button>
              </div>
            ) : (
              <>
                {/* OTP Verification Form */}
                {!isOtpVerified ? (
                  <form onSubmit={handleVerifyOtp}>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        OTP Code
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                          className="w-full p-3 !pl-10 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          required
                        />
                        <Mail className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
                      </div>
                      
                      {/* Error message */}
                      {errorMessage && (
                        <p className="mt-2 text-sm text-red-600">
                          {errorMessage}
                        </p>
                      )}
                    </div>

                    {/* Verify OTP Button */}
                    <button
                      type="submit"
                      disabled={isVerifyingOtp}
                      className="w-full bg-amber-600 text-white rounded-lg py-3 font-medium text-md hover:bg-amber-700 transition-colors disabled:bg-amber-300 flex items-center justify-center"
                    >
                      {isVerifyingOtp ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Verifying...
                        </>
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                    
                    {/* Resend OTP link */}
                    <div className="text-center mt-4">
                      <button 
                        type="button"
                        className="text-amber-700 hover:text-amber-900 text-sm"
                        onClick={handleResendOtp}
                      >
                        Didn't receive the code? Resend OTP
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Password Reset Form - only shown after OTP is verified */
                  <form onSubmit={handleSubmit}>
                    {/* New Password Field */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full p-3 !pl-10 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                          placeholder="Enter new password"
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

                    {/* Confirm Password Field */}
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full p-3 !pl-10 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                          placeholder="Confirm new password"
                          required
                        />
                        <Lock className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
                      </div>
                      
                      {/* Error message */}
                      {errorMessage && (
                        <p className="mt-2 text-sm text-red-600">
                          {errorMessage}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-600 text-white rounded-lg py-3 font-medium text-md hover:bg-amber-700 transition-colors disabled:bg-amber-300 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Resetting Password...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Help link */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Having trouble? <a href="/contact" className="text-amber-700 hover:text-amber-900">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;