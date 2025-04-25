import { Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from '../../../utils/toast';
import { useRegistrationViewModel } from '../../../view-models/auth/useRegistrationViewModel';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { form, updateForm, handleRegistration, loading, success, error } =
    useRegistrationViewModel();

  useEffect(() => {
    if (success) toast.success('Account created successfully. Redirecting to home page.');
    if (error) toast.error(error.message);
  }, [error, success, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegistration();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
        <div className="relative">
          <input
            type="text"
            name="name"
            className="w-full rounded-md border border-amber-200 p-3 !pl-10 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            placeholder="Enter your full name"
            value={form.displayName}
            onChange={(e) => updateForm('displayName', e.target.value)}
            required
            disabled={loading}
          />
          <User className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
        </div>
      </div>

      {/* Phone Field */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label>
        <div className="relative">
          <input
            type="tel"
            name="phone"
            className="w-full rounded-md border border-amber-200 p-3 !pl-10 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            placeholder="Enter your phone number"
            value={form.phoneNumber}
            onChange={(e) => updateForm('phoneNumber', e.target.value)}
            required
            disabled={loading}
          />
          <Phone className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
        </div>
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
        <div className="relative">
          <input
            type="email"
            name="email"
            className="w-full rounded-md border border-amber-200 p-3 !pl-10 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            placeholder="Enter your email address"
            value={form.email}
            onChange={(e) => updateForm('email', e.target.value)}
            required
            disabled={loading}
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
            value={form.password}
            onChange={(e) => updateForm('password', e.target.value)}
            required
            disabled={loading}
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

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">Confirm Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            className="w-full rounded-md border border-amber-200 p-3 !pl-10 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={(e) => updateForm('confirmPassword', e.target.value)}
            required
            disabled={loading}
          />
          <Lock className="absolute top-4 left-3 h-5 w-5 text-amber-500" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="text-md flex w-full items-center justify-center rounded-lg bg-amber-600 py-3 font-medium text-white transition-colors hover:bg-amber-700 disabled:bg-amber-300"
      >
        {loading ? (
          <>
            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
