import React from 'react';
import { AlertTriangle } from 'lucide-react';

function NotFound() {
  return (
    <div className="fixed inset-0 bg-amber-50 bg-opacity-75 flex flex-col gap-4 items-center justify-center">
      <AlertTriangle size={72} className="text-amber-500" />
      <h1 className="text-6xl font-serif text-amber-500 font-bold" > 404: Page Not Found </h1>
    </div>
  );
}

export default NotFound;
