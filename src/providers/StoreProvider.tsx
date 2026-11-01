import React, { ReactNode } from 'react';
import { create } from 'zustand';
import { Product } from '../types/cart.types';
import { persist } from 'zustand/middleware';
import { CartState, CartActions } from '../types/cart.types'; // Need to define types first

// Initialize Zustand store
export const useStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      // Initial State (will be loaded from localStorage if present)
      cart: [],
      // Actions (e.g., addItem, removeItem, updateQuantity)
      addItem: (product: Product, quantity: number) => {
    const existingItem = get().cart.find(item => item.productId === product.id);
    
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity <= product.stock) {
        set(state => ({
          cart: state.cart.map(item => 
            item.productId === product.id ? { ...item, quantity: newQuantity } : item
          ),
        }));
      } else {
        console.warn('Cannot add: Exceeds stock limit.');
      }
    } else {
      if (quantity <= product.stock) {
        set(state => ({
          cart: [...state.cart, { productId: product.id, product: product, quantity }],
        }));
      } else {
        console.warn('Cannot add: Exceeds stock limit.');
      }
    }
  },
      removeItem: (itemId: string) => {
        set(state => ({
          cart: state.cart.filter(item => item.productId !== itemId),
        }));
      },
      updateQuantity: (itemId: string, quantity: number) => {
        set(state => ({
          cart: state.cart.map(item => 
            item.productId === itemId ? { ...item, quantity: quantity } : item
          ).filter(item => item.quantity > 0), // Remove if quantity drops to 0 or less
        }));
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'kapit-bahay-cart', // Name for localStorage
      // Safety: Ensure malformed data is handled by default Zustand behavior, or implement a custom deserializer.
    }
  )
);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  // State logic and cart functions are available via useStore
  return <>{children}</>;
};