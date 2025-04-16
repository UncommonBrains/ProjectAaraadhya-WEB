import React, { useState, useEffect } from "react";
import { Mail, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { useAuth } from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { useToast } from "../../contexts/toast/ToastContext";

const VerifyEmail = () => {
  const { user, loading } = useAuth();
  const { showToast } = useToast();

  // States for email confirmation process
  const [verificationStatus, setVerificationStatus] = useState("pending"); // pending, success, error
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  // Mock function to simulate verification process
  useEffect(() => {
    if (!loading && user?.emailVerified) {
      navigate('/');
    }

    if (!loading && !user?.emailVerified) {
      return setVerificationStatus("error");
    }
  }, [user, loading, navigate]);

  // Handle send verification email
  const handleSendEmail = async () => {
    if (resendCooldown > 0 || isSending) return;

    setIsSending(true);

    try {
      await sendEmailVerification(user);
      showToast("Verification email sent successfully", "success");
      setVerificationStatus("success");
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
      let errorMessage = "Failed to send verification email. Please try again.";

      switch (error.code) {
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please wait before trying again";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your internet connection";
          break;
        case "auth/user-not-found":
          errorMessage = "User not found. Please sign in again.";
          break;
        case "auth/invalid-user-token":
        case "auth/user-token-expired":
          errorMessage = "Session expired. Please sign in again.";
          break;
        default:
          errorMessage = error.message || errorMessage;
      }

      showToast(`Error: ${errorMessage}`, "error");
      setVerificationStatus("error");
    } finally {
      setIsSending(false);
    }
  };


  const handleVerificationCheck = async () => {
    setIsChecking(true);

    try {
      await user.reload();

      if (user.emailVerified) {
        showToast("Email verified successfully", "success");
        navigate('/');
      } else {
        showToast("Email is not verified yet. Please check your inbox.", "info");
      }
    } catch (error) {
      let errorMessage = "Failed to check verification status. Please try again.";

      switch (error.code) {
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your internet connection.";
          break;
        case "auth/user-token-expired":
        case "auth/invalid-user-token":
          errorMessage = "Session expired. Please sign in again.";
          break;
        case "auth/user-not-found":
          errorMessage = "User not found. Please sign in again.";
          break;
        default:
          errorMessage = error.message || errorMessage;
      }

      showToast(`Error: ${errorMessage}`, "error");
      setVerificationStatus("error");
    } finally {
      setIsChecking(false);
    }
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Sent!</h3>
            <p className="text-gray-600 mb-6">
              We've sent a verification email to <b>{user?.email}</b>. Please check your inbox and click the link to verify your email.
            </p>
            <d class="flex">
              <button
                onClick={handleVerificationCheck}
                className="w-full bg-amber-600 text-white rounded-lg py-3  mx-1 font-medium text-md hover:bg-amber-700 transition-colors disabled:bg-amber-300 flex items-center justify-center"
              >
                {isChecking && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                Check status
              </button>
              <button
                onClick={handleSendEmail}
                disabled={resendCooldown > 0 || isSending}
                className="w-full bg-amber-600 text-white rounded-lg py-3  mx-1 font-medium text-md hover:bg-amber-700 transition-colors disabled:bg-amber-300 flex items-center justify-center"
              >
                {isSending && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Email"}
              </button>
            </d>
          </div>
        );
      case "error":
        return (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Not Verified Yet</h3>
            <p className="text-gray-600 mb-6">
              Your email address <b>{user?.email}</b> has not been verified yet. Click the button below to get email verification link.
            </p>
            <button
              onClick={handleSendEmail}
              className="w-full bg-amber-600 text-white rounded-lg py-3 font-medium text-md hover:bg-amber-700 transition-colors disabled:bg-amber-300 flex items-center justify-center"
            >
              {isSending && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
              Get Verification Email
            </button>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-amber-100">
              <Mail className="h-10 w-10 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Checking Verification Status</h3>
            <p className="text-gray-600 mb-6">
              Please wait while we check your email verification status...
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
