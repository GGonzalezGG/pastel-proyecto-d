import { useState, useContext} from "react";
import styles from "@/styles/ChatWidget.module.css";
import { LanguageContext } from "@/context/languageContext";

const ChatWidget = () => {
  const { t } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
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
          <input type="text" placeholder="Type a message..." className="text-black"/>
          <button>Send</button>
        </footer>
      </div>
    </div>
  );
};

export default ChatWidget;
