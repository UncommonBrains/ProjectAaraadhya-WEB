import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const SuccessPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 text-center shadow-md">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="mb-6 text-gray-600">
          Thank you for your booking. Your payment has been processed successfully. A confirmation
          has been sent to your email.
        </p>
        <Link
          to="/my-bookings"
          className="inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600"
        >
          <span>View My Bookings</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
