import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';

const FailurePage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 text-center shadow-md">
        <XCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Payment Failed</h1>
        <p className="mb-6 text-gray-600">
          Unfortunately, we were unable to process your payment. This could be due to a network
          issue or if you cancelled the transaction. Please try again.
        </p>
        <Link
          to="/checkout"
          className="inline-flex items-center justify-center rounded-md bg-gray-700 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>Try Again</span>
        </Link>
      </div>
    </div>
  );
};

export default FailurePage;
