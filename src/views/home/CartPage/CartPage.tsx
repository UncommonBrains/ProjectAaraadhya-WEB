import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CartBox from './CartBox';

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-amber-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center text-amber-900"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            <span>Go Back</span>
          </div>
        </div>
      </header>

      <main className="flex flex-1">
        <div className="container mx-auto flex flex-1 p-4">
          <CartBox />
        </div>
      </main>
    </div>
  );
};

export default CartPage;
