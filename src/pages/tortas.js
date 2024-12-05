"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import { LanguageContext } from '@/context/languageContext';
import Link from "next/link";
import { addToCart } from "@/components/cartUtils";
import { useAuth } from '../app/context/AuthContext';
import Header from "@/components/header";

const predefinedCakes = [
  {
    id: 1,
    name: "chocolateDelight", // Clave de traducción
    image: "/cake_register.jpg",
    ingredients: ["Chocolatesponge", "Ganache", "Chocolatechip"], // Claves de traducción
  },
  {
    id: 2,
    name: "StrawberryHeaven", // Clave de traducción
    image: "/cake_login.jpg",
    ingredients: ["Vanillasponge", "Strawberryjam", "Freshstrawberries"], // Claves de traducción
  },
  {
    id: 3,
    name: "VanillaDream", // Clave de traducción
    image: "/cake_tienda.jpg",
    ingredients: ["Vanillasponge", "Buttercreamfrosting", "Sprinkles"], // Claves de traducción
  },
];

const CakeSelectionPage = () => {
  const { t } = useContext(LanguageContext);
  const { user } = useAuth(); // Obtenemos el usuario autenticado
  const username = user?.username; // Verificamos si el usuario está autenticado
  const [selectedCake, setSelectedCake] = useState(null);
  const [formOptions, setFormOptions] = useState({
    shape: "",
    size: "",
  });

  const handleCakeClick = (cake) => {
    setSelectedCake(cake);
    setFormOptions({ shape: "", size: "" }); // Reinicia las opciones cada vez que cambias de torta
  };

  const handleOptionChange = (field, value) => {
    setFormOptions((prev) => ({ ...prev, [field]: value }));
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddToCart = (cake) => {
    if (!username) {
      alert(t("pleaseLoginToAddToCart")); // Mensaje de advertencia si no hay usuario autenticado
      return;
    }

    const cartItem = {
      id: cake.id,
      name: cake.name,
      ingredients: cake.ingredients,
      image: cake.image
    };

    addToCart("predefined", username, cartItem); // Pasamos el nombre del usuario

    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  if (!username) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">{t("pleaseLoginToContinue")}</p>
        <Link href="/login">
          <button className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            {t("login")}
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen text-black" style={{ 
      backgroundImage: "url('/xd.jpg')", 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="pb-3">
      <Header/>
      </div>
      
      <div className="flex justify-center">      
        <h2 className="text-2xl text-white font-bold mb-6 text-center md:text-4xl bg-gray-800 bg-opacity-75 rounded-xl p-2">
          {t("chooseYourCake")}
        </h2>
      </div>
        {showConfirmation && (
          <div className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-transform transform animate-bounce">
            {t("itemAddedToCart")}
          </div>
        )}
      <div className="max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {predefinedCakes.map((cake) => (
            <button
              key={cake.id}
              className={`relative block rounded-lg overflow-hidden shadow-lg transition-transform transform ${
                selectedCake?.id === cake.id ? "scale-105 border-2 border-blue-500" : ""
              }`}
              onClick={() => handleCakeClick(cake)}
            >
              <Image
                src={cake.image}
                alt={t(cake.name)} // Traducción del nombre
                width={300}
                height={200}
                className="object-cover w-full h-48"
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-medium">{t(cake.name)}</h3>
              </div>
            </button>
          ))}
        </div>

        {selectedCake && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">{t(selectedCake.name)}</h3>
            <p className="mb-4 text-gray-600">{t("defaultIngredients")}:</p>
            <ul className="list-disc pl-6 mb-6">
              {selectedCake.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {t(ingredient)} {/* Traducción de ingredientes */}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Selección de forma */}
              <div>
                <label className="block font-medium mb-2">{t("shape")}</label>
                <div className="flex gap-4">
                  {["Circular", "Square"].map((shape) => (
                    <button
                      key={shape}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        formOptions.shape === shape
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-white border-gray-300 hover:border-blue-300"
                      }`}
                      onClick={() => handleOptionChange("shape", shape)}
                    >
                      {t(shape)} {/* Traducción de formas */}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selección de tamaño */}
              <div>
                <label className="block font-medium mb-2">{t("size")}</label>
                <div className="flex gap-4">
                  {["Small", "Medium", "Large"].map((size) => (
                    <button
                      key={size}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        formOptions.size === size
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-white border-gray-300 hover:border-blue-300"
                      }`}
                      onClick={() => handleOptionChange("size", size)}
                    >
                      {t(size)} {/* Traducción de tamaños */}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              onClick={() => handleAddToCart(selectedCake)}>
                {t("addToCart")}  
            </button>
          </div>
        )}
      </div>

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

export default CakeSelectionPage;
