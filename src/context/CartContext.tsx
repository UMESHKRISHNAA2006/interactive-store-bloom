
import React, { createContext, useContext, useReducer } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: { id: string; name: string; price: number; image: string } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

type CartContextType = {
  cartState: CartState;
  addToCart: (item: { id: string; name: string; price: number; image: string }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const calculateTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  return { totalItems, totalPrice };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id, name, price, image } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        
        const { totalItems, totalPrice } = calculateTotals(updatedItems);
        
        return {
          ...state,
          items: updatedItems,
          totalItems,
          totalPrice,
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          id,
          name,
          price,
          image,
          quantity: 1,
        };
        
        const updatedItems = [...state.items, newItem];
        const { totalItems, totalPrice } = calculateTotals(updatedItems);
        
        return {
          ...state,
          items: updatedItems,
          totalItems,
          totalPrice,
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      const { totalItems, totalPrice } = calculateTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // If quantity is 0 or negative, remove the item
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id } });
      }
      
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      const { totalItems, totalPrice } = calculateTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  
  const addToCart = (item: { id: string; name: string; price: number; image: string }) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  
  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const value: CartContextType = {
    cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
