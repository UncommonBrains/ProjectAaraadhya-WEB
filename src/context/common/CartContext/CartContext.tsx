import { createContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { Cart, CartItem } from '../../../models/entities/Cart';
import { useAuth } from '../../../hooks/useAuth';
import { cartService } from '../../../services/cartService';
import { poojaService } from '../../../services/poojaService';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  fetchCart: (uid?: string) => Promise<void>;
  addToCart: (cartItem: CartItem) => Promise<void>;
  removeFromCart: (itemId?: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { firebaseUser } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async (uid?: string) => {
    if (!uid) return;

    setLoading(true);
    setError(null);
    try {
      const cartItems = await cartService(uid).query([], {
        field: 'createdAt',
        direction: 'desc',
      });

      const cart = await Promise.all(
        cartItems.map(async (doc) => {
          const poojaDetails = await poojaService.getById(doc.poojaId);
          return { ...doc, poojaDetails };
        }),
      );

      setCart({
        items: cart as Array<CartItem>,
        totalPrice: cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2),
      });
    } catch (err) {
      setError('Failed to fetch cart data');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = async (cartItem: CartItem) => {
    if (!firebaseUser?.uid) return;

    setLoading(true);
    setError(null);
    try {
      await cartService(firebaseUser.uid).create(cartItem);
      // Refresh cart after adding item
      await fetchCart(firebaseUser.uid);
    } catch (err) {
      setError('Failed to update cart');
      console.error('Error adding to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId?: string) => {
    if (!firebaseUser?.uid || !itemId) return;

    setLoading(true);
    setError(null);
    try {
      await cartService(firebaseUser.uid).delete(itemId);
      // Refresh cart after removing item
      await fetchCart(firebaseUser.uid);
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error('Error removing from cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!firebaseUser?.uid) return;

    setLoading(true);
    setError(null);
    try {
      // Get all cart items first
      const cartItems = await cartService(firebaseUser.uid).query([]);
      
      // Delete each item individually
      await Promise.all(
        cartItems.map(item => cartService(firebaseUser.uid).delete(item.id))
      );
      
      // Update local state immediately for better UX
      setCart({
        items: [],
        totalPrice: '0.00',
      });
    } catch (err) {
      setError('Failed to clear cart');
      console.error('Error clearing cart:', err);
      // If clearing failed, refresh cart to get current state
      await fetchCart(firebaseUser.uid);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (firebaseUser?.uid) {
      fetchCart(firebaseUser.uid);
    } else {
      // Reset cart when user logs out
      setCart(null);
    }
  }, [fetchCart, firebaseUser]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        fetchCart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};