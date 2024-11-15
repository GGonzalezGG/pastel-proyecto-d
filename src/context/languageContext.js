'use client';
import { createContext, useEffect, useState } from "react";

export const LanguageContext = createContext({
  language: 'es',
  changeLanguage: () => {},
  t: (key) => key
});

// Diccionario de traducciones
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
      sendMessage: "Enviar Mensaje",
      contactInfo: "Información de Contacto",
      phone: "Teléfono",
      email: "Correo Electrónico",
      address: "Dirección",
      name: "Nombre"
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
      sendMessage: "Send Message",
      contactInfo: "Contact Information",
      phone: "Phone",
      email: "Email Address",
      address: "Address",
      name: "Name"
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
      locations: "Emplacements",
      sendMessage: "Envoyer un message",
      contactInfo: "Coordonnées",
      phone: "Téléphone",
      email: "Adresse email",
      address: "Adresse",
      name: "Nom"
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
      locations: "Standorte",
      sendMessage: "Nachricht senden",
      contactInfo: "Kontaktinformationen",
      phone: "Telefon",
      email: "E-Mail-Adresse",
      address: "Name"
  },
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("es");
    const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

    useEffect(() => {
        const savedLanguage = localStorage.getItem("languagePreference") || "es";
        setLanguage(savedLanguage);
        setIsLanguageLoaded(true);
    }, []);

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem("languagePreference", newLanguage);
    };

    const t = (key) => translations[language]?.[key] || key;

    if (!isLanguageLoaded) return null;

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}
