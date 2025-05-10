import { ArrowRight, ShoppingCart, X } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CartItem } from '../PoojaBooking/types';

const CartBox: React.FC = () => {
  const cartItems: CartItem[] = [];

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-1 flex-col rounded-lg border border-amber-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg text-amber-900">Your Cart</h3>
        <span className="rounded-full bg-amber-100 px-2 py-1 text-sm text-amber-900">
          {cartItems.length} items
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <ShoppingCart className="mx-auto mb-2 h-12 w-12 text-amber-300" />
            <p className="text-gray-600">Your cart is empty</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex-1 space-y-3 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg bg-amber-50 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-amber-900">{item.name}</p>
                  <p className="text-xs text-gray-600">
                    For: {item.bookingDetails.name}
                    {item.bookingDetails.additionalMembers.length > 0 &&
                      ` +${item.bookingDetails.additionalMembers.length}`}
                  </p>
                  {item.additionalMembersCount > 0 && (
                    <p className="text-xs text-amber-700">
                      Base: ₹{item.basePrice} + {item.additionalMembersCount} members
                    </p>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="mr-2 font-medium text-amber-900">₹{item.price}</span>
                  <button className="rounded-full bg-amber-100 p-1 text-amber-900">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-amber-200 pt-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-gray-700">Total Amount</span>
              <span className="text-lg font-medium text-amber-900">₹{totalAmount}</span>
            </div>

            <NavLink
              to="/checkout"
              className="flex w-full items-center justify-center rounded-lg bg-amber-600 px-4 py-3 font-medium text-white"
            >
              Proceed to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default CartBox;
