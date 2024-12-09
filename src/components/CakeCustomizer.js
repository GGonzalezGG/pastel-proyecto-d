"use client";
import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, X } from 'lucide-react';
import cakeOptions from './cakeOptions.json';
import { addToCart } from "@/components/cartUtils";
import { useAuth } from '../app/context/AuthContext';
import { LanguageContext } from '@/context/languageContext';

const CakeCustomizer = () => {
  const { language, t } = useContext(LanguageContext);  
  const { user } = useAuth();
  const username = user?.username; 
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddToCart = () => {
    setShowConfirmation(true);
  
    const cartItem = {
      shape: selections.shape,
      size: selections.size,
      toppings: selections.toppings,
      fillings: selections.fillings,
    };
  
    addToCart("custom", username, cartItem); 
  
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  const [selections, setSelections] = useState({
    shape: '',
    size: '',
    toppings: [],
    fillings: []
  });

  const [openCategory, setOpenCategory] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(null);

  const getTranslation = (item, translationPath) => {
    // Helper function to get translation, falling back to English or the item itself
    if (typeof item === 'object' && item.translations) {
      return item.translations[language] || item.translations['en'] || item;
    }
    if (translationPath && translationPath.translations) {
      return translationPath.translations[language] || translationPath.translations['en'] || translationPath;
    }
    return item;
  };

  const handleSelection = (category, item) => {
    if (cakeOptions[category].type === 'single') {
      setSelections(prev => ({
        ...prev,
        [category]: prev[category] === item ? '' : item
      }));
    } else {
      setSelections(prev => ({
        ...prev,
        [category]: prev[category].includes(item)
          ? prev[category].filter(i => i !== item)
          : [...prev[category], item]
      }));
    }
  };

  const SingleChoiceSection = ({ category, categoryData }) => (
    <div className="mb-6">
      <h3 className="font-semibold mb-3 md:text-lg">
        {getTranslation(categoryData.name, { translations: categoryData.name })}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:text-base">
        {(categoryData.options || []).map((option) => {
          const displayName = category === 'size' 
            ? getTranslation(option.name, { translations: option.name }) 
            : getTranslation(option, option);
          
          const isSelected = category === 'size' 
            ? selections[category] === displayName 
            : selections[category] === displayName;
          
          return (
            <button
              key={displayName}
              onClick={() => handleSelection(category, displayName)}
              className={`
                p-4 rounded-lg border-2 transition-all h-full
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-blue-200'
                }
              `}
            >
              {category === 'size' ? (
                <div className="text-left">
                  <div className="font-medium">{displayName}</div>
                  <div className="text-sm text-gray-500 md:text-base">
                    {t("Serves")}: {option.servings} {t("people")}
                  </div>
                </div>
              ) : (
                <div className="font-medium">{displayName}</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const CategoryDropdown = ({ mainCategory, categoryData }) => {
    if (categoryData.type === 'single') {
      return <SingleChoiceSection category={mainCategory} categoryData={categoryData} />;
    }

    const isOpen = openCategory === mainCategory;

    return (
      <div className="mb-6">
        <button
          onClick={() => setOpenCategory(isOpen ? null : mainCategory)}
          className="w-full flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold md:text-lg">
            {getTranslation(categoryData.name, { translations: categoryData.name })}
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(categoryData.categories).map(([subKey, subCategory]) => (
              <SubcategorySection
                key={subKey}
                mainCategory={mainCategory}
                subKey={subKey}
                subCategory={subCategory}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const SubcategorySection = ({ mainCategory, subKey, subCategory }) => {
    const isOpen = openSubcategory === `${mainCategory}-${subKey}`;

    return (
      <div className="ml-4">
        <button
          onClick={() => setOpenSubcategory(isOpen ? null : `${mainCategory}-${subKey}`)}
          className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium">
            {getTranslation(subCategory.name, { translations: subCategory.name })}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="mt-1 ml-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
            {subCategory.options.map((option) => {
              const displayName = getTranslation(option, option);
              return (
                <button
                  key={displayName}
                  onClick={() => handleSelection(mainCategory, displayName)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span>{displayName}</span>
                  {selections[mainCategory].includes(displayName) ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : null}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const SelectedItems = ({ category, selection }) => {
    if (!selection || (Array.isArray(selection) && selection.length === 0)) return null;

    return (
      <div className="mb-3">
        <h4 className="font-medium text-sm text-gray-600 mb-2 md:text-lg">
          {getTranslation(cakeOptions[category].name, { translations: cakeOptions[category].name })}:
        </h4>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(selection) ? (
            selection.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-base md:text-lg"
              >
                {item}
                <button
                  onClick={() => handleSelection(category, item)}
                  className="hover:text-blue-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-base md:text-lg">
              {selection}
              <button
                onClick={() => handleSelection(category, selection)}
                className="hover:text-blue-900"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 text-blue-600">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left md:text-4xl">{t("CustomCake")}</h2>

        {showConfirmation && (
        <div className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-transform transform animate-bounce">
          {t("itemAdded")}
        </div>)}
        
        <div className="mb-4 flex justify-end">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Customization panel */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6 lg:mb-0 md:flex-wrap-reverse">
              {Object.entries(cakeOptions).map(([category, categoryData]) => (
                <CategoryDropdown
                  key={category}
                  mainCategory={category}
                  categoryData={categoryData}
                />
              ))}
            </div>
          </div>

          {/* Selected ingredients display */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
              <h3 className="font-semibold mb-4 text-lg md:text-xl">{t("yourSelect")}</h3>
              {Object.entries(selections).map(([category, selection]) => (
                <SelectedItems key={category} category={category} selection={selection} />
              ))}
              {Object.values(selections).every(val => !val || (Array.isArray(val) && val.length === 0)) && (
                <p className="text-gray-500 text-base md:text-lg">{t("noItems")}</p>
              )}
              
              <div className="md:flex">
                <Link href="/" className="w-full">
                  <button 
                  className="w-full font-medium mt-6 bg-gray-100 text-stone-900 py-3 px-4 rounded-lg hover:bg-red-600 hover:text-gray-50 transition-colors">
                  {t("home")}
                </button>
                </Link>
              
                <button className="w-full font-medium mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
                  onClick={handleAddToCart} disabled={!selections.size || !selections.shape}>
                    {t("AddToCart")}
                </button>
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeCustomizer;