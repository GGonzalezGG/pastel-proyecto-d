"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import { LanguageContext } from '@/context/languageContext';
import Link from "next/link";

const predefinedCakes = [
  {
    id: 1,
    name: "Chocolate Delight",
    image: "/cake_register.jpg",
    ingredients: ["Chocolate sponge", "Ganache", "Chocolate chips"],
  },
  {
    id: 2,
    name: "Strawberry Heaven",
    image: "/cake_login.jpg",
    ingredients: ["Vanilla sponge", "Strawberry jam", "Fresh strawberries"],
  },
  {
    id: 3,
    name: "Vanilla Dream",
    image: "/cake_tienda.jpg",
    ingredients: ["Vanilla sponge", "Buttercream frosting", "Sprinkles"],
  },
];

const CakeSelectionPage = () => {
  const { t } = useContext(LanguageContext);
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

  return (
    <div className="min-h-screen bg-blue-100 p-6 text-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-4xl">
          {t("chooseYourCake")}
        </h2>

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
                alt={t(cake.name)}
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
                  {t(ingredient)}
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
                      {t(shape)}
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
                      {t(size)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              disabled={!formOptions.shape || !formOptions.size}
            >
              {t("addToCart")}
            </button>
          </div>
        )}
      </div>
      <Link href="/" className="w-full">
                  <button 
                  className=" font-medium text-white mt-6 bg-blue-600 text-stone-900 py-3 px-4 rounded-lg hover:bg-red-600 hover:text-gray-50 transition-colors">
                  Back to shop
                </button>
                </Link>
    </div>
  );
};

export default CakeSelectionPage;
