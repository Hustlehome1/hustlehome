"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "@/lib/products";

const STORAGE_KEY = "hustlehome-cart";

export type CartLine = { product: Product; quantity: number };

type CartState = {
  quantities: Record<string, number>;
  isOpen: boolean;
  isHydrated: boolean;
};

type CartAction =
  | { type: "HYDRATE"; quantities: Record<string, number> }
  | { type: "ADD"; id: string }
  | { type: "INCREMENT"; id: string }
  | { type: "DECREMENT"; id: string }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, quantities: action.quantities, isHydrated: true };
    case "ADD":
    case "INCREMENT": {
      const current = state.quantities[action.id] ?? 0;
      return { ...state, quantities: { ...state.quantities, [action.id]: current + 1 } };
    }
    case "DECREMENT": {
      const current = state.quantities[action.id] ?? 0;
      const next = current - 1;
      const quantities = { ...state.quantities };
      if (next <= 0) delete quantities[action.id];
      else quantities[action.id] = next;
      return { ...state, quantities };
    }
    case "REMOVE": {
      const quantities = { ...state.quantities };
      delete quantities[action.id];
      return { ...state, quantities };
    }
    case "CLEAR":
      return { ...state, quantities: {} };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartLine[];
  count: number;
  subtotalCents: number;
  isOpen: boolean;
  isHydrated: boolean;
  addItem: (id: string) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    quantities: {},
    isOpen: false,
    isHydrated: false,
  });

  // Hydrate from localStorage after mount so server and first client render
  // match (both start empty) — avoids a hydration mismatch. Always dispatch
  // (even with an empty object) so isHydrated flips to true once this read
  // has actually happened, whether or not anything was stored.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      dispatch({ type: "HYDRATE", quantities: raw ? JSON.parse(raw) : {} });
    } catch {
      dispatch({ type: "HYDRATE", quantities: {} });
    }
  }, []);

  // Guarded on isHydrated: without this, this effect's first run (on mount,
  // same commit as the hydrate effect above) fires with the pre-hydration
  // {} state and overwrites whatever was actually in localStorage before
  // the hydrate dispatch's re-render has landed — silently wiping the cart
  // on every fresh page load.
  useEffect(() => {
    if (!state.isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.quantities));
    } catch {
      // storage unavailable — cart just won't persist across refreshes
    }
  }, [state.quantities, state.isHydrated]);

  const items = useMemo<CartLine[]>(() => {
    return Object.entries(state.quantities)
      .map(([id, quantity]) => {
        const product = PRODUCTS.find((p) => p.id === id);
        return product ? { product, quantity } : null;
      })
      .filter((line): line is CartLine => line !== null);
  }, [state.quantities]);

  const count = useMemo(() => items.reduce((sum, line) => sum + line.quantity, 0), [items]);
  // Integer cents in, integer cents out — summing whole numbers keeps this
  // exact, no floating-point drift from adding euro decimals.
  const subtotalCents = useMemo(
    () => items.reduce((sum, line) => sum + line.product.priceCents * line.quantity, 0),
    [items]
  );

  const addItem = useCallback((id: string) => dispatch({ type: "ADD", id }), []);
  const incrementItem = useCallback((id: string) => dispatch({ type: "INCREMENT", id }), []);
  const decrementItem = useCallback((id: string) => dispatch({ type: "DECREMENT", id }), []);
  const removeItem = useCallback((id: string) => dispatch({ type: "REMOVE", id }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE" }), []);

  const value: CartContextValue = {
    items,
    count,
    subtotalCents,
    isOpen: state.isOpen,
    isHydrated: state.isHydrated,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

// Prefer this over useCart() anywhere the cart is read for display. It's
// the same value, but naming it this way is a reminder that `items` is
// meaningless until `isHydrated` is true — check that first, or the
// localStorage-hydration race this hook exists to prevent will just come
// back the next time someone reads the cart during initial render.
export function useHydratedCart() {
  return useCart();
}
