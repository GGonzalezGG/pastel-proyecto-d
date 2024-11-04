'use client';
import { createContext, useContext, useState } from 'react';

const translations = {
    es: { 
        welcome: "Bienvenido", 
        store: "Tienda", 
        locations: "Locales", 
        contact: "Contacto", 
        customize: "Personaliza tu pedido", 
        login: "Iniciar Sesión", 
        register: "Registrarse", 
        language: "Idioma", 
        spanish: "Español", 
        english: "Inglés", 
        french: "Francés", 
        german: "Alemán",
        signIn: "Iniciar sesión",
        registerPage: "Página de Registro",
        username: "Nombre de usuario",
        password: "Contraseña",
        home: "Inicio",
        registrationSuccessful: "¡Registro exitoso!",
        registrationFailed: "El registro falló",
        loginError: "Ocurrió un error en el inicio de sesión",
        invalidCredentials: "Credenciales inválidas",
        signInButton: "Iniciar Sesión",
        registerButton: "Registrar",
        locations: "Localizaciones",
        serves: "Sirve",
        yourSelection: "Tu selección",
        noItemsSelected: "No hay elementos seleccionados",
        backToShop: "Volver a la tienda",
        addToCart: "Añadir al carrito"
    },
    en: { 
        welcome: "Welcome", 
        store: "Store", 
        locations: "Locations", 
        contact: "Contact", 
        customize: "Customize your order", 
        login: "Login", 
        register: "Register", 
        language: "Language", 
        spanish: "Spanish", 
        english: "English", 
        french: "French", 
        german: "German" ,
        signIn: "Sign In",
        registerPage: "Register Page",
        username: "Username",
        password: "Password",
        home: "Home",
        registrationSuccessful: "Registration successful!",
        registrationFailed: "Registration failed",
        loginError: "An error occurred during login",
        invalidCredentials: "Invalid credentials",
        signInButton: "Sign In",
        registerButton: "Register",
        locations: "Locations",
        serves: "Serves",
        yourSelection: "Your Selection",
        noItemsSelected: "No items selected yet",
        backToShop: "Back to shop",
        addToCart: "Add to cart"
    },
    fr: { 
        welcome: "Bienvenue", 
        store: "Boutique", 
        locations: "Emplacements", 
        contact: "Contact", 
        customize: "Personnalisez votre commande", 
        login: "Connexion", 
        register: "S'inscrire", 
        language: "Langue", 
        spanish: "Espagnol", 
        english: "Anglais", 
        french: "Français", 
        german: "Allemand",
        signIn: "Se connecter",
        registerPage: "Page d'inscription",
        username: "Nom d'utilisateur",
        password: "Mot de passe",
        home: "Accueil",
        registrationSuccessful: "Inscription réussie !",
        registrationFailed: "Échec de l'inscription",
        loginError: "Une erreur s'est produite lors de la connexion",
        invalidCredentials: "Identifiants invalides",
        signInButton: "Se connecter",
        registerButton: "S'inscrire",
        locations: "Emplacements"
    },
    de: { 
        welcome: "Willkommen", 
        store: "Geschäft", 
        locations: "Standorte", 
        contact: "Kontakt", 
        customize: "Bestellung anpassen", 
        login: "Anmelden", 
        register: "Registrieren", 
        language: "Sprache", 
        spanish: "Spanisch", 
        english: "Englisch", 
        french: "Französisch", 
        german: "Deutsch",
        signIn: "Anmelden",
        registerPage: "Registrierungsseite",
        username: "Benutzername",
        password: "Passwort",
        home: "Startseite",
        registrationSuccessful: "Registrierung erfolgreich!",
        registrationFailed: "Registrierung fehlgeschlagen",
        loginError: "Bei der Anmeldung ist ein Fehler aufgetreten",
        invalidCredentials: "Ungültige Anmeldeinformationen",
        signInButton: "Anmelden",
        registerButton: "Registrieren",
        locations: "Standorte"
    },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}