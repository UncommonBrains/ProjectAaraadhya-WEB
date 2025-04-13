import React, { useState, useEffect } from "react";
import { Mail,  RefreshCw } from "lucide-react";
import { auth } from "../../firebase/firebase"; // Add this import

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    // Get the current user's email
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
    }
  }, []);

  // Handle resend verification email
  const handleResendEmail = async () => {
    if (resendCooldown > 0 || isResending) return;
    
    setIsResending(true);
    
    try {
      await auth.currentUser.sendEmailVerification({
        url: `${window.location.origin}/login`
      });
      setResendCooldown(60); // 60 second cooldown
    } catch (error) {
      console.error("Error sending verification email:", error);
    } finally {
      setIsResending(false);
    }
    
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

  return (
    <div className="bg-amber-50 min-h-screen font-sans flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-amber-100">
                <Mail className="h-10 w-10 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Verify Your Email</h3>
              <p className="text-gray-600 mb-6">
                We've sent a verification email to:<br />
                <span className="font-medium">{email}</span>
              </p>
              <p className="text-gray-600 mb-6">
                Please check your inbox and click on the verification link to complete your registration.
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