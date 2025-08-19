import React, { useState } from 'react';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CartBox from './CartBox';
import { useCart } from '../../../hooks/useCart';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearCart = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    clearCart();
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-amber-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center text-amber-900 hover:text-amber-700 transition-colors"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            <span>Go Back</span>
          </div>
          
          {(cart?.items ?? []).length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center rounded-lg border border-red-200 bg-white px-3 py-2 text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Clear Cart
            </button>
          )}
        </div>
      </header>

      <main className="flex flex-1">
        <div className="container mx-auto p-4">
          <CartBox />
        </div>
      </main>

      {/* Enhanced Custom Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">

          <div className="bg-white rounded-lg shadow-xl p-6 w-80 mx-4">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-red-100 p-2 mr-3">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Clear Cart</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove all items from your cart? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;