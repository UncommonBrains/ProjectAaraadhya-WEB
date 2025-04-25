import { AlertTriangle } from 'lucide-react';

function NotFound() {
  return (
    <div className="bg-opacity-75 fixed inset-0 flex flex-col items-center justify-center gap-4 bg-amber-50">
      <AlertTriangle size={72} className="text-amber-500" />
      <h1 className="font-serif text-6xl font-bold text-amber-500"> 404: Page Not Found </h1>
    </div>
  );
}

export default NotFound;
