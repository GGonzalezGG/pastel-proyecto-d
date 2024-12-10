import { useState, useEffect, useContext } from "react";
import "@/styles/globals.css";
import { LanguageContext } from "@/context/languageContext";

const FeaturedFlavors = () => {
  const { t } = useContext(LanguageContext);
  const flavors = t("flavors");

  const [currentFlavor, setCurrentFlavor] = useState(0);
  const [animation, setAnimation] = useState("fadeIn_Flavor"); // Controla la animación activa

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation("fadeOut_Flavor"); // Comienza el fade-out
      setTimeout(() => {
        setCurrentFlavor((prev) => (prev + 1) % flavors.length); // Cambia el sabor
        setAnimation("fade-in"); // Comienza el fade-in después de cambiar
      }, 500); // Sincroniza con la duración del fade-out
    }, 4000); // Cambia cada 4 segundos
    return () => clearInterval(interval);
  }, [flavors.length]);

  return (
    <div className="container_flavor bg-gray-500 bg-opacity-25 rounded-xl my-6">
      <h2 className="text-2xl">{t("featuredFlavors")}{" "}</h2>
      <h2 className={` ${animation}`}>
        <span className="flavors-highlight text-xl py-2" >{flavors[currentFlavor]}</span>
      </h2>
    </div>
  );
};

export default FeaturedFlavors;



