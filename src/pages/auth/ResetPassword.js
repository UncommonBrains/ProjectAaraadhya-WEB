import React, { useState } from "react";
import { Lock, ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/toast/ToastContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../contexts/auth/AuthContext";

const ResetPassword = () => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const navigate = useNavigate();

  const handleSendResetLink = async (e) => {
    if (resendCooldown > 0 || isSending) return;

    setIsSending(true);

    try {
      await sendPasswordResetEmail(auth, user.email);
      showToast("Reset link sent successfully", "success");
      setResendCooldown(60); // 60 second cooldown

      // Start countdown timer
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      let errorMessage = "Failed to send reset link. Please try again.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address";
          break;
        case "auth/invalid-email":
          errorMessage = "The email address is not valid";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please wait before trying again";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your internet connection";
          break;
        default:
          errorMessage = error.message || errorMessage;
      }

      showToast(`Error: ${errorMessage}`, "error");
    } finally {
      setIsSending(false);
    }
  };


  return (
    <div className="bg-amber-50 min-h-screen font-sans flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Main content wrapper */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-amber-700 mb-6 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Go Back
            </button>

            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-amber-100">
                <Lock className="h-10 w-10 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Reset Your Password</h3>
              <div className="mb-6 text-center">
                <p className="text-grey-600 mb-6">
                  Click the button below and we'll send you a link to reset your password to your registered email address.
                </p>
                <button
                  onClick={handleSendResetLink}
                  disabled={resendCooldown > 0 || isSending}
                  className="w-full bg-amber-600 text-white rounded-lg py-3 font-medium text-md hover:bg-amber-700 transition-colors disabled:bg-amber-300 flex items-center justify-center"
                >
                  {isSending && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                  {resendCooldown > 0 ? `Request New Reset Link in ${resendCooldown}s` : "Request New Reset Link"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help link */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Having trouble? <a href="/contact" className="text-amber-700 hover:text-amber-900">Contact Support</a>
        </p>
      </div>
    </div >
  );
};

export default ResetPassword;
