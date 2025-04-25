import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <form>
      {/* Email Field */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
        <div className="relative">
          <input
            type="email"
            name="email"
            className="w-full rounded-md border border-amber-200 p-3 !pl-10 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            placeholder="Enter your email address"
            required
          />
          <Mail className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
        </div>
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            className="w-full rounded-md border border-amber-200 p-3 !pl-10 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            placeholder="Enter your password"
            required
          />
          <Lock className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-4 right-3 text-gray-500"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="mb-6 flex justify-end">
        <NavLink to="/forgot-password" className="text-sm text-amber-700 hover:text-amber-900">
          Forgot password?
        </NavLink>
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
            Logging in...
          </>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
};

export default LoginForm;
