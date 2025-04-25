import { useEffect } from 'react';
import { Lock, ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordViewModel } from '../../../view-models/auth/useResetPasswordViewModel';
import { toast } from '../../../utils/toast';
import { useAuth } from '../../../hooks/useAuth';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { firebaseUser } = useAuth();
  const { handleResetPassword, loading, error, success, coolDown } = useResetPasswordViewModel();

  useEffect(() => {
    if (success) toast.success('Reset link sent to your email address. Please check your inbox.');
    if (error) toast.error(error.message);
  }, [success, error, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 px-4 py-12 font-sans">
      <div className="w-full max-w-md">
        {/* Main content wrapper */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="p-8">
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center text-sm font-medium text-gray-600 hover:text-amber-700"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Go Back
            </button>

            <div className="mb-6 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Lock className="h-10 w-10 text-amber-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">Reset Your Password</h3>
              <div className="mb-6 text-center">
                <p className="text-grey-600 mb-6">
                  Click the button below and we'll send you a link to reset your password to your
                  registered email address.
                </p>
                <button
                  disabled={coolDown > 0 || loading}
                  onClick={() => firebaseUser?.email && handleResetPassword(firebaseUser.email)}
                  className="text-md flex w-full items-center justify-center rounded-lg bg-amber-600 py-3 font-medium text-white transition-colors hover:bg-amber-700 disabled:bg-amber-300"
                >
                  {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                  {coolDown > 0
                    ? `Request New Reset Link in ${coolDown}s`
                    : 'Request New Reset Link'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help link */}
        <p className="mt-6 text-center text-xs text-gray-600">
          Having trouble?{' '}
          <a href="/contact" className="text-amber-700 hover:text-amber-900">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
