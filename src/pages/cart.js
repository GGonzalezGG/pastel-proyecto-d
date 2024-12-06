import { getCart, removeFromCart } from "@/components/cartUtils";
import { useState, useContext, useEffect } from "react";
import { useAuth } from '../app/context/AuthContext';
import Link from "next/link";
import { LanguageContext } from '@/context/languageContext';
import Image from "next/image";

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
    return( 
      <div className="p-6 sm:p-8 lg:p-10 min-h-screen" style={{ 
        backgroundImage: "url('/cake_cart2.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat' }}>
        <p className="text-center text-lg">{t("login_to_view_cart")}</p>
          <Link href="/" passHref>
            <div className="flex justify-center mt-6">
              <button className="font-medium bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
                {t("home")}
              </button>
            </div>
          </Link>
      </div>)
  }

  return (
    <div className=" p-6 sm:p-8 lg:p-10 min-h-screen" style={{ 
      backgroundImage: "url('/cake_cart2.jpg')", 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}> 
      <div >
        <h1 className=" flex flex-col items-center text-2xl font-bold m-6 bg-gray-800 bg-opacity-75 rounded-xl p-2">{t("cart")}</h1>
      </div>

      {/* Predefined Cakes */}
      <section className="mb-8 text-black">
        <h3 className="text-xl text-center font-semibold mb-4 text-white bg-gray-800 bg-opacity-75 rounded-xl p-2">{t("predefined_cakes")}</h3>
        {predefinedCart.length ? (
          <ul className="space-y-4">
            {predefinedCart.map((cake, index) => (
              <li key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div>
                  <span className="font-medium text-lg">{t(cake.name)}</span>: {Array.isArray(cake.ingredients)
                    ? cake.ingredients.reduce((acc, curr, idx) => acc + (idx > 0 ? ", " : "") + t(curr), "") 
                    : "No ingredients available"}
                  <div><span className="font-medium"></span> {t("shape")}: {t(cake.shape)}</div>
                  <div><span className="font-medium"></span> {t("size")}: {t(cake.size)}</div>
                </div>
                <button
                  onClick={() => handleRemoveItem("predefined", index)}
                  className="text-white hover:bg-red-700 text-sm font-medium bg-red-600 rounded-xl p-2"
                >
                  {t("remove")}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="bg-white text-black p-2 rounded-xl text-center py-4">{t("no_predefined_cakes")}</p>
        )}
      </section>

      {/* Customized Cakes */}
      <section className="text-black">
        <h3 className="text-xl text-center font-semibold mb-4 text-white bg-gray-800 bg-opacity-75 rounded-xl p-2">{t("customized_cakes")}</h3>
        {customCart.length ? (
          <ul className="space-y-4">
            {customCart.map((cake, index) => (
              <li key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="space-y-1">
                  <div><span className="font-medium"></span> {t("shape")}: {t(cake.shape)}</div>
                  <div><span className="font-medium"></span> {t("size")}: {cake.size}</div>
                  <div><span className="font-medium"></span> {t("toppings")}: {cake.toppings.join(", ")}</div>
                  <div><span className="font-medium"></span> {t("fillings")}: {cake.fillings.join(", ")}</div>
                </div>
                <button
                  onClick={() => handleRemoveItem("custom", index)}
                  className="text-white hover:bg-red-700 text-sm font-medium bg-red-600 rounded-xl p-2"
                >
                  {t("remove")}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="bg-white text-black p-2 rounded-xl text-center py-4">{t("no_customized_cakes")}</p>
        )}
      </section>

      <Link href="/" passHref>
        <div className="flex justify-center mt-6">
          <button className="font-medium bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
            {t("home")}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default CartPage;


