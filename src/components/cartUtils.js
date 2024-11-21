// cartUtils.js
const CART_KEYS = {
    predefined: "predefinedCakesCart",
    custom: "customCakesCart",
  };
  
  // Obtiene el carrito desde localStorage
  export const getCart = (cartType) => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(CART_KEYS[cartType])) || [];
    }
    return [];
  };
  
  // Agrega un ítem al carrito
  export const addToCart = (cartType, item) => {
    const currentCart = getCart(cartType);
    const updatedCart = [...currentCart, item];
    localStorage.setItem(CART_KEYS[cartType], JSON.stringify(updatedCart));
  };
  
  // Limpia el carrito
  export const clearCart = (cartType) => {
    localStorage.setItem(CART_KEYS[cartType], JSON.stringify([]));
  };
  
  // Elimina un ítem específico del carrito
  export const removeFromCart = (cartType, itemId) => {
    const currentCart = getCart(cartType);
    const updatedCart = currentCart.filter((item, index) => index !== itemId); // Elimina por índice
    localStorage.setItem(CART_KEYS[cartType], JSON.stringify(updatedCart));
  };
  