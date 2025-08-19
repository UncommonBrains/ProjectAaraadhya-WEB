import React, { useState } from 'react';
import { ArrowRight, ShoppingCart, X, Trash2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useCart } from '../../../hooks/useCart';

const CartBox: React.FC = () => {
  const { cart, loading, removeFromCart, clearCart } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearCartClick = () => {
    setShowClearConfirm(true);
  };

  const handleConfirmClear = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  const handleCancelClear = () => {
    setShowClearConfirm(false);
  };

  return (
    <>
      <div className="flex flex-1 flex-col rounded-lg border border-amber-200 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-lg text-amber-900">Your Cart</h3>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-2 py-1 text-sm text-amber-900">
              {cart?.items.length} items
            </span>
            {(cart?.items?.length ?? 0) > 0 && (
              <button
                onClick={handleClearCartClick}
                className="rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200 transition-colors"
                title="Clear entire cart"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <LoadingSpinner />
            </div>
          </div>
        ) : cart?.items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <ShoppingCart className="mx-auto mb-2 h-12 w-12 text-amber-300" />
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex-1 space-y-3 overflow-y-auto">
              {cart?.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-amber-50 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-amber-900">{item.poojaDetails?.name}</p>
                    <p className="text-xs text-gray-600">
                      For: {item.name}
                      {item.members.length > 0 && ` +${item.members.length}`}
                    </p>
                    {item.members.length > 0 && (
                      <p className="text-xs text-amber-700">
                        Base: ₹{item.poojaPrice} + {item.members.length} members
                      </p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 font-medium text-amber-900">₹{item.price}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full bg-amber-100 p-1 text-amber-900 hover:bg-amber-200 transition-colors"
                      title="Remove item"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-amber-200 pt-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-gray-700">Total Amount</span>
                <span className="text-lg font-medium text-amber-900">₹{cart?.totalPrice}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleClearCartClick}
                  className="flex items-center justify-center rounded-lg border border-red-200 bg-white px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Clear Cart
                </button>
                
                <NavLink
                  to={`/checkout/${cart?.items[0].templeId}`}
                  className="flex flex-1 items-center justify-center rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700 transition-colors"
                >
                  Proceed to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NavLink>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Custom Clear Cart Confirmation Modal */}
      {showClearConfirm && (
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
                onClick={handleCancelClear}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClear}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartBox;