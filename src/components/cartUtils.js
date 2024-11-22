// Utilidades para manejar carritos personalizados por usuario
const CART_KEYS = {
  predefined: "predefinedCakesCart",
  custom: "customCakesCart",
};

// Obtiene el carrito desde localStorage para un usuario específico
export const getCart = (cartType, username) => {
  if (typeof window !== "undefined" && username) {
    const userCart = JSON.parse(localStorage.getItem(`${username}_${CART_KEYS[cartType]}`)) || [];
    return userCart;
  }
  return [];
};

// Agrega un ítem al carrito de un usuario específico
export const addToCart = (cartType, username, item) => {
  if (!username) return; // Aseguramos que hay un usuario válido
  const currentCart = getCart(cartType, username);
  const updatedCart = [...currentCart, item];
  localStorage.setItem(`${username}_${CART_KEYS[cartType]}`, JSON.stringify(updatedCart));
};


// Limpia el carrito de un usuario específico
export const clearCart = (cartType, username) => {
  if (username) {
    localStorage.setItem(`${username}_${CART_KEYS[cartType]}`, JSON.stringify([]));
  }
};

// Elimina un ítem específico del carrito de un usuario
export const removeFromCart = (cartType, username, itemId) => {
  if (!username) return;
  const currentCart = getCart(cartType, username);
  const updatedCart = currentCart.filter((_, index) => index !== itemId);
  localStorage.setItem(`${username}_${CART_KEYS[cartType]}`, JSON.stringify(updatedCart));
};
