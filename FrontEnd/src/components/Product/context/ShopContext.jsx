import React, { createContext, useContext, useState, useEffect } from "react";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedFavorites = localStorage.getItem("favorites");
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Save to localStorage whenever cart or favorites change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [cart, favorites]);

  const addToCart = (product) => {
    if (!isInCart(product.id) && product.inStock) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const toggleFavorite = (product) => {
    if (isFavorite(product.id)) {
      setFavorites(favorites.filter(item => item.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  return (
    <ShopContext.Provider value={{ 
      cart, 
      favorites, 
      addToCart, 
      removeFromCart, 
      toggleFavorite, 
      isInCart, 
      isFavorite 
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};