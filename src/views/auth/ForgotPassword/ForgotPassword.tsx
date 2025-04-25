import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, RefreshCw } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [step, setStep] = useState<string>('request'); // request, sent, error
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);

  const navigate = useNavigate();

  // Handle back button
  const handleBack = () => {
    if (step === 'request') {
      navigate('/auth');
    } else {
      setStep('request');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 px-4 py-12 font-sans">
      <div className="w-full max-w-md">
        {/* Main content wrapper */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="p-8">
            {/* Back button */}
            <button
              onClick={handleBack}
              className="mb-6 flex items-center text-sm font-medium text-gray-600 hover:text-amber-700"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to {step === 'request' ? 'Login' : 'Reset Password'}
            </button>

            {step === 'request' ? (
              <>
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                    <Mail className="h-10 w-10 text-amber-500" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">Forgot Password</h3>
                  <p className="text-gray-600">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                <form>
                  {/* Email Field */}
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-amber-200 p-3 !pl-10 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                        placeholder="Enter your email address"
                        required
                      />
                      <Mail className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-md flex w-full items-center justify-center rounded-lg bg-amber-600 py-3 font-medium text-white transition-colors hover:bg-amber-700 disabled:bg-amber-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">Check Your Email</h3>
                  <p className="mb-6 text-gray-600">
                    We've sent a password reset link to
                    <br />
                    <span className="font-medium">{email}</span>
                  </p>

                  {/* Resend link */}
                  <div className="mb-6">
                    <p className="mb-2 text-sm text-gray-600">Didn't receive the email?</p>
                    <button
                      disabled={resendCooldown > 0 || isSubmitting}
                      className="inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-900 disabled:text-amber-400"
                    >
                      {isSubmitting && <RefreshCw className="mr-1 h-3 w-3 animate-spin" />}
                      {resendCooldown > 0 ? `Resend link in ${resendCooldown}s` : 'Resend Link'}
                    </button>
                  </div>

                  {/* Go to login */}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-md w-full rounded-lg bg-amber-600 py-3 font-medium text-white transition-colors hover:bg-amber-700"
                  >
                    Back to Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Help link */}
        <p className="mt-6 text-center text-xs text-gray-600">
          Having trouble?{' '}
          <NavLink to="/contact" className="text-amber-700 hover:text-amber-900">
            Contact Support
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
