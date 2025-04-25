import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { NavLink } from 'react-router-dom';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<string>('login');

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 font-sans">
      {/* Main content wrapper */}
      <div className="mx-auto max-w-md p-4">
        {/* Login/Register Tabs */}
        <div className="mb-4 overflow-hidden rounded-lg bg-white shadow-md">
          <div className="flex border-b border-amber-200">
            <button
              className={`flex-1 py-4 text-center text-sm font-medium ${
                activeTab === 'login'
                  ? 'border-b-2 border-amber-600 text-amber-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-4 text-center text-sm font-medium ${
                activeTab === 'register'
                  ? 'border-b-2 border-amber-600 text-amber-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}

            {/* OR Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button className="text-md flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <p className="mt-6 text-center text-xs text-gray-600">
          By continuing, you agree to our{' '}
          <NavLink to="/terms-of-service" className="text-amber-700">
            Terms of Service
          </NavLink>{' '}
          and{' '}
          <NavLink to="/privacy-policy" className="text-amber-700">
            Privacy Policy
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
