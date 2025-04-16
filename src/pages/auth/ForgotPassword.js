import React, { useState } from "react";
import { Mail, ArrowLeft, CheckCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("request"); // request, sent, error
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await sendPasswordResetEmail(auth, email);

      // Success - move to confirmation step
      setStep("sent");

      // Start resend cooldown
      setResendCooldown(60);
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
      // Handle error
      setErrorMessage("Failed to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resend reset link
  const handleResend = async () => {
    if (resendCooldown > 0 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Reset cooldown timer
      setResendCooldown(60);
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
      setErrorMessage("Failed to resend reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    if (step === "request") {
      navigate("/auth");
    } else {
      setStep("request");
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
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-amber-700 mb-6 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to {step === "request" ? "Login" : "Reset Password"}
            </button>

            {step === "request" ? (
              <>
                <div className="text-center mb-6">
                  <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-amber-100">
                    <Mail className="h-10 w-10 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Forgot Password</h3>
                  <p className="text-gray-600">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full p-3 !pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 ${errorMessage ? "border-red-300" : "border-amber-200"
                          }`}
                        placeholder="Enter your email address"
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-600 text-white rounded-lg py-3 font-medium text-md hover:bg-amber-700 transition-colors disabled:bg-amber-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Check Your Email</h3>
                  <p className="text-gray-600 mb-6">
                    We've sent a password reset link to<br />
                    <span className="font-medium">{email}</span>
                  </p>

                  {/* Resend link */}
                  <div className="mb-6">
                    <p className="text-gray-600 text-sm mb-2">
                      Didn't receive the email?
                    </p>
                    <button
                      onClick={handleResend}
                      disabled={resendCooldown > 0 || isSubmitting}
                      className="text-amber-700 hover:text-amber-900 text-sm font-medium inline-flex items-center disabled:text-amber-400"
                    >
                      {isSubmitting && <RefreshCw className="h-3 w-3 mr-1 animate-spin" />}
                      {resendCooldown > 0 ? `Resend link in ${resendCooldown}s` : "Resend Link"}
                    </button>
                  </div>

                  {/* Go to login */}
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full bg-amber-600 text-white rounded-lg py-3 font-medium text-md hover:bg-amber-700 transition-colors"
                  >
                    Back to Login
                  </button>
                </div>
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

export default ForgotPassword;
