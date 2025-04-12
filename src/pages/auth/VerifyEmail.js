import React, { useState, useEffect } from "react";
import { Mail, CheckCircle, XCircle, RefreshCw } from "lucide-react";

const VerifyEmail = () => {
  // States for email confirmation process
  const [verificationStatus, setVerificationStatus] = useState("pending"); // pending, success, error
  const [email, setEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  // Mock function to simulate verification process
  useEffect(() => {
    // In a real app, you would get the email from URL params or context
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email") || "user@example.com";
    setEmail(emailParam);
    
    // Mock verification check - in a real app this would be an API call
    const verifyToken = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get token from URL - in a real app, verify this with your backend
      const token = urlParams.get("token");
      
      // Simulate verification result (success if token exists)
      if (token) {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
      }
    };
    
    verifyToken();
  }, []);

  // Handle resend verification email
  const handleResendEmail = async () => {
    if (resendCooldown > 0 || isResending) return;
    
    setIsResending(true);
    
    // Simulate API call to resend verification email
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
  };

  // Render different content based on verification status
  const renderContent = () => {
    switch (verificationStatus) {
      case "success":
        return (
          <div className="text-center">
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
        );
      case "error":
        return (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Verification Failed</h3>
            <p className="text-gray-600 mb-6">
              We couldn't verify your email address. The verification link may have expired or is invalid.
            </p>
            <button 
              onClick={handleResendEmail} 
              disabled={resendCooldown > 0 || isResending}
              className="w-full bg-amber-600 text-white rounded-lg py-3 font-medium text-md hover:bg-amber-700 transition-colors disabled:bg-amber-300 flex items-center justify-center"
            >
              {isResending && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Verification Email"}
            </button>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-amber-100">
              <Mail className="h-10 w-10 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Verifying Your Email</h3>
            <p className="text-gray-600 mb-6">
              Please wait while we verify your email address...
            </p>
            <div className="flex justify-center">
              <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen font-sans flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Main content wrapper */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
        
        {/* Help link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Having trouble? <a href="/contact" className="text-amber-700 hover:text-amber-900">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;