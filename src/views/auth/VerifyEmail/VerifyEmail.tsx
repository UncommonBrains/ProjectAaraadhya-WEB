import { useEffect, useState } from 'react';
import { Mail, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useEmailVerificationViewModel } from '../../../view-models/auth/useEmailVerificationViewModel';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../../utils/toast';

const VerifyEmail = () => {
  const { firebaseUser, loading: loadingUser } = useAuth();
  const { handleEmailVerification, loading, success, error, coolDown } =
    useEmailVerificationViewModel();
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingUser && firebaseUser?.emailVerified) navigate('/');
    if (error) toast.error(error.message);
  }, [firebaseUser, loadingUser, error, navigate, toast]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (success) {
      if (firebaseUser && !firebaseUser.emailVerified) {
        interval = setInterval(async () => {
          await firebaseUser.reload();
          if (firebaseUser.emailVerified) {
            toast.success('Email verified successfully');
            navigate('/');
          }
        }, 5000); // check every 5 seconds
      }
    }

    return () => clearInterval(interval);
  }, [firebaseUser, success, toast, navigate]);

  const handleCheckStatus = async () => {
    setIsChecking(true);
    if (firebaseUser) {
      await firebaseUser.reload();
      if (firebaseUser.emailVerified) {
        toast.success('Email verified successfully');
        navigate('/');
      } else {
        toast.error('Email not verified yet, please check your inbox and verify your email');
      }
    }
    setIsChecking(false);
  };

  // Render different content based on verification status
  const renderContent = () => {
    return success ? (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-800">Email Sent!</h3>
        <p className="mb-6 text-gray-600">
          We've sent a verification email to <b>{firebaseUser?.email}</b>. Please check your inbox
          and click the link to verify your email. after verification you will be redirected to home
          page. if not redirected click the Check Status button below.
        </p>
        <div className="flex">
          <button
            onClick={handleCheckStatus}
            disabled={isChecking}
            className="text-md mx-1 flex w-full items-center justify-center rounded-lg bg-amber-600 py-3 font-medium text-white transition-colors hover:bg-amber-700 disabled:bg-amber-300"
          >
            {isChecking && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
            Check status
          </button>
          <button
            disabled={coolDown > 0 || loading}
            onClick={handleEmailVerification}
            className="text-md mx-1 flex w-full items-center justify-center rounded-lg bg-amber-600 py-3 font-medium text-white transition-colors hover:bg-amber-700 disabled:bg-amber-300"
          >
            {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
            {coolDown > 0 ? `Resend in ${coolDown}s` : 'Resend Email'}
          </button>
        </div>
      </div>
    ) : loadingUser ? (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <Mail className="h-10 w-10 text-amber-500" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-800">Checking Verification Status</h3>
        <p className="mb-6 text-gray-600">
          Please wait while we check your email verification status...
        </p>
        <div className="flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
        </div>
      </div>
    ) : (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-10 w-10 text-red-500" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-800">Email Not Verified Yet</h3>
        <p className="mb-6 text-gray-600">
          Your email address <b>{firebaseUser?.email}</b> has not been verified yet. Click the
          button below to get email verification link.
        </p>
        <button
          onClick={handleEmailVerification}
          disabled={loading}
          className="text-md flex w-full items-center justify-center rounded-lg bg-amber-600 py-3 font-medium text-white transition-colors hover:bg-amber-700 disabled:bg-amber-300"
        >
          {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
          Get Verification Email
        </button>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 px-4 py-12 font-sans">
      <div className="w-full max-w-md">
        {/* Main content wrapper */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="p-8">{renderContent()}</div>
        </div>

        {/* Help link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Having trouble?{' '}
          <a href="/contact" className="text-amber-700 hover:text-amber-900">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
