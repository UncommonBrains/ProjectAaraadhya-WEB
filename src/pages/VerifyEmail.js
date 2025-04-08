import React, { useState, useEffect, useRef } from "react";
import { Mail, CheckCircle, RefreshCw } from "lucide-react";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [verificationStatus, setVerificationStatus] = useState(null); // null, "verifying", "success", "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  
  const inputRefs = useRef([]);

  useEffect(() => {
    // In a real app, you would get the email from URL params, localStorage, or context
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email") || "user@example.com";
    setEmail(emailParam);

    // Set initial focus on first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // OTP input handler
  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Clear any previous errors when user starts typing
    if (verificationStatus === "error") {
      setVerificationStatus(null);
      setErrorMessage("");
    }

    // Auto-focus next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle key press for backspace
  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste functionality
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    // Check if pasted content contains only digits and matches expected length
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("").slice(0, 6);
      const newOtpValues = [...otpValues];
      
      digits.forEach((digit, index) => {
        if (index < 6) {
          newOtpValues[index] = digit;
        }
      });
      
      setOtpValues(newOtpValues);
      
      // Focus on the appropriate input after paste
      if (digits.length < 6 && inputRefs.current[digits.length]) {
        inputRefs.current[digits.length].focus();
      }
    }
  };

  // Handle verify OTP
  const handleVerifyOtp = async () => {
    const otp = otpValues.join("");
    
    // Check if OTP is complete
    if (otp.length !== 6) {
      setVerificationStatus("error");
      setErrorMessage("Please enter the complete 6-digit code");
      return;
    }
    
    setVerificationStatus("verifying");
    
    // Simulate API verification (replace with actual API call)
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock verification (in a real app, this would be an API call)
      if (otp === "123456") { // Example valid OTP
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
        setErrorMessage("Invalid or expired verification code");
      }
    } catch (error) {
      setVerificationStatus("error");
      setErrorMessage("Verification failed. Please try again.");
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isResending) return;
    
    setIsResending(true);
    
    // Simulate API call to resend OTP
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset OTP inputs
      setOtpValues(["", "", "", "", "", ""]);
      setVerificationStatus(null);
      setErrorMessage("");
      
      // Focus on first input after resend
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
      
      setIsResending(false);
      setResendCooldown(60); // 60 second cooldown
      
      // Start countdown timer
      const timer = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setIsResending(false);
      setErrorMessage("Failed to resend code. Please try again.");
    }
  };

  // Render verification result if available
  if (verificationStatus === "success") {
    return (
      <div className="bg-amber-50 min-h-screen font-sans flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Verified!</h3>
              <p className="text-gray-600 mb-6">
                Your email address {email} has been successfully verified.
              </p>
              <a href="/login" className="block w-full bg-amber-600 text-white rounded-lg py-3 font-medium text-md hover:bg-amber-700 transition-colors text-center">
                Continue to Login
              </a>
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
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-amber-100">
                <Mail className="h-10 w-10 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Verify Your Email</h3>
              <p className="text-gray-600">
                We've sent a 6-digit verification code to<br />
                <span className="font-medium">{email}</span>
              </p>
            </div>

            {/* OTP Input Fields */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-3 text-center">
                Enter Verification Code
              </label>
              <div className="flex justify-between gap-2">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={`w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg font-medium 
                      ${verificationStatus === "error" ? "border-red-300" : "border-amber-200"}`}
                    autoComplete="off"
                  />
                ))}
              </div>
              
              {/* Error message */}
              {errorMessage && (
                <p className="mt-2 text-sm text-red-600 text-center">
                  {errorMessage}
                </p>
              )}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerifyOtp}
              disabled={verificationStatus === "verifying"}
              className="w-full bg-amber-600 text-white rounded-lg py-3 font-medium text-md hover:bg-amber-700 transition-colors disabled:bg-amber-300 flex items-center justify-center"
            >
              {verificationStatus === "verifying" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </button>

            {/* Resend Code */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm mb-2">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || isResending}
                className="text-amber-700 hover:text-amber-900 text-sm font-medium inline-flex items-center disabled:text-amber-400"
              >
                {isResending && <RefreshCw className="h-3 w-3 mr-1 animate-spin" />}
                {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend Code"}
              </button>
            </div>
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

export default VerifyEmail;