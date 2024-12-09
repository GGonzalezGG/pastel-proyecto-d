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
      <section className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-600 text-white text-center py-4">
        <h3 className="text-2xl font-bold">{t("predefined_cakes")}</h3>
      </div>
        {predefinedCart.length ? (
          <ul className="p-6 space-y-4">
            {predefinedCart.map((cake, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm md:flex items-center justify-between">
                <div>
                  <div className="text-gray-800 font-bold text-xl mb-2">
                    {t(cake.name)}
                  </div>
                  <div className= "text-gray-700 text-sm mb-2">
                  <span className="font-medium">{t("ingredients")}:</span>{" "} {Array.isArray(cake.ingredients)
                      ? cake.ingredients.reduce((acc, curr, idx) => acc + (idx > 0 ? ", " : "") + t(curr), "") 
                      : "No ingredients available"}
                    <div className="text-sm"><span className="font-medium"></span> {t("shape")}: {t(cake.shape)}</div>
                    <div className="text-sm"><span className="font-medium"></span> {t("size")}: {t(cake.size)}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem("predefined", index)}
                  className="mt-4 text-white bg-red-600 hover:bg-red-700 font-medium py-2 px-4 rounded-lg md:ml-4 md:mt-0 w-full md:w-auto flex justify-center"
                >
                  {t("remove")}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="bg-white text-gray-500 p-4 text-center">{t("no_predefined_cakes")}</p>
        )}
      </section>
      <hr className="border-t-2 border-dashed border-gray-300 my-6" />
      {/* Customized Cakes */}
      <section className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-pink-500 text-white text-center py-4">
          <h3 className="text-2xl font-bold">{t("customized_cakes")}</h3>
        </div>
 
        {customCart.length ? (
          <ul className="p-6 space-y-4">
            {customCart.map((cake, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm md:flex items-center md:justify-between">
                <div>
                  <div className="text-gray-800 font-bold text-xl mb-2">
                    {t("shape")}: {t(cake.shape)}
                  </div>
                  <div className="text-gray-800 font-bold text-lg mb-4">
                    {t("size")}: {cake.size}
                  </div>
                  <div className="text-gray-700 text-sm mb-2">
                    <span className="font-medium">{t("toppings")}:</span>{" "}
                    {cake.toppings.length
                      ? cake.toppings.join(", ")
                      : t("no_toppings_available")}
                  </div>
                  <div className="text-gray-700 text-sm mb-4">
                    <span className="font-medium">{t("fillings")}:</span>{" "}
                    {cake.fillings.length
                      ? cake.fillings.join(", ")
                      : t("no_fillings_available")}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem("custom", index)}
                  className="mt-4 text-white bg-red-600 hover:bg-red-700 font-medium py-2 px-4 rounded-lg md:ml-4 md:mt-0 w-full md:w-auto flex justify-center"
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



