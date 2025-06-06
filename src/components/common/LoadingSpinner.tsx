import React from 'react';

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-orange-500"></div>
      <p className="font-serif text-amber-900">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
