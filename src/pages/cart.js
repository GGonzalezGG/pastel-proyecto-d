import { getCart, removeFromCart } from "@/components/cartUtils";
import { useState, useContext, useEffect } from "react";
import { useAuth } from '../app/context/AuthContext';
import Link from "next/link";
import { LanguageContext } from '@/context/languageContext';

const CartPage = () => {
  const { t } = useContext(LanguageContext);
  const { user } = useAuth();
  const username = user?.username;

  const [predefinedCart, setPredefinedCart] = useState([]);
  const [customCart, setCustomCart] = useState([]);

  useEffect(() => {
    if (username) {
      setPredefinedCart(getCart("predefined", username));
      setCustomCart(getCart("custom", username));
    }
  }, [username]);

  const handleRemoveItem = (cartType, itemId) => {
    removeFromCart(cartType, username, itemId);
    if (cartType === "predefined") {
      setPredefinedCart(getCart("predefined", username));
    } else {
      setCustomCart(getCart("custom", username));
    }
  };

  if (!username) {
    return <p>{t("login_to_view_cart")}</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {/* Predefined Cakes */}
      <section>
        <h3 className="text-xl font-semibold">Predefined Cakes</h3>
        {predefinedCart.length ? (
          <ul>
            {predefinedCart.map((cake, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <div>
                <span className="font-medium">{cake.name}</span>: {Array.isArray(cake.ingredients) 
                  ? cake.ingredients.reduce((acc, curr, idx) => acc + (idx > 0 ? ", " : "") + curr, "") : "No ingredients available"}
                </div>
                <button
                  onClick={() => handleRemoveItem("predefined", index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No predefined cakes in your cart.</p>
        )}
      </section>

      {/* Customized Cakes */}
      <section className="mt-6">
        <h3 className="text-xl font-semibold">Customized Cakes</h3>
        {customCart.length ? (
          <ul>
            {customCart.map((cake, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-medium">Shape:</span> {cake.shape},{" "}
                  <span className="font-medium">Size:</span> {cake.size},{" "}
                  <span className="font-medium">Toppings:</span> {cake.toppings.join(", ")},{" "}
                  <span className="font-medium">Fillings:</span> {cake.fillings.join(", ")}
                </div>
                <button
                  onClick={() => handleRemoveItem("custom", index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No customized cakes in your cart.</p>
        )}
      </section>
      <Link href="/" className="w-full">
        <div className="flex justify-center mt-6">
          <button className="font-medium text-white bg-blue-600 text-stone-900 py-3 px-4 rounded-lg hover:bg-red-600 hover:text-gray-50 transition-colors">
            {t("home")}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default CartPage;


