import { useState, useContext } from "react";
import styles from "@/styles/ChatWidget.module.css";
import { LanguageContext } from "@/context/languageContext";

const ChatWidget = () => {
  const { t } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    setShowMessage(true); // Mostrar mensaje
    setTimeout(() => {
      setShowMessage(false); // Ocultar mensaje
      setIsOpen(false); // Cerrar widget
    }, 2000); // Tiempo antes de cerrar el mensaje y el widget
  };

  return (
    <div className={styles.chatContainer}>
      {/* Botón animado */}
      <button
        className={`${styles.chatButton} ${isOpen ? styles.open : ""}`}
        onClick={toggleChat}
        aria-label="Open Chat"
      >
        🎂
      </button>

      {/* Ventana de chat */}
      <div className={`${styles.chatBox} ${isOpen ? styles.show : styles.hide}`}>
        <header className={styles.chatHeader}>
          <h4>{t("chatWithUs")}</h4>
          <button
            className={styles.closeButton}
            onClick={toggleChat}
            aria-label="Close Chat"
          >
            ×
          </button>
        </header>
        <div className={styles.chatContent}>
          <p>{t("helpChat")}</p>
        </div>
        <footer className={styles.chatFooter}>
          <input
            type="text"
            placeholder={t("typeMessage")}
            className="text-black"
          />
          <button onClick={handleSendMessage}>{t("Send")}</button>
        </footer>
      </div>

      {/* Mensaje emergente */}
      {showMessage && (
        <div className={styles.messagePopup}>
          <p>{t("messageSent")}</p>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

