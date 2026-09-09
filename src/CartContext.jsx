// src/CartContext.jsx — le "cerveau" du panier, partagé dans toute l'app
import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product, qty) {
    const quantity = qty || 1;
    setCartItems(function (prev) {
      // Vérifier si le produit est déjà dans le panier
      const existant = prev.find(function (item) {
        return item.id === product.id;
      });
      if (existant) {
        // Augmenter la quantité
        return prev.map(function (item) {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
      }
      // Ajouter le nouveau produit
      return [...prev, { ...product, quantity: quantity }];
    });
  }

  function removeFromCart(id) {
    setCartItems(function (prev) {
      return prev.filter(function (item) {
        return item.id !== id;
      });
    });
  }

  function clearCart() {
    setCartItems([]);
  }

  const nbItems = cartItems.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  const totalPrix = cartItems.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        nbItems,
        totalPrix,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart };
