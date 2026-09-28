'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, SelectedCustomization } from '@/types/product';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customization?: SelectedCustomization) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeProductModal: Product | null;
  setActiveProductModal: (product: Product | null) => void;
  totalItems: number;
  subtotal: number;
  serviceFee: number;
  tax: number;
  total: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('noir_bean_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // Local storage disabled or error
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('noir_bean_cart', JSON.stringify(cart));
      } catch {
        // ignore
      }
    }
  }, [cart, isHydrated]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const addToCart = (product: Product, quantity = 1, customization?: SelectedCustomization) => {
    let unitPrice = product.price;

    // Calculate addon costs
    if (customization?.milk?.includes('+Rp 8.000')) {
      unitPrice += 8000;
    }
    if (customization?.size?.includes('+Rp 6.000')) {
      unitPrice += 6000;
    }

    const summaryParts: string[] = [];
    if (customization?.size) summaryParts.push(customization.size.split(' ')[0]);
    if (customization?.milk) summaryParts.push(customization.milk.split(' ')[0]);
    if (customization?.sugar) summaryParts.push(customization.sugar);
    if (customization?.ice) summaryParts.push(customization.ice);

    const customizationSummary = summaryParts.length > 0 ? summaryParts.join(' · ') : 'Standard Recipe';
    const lineId = `${product.id}-${customizationSummary.replace(/\s+/g, '_')}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === lineId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: lineId,
            productId: product.id,
            name: product.name,
            price: product.price,
            unitPriceWithAddons: unitPrice,
            image: product.image,
            quantity,
            customization: customization || {},
            customizationSummary
          }
        ];
      }
    });

    showToast(`Added ${quantity}x ${product.name} to order`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.unitPriceWithAddons * item.quantity, 0);
  const serviceFee = subtotal > 0 ? 5000 : 0;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee + tax;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        activeProductModal,
        setActiveProductModal,
        totalItems,
        subtotal,
        serviceFee,
        tax,
        total,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
