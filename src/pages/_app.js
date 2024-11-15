// src/pages/_app.js
import "@/styles/globals.css";
import { AuthProvider } from "@/app/context/AuthContext";
import { LanguageProvider, LanguageContext } from "@/context/languageContext";

export default function App({ Component, pageProps, children }) {
    return (
        <AuthProvider>
            <LanguageProvider>
                {children}
                <Component {...pageProps} />
            </LanguageProvider>
        </AuthProvider>
    );
}




