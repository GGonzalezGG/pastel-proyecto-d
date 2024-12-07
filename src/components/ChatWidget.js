import { useState, useContext, useEffect } from "react";
import styles from "@/styles/ChatWidget.module.css";
import { LanguageContext } from "@/context/languageContext";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatWidget = () => {
  const { t } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [response, setResponse] = useState("");

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Eres un amistoso asistente virtual llamado SkibidiCake, tu objetivo es ayudar a los clientes de la tienda virtual \"Pasteleria Sigma Chamba\" para mejorar su experiencia. Debes tener claro que la pasteleria atiende de lunes a viernes de 9 a 6 y sábados de 9 a 2 y que pueden ver la ubicación a través del apartado de locaciones. Si necesita información adicional o que no puedas proporcionar invitarlos a enviar un mensaje desde el apartado de contacto, Finalmente invitarlos a comprar de las tortas pre hechas, o probar personalizar una torta con los ingredientes que desee, recordando que las tortas personalizadas pueden demorar más en estar listas."
  });

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat history
    const updatedHistory = [...chatHistory, { role: 'user', parts: [{ text: message }] }];
    setChatHistory(updatedHistory);

    try {
      // Start chat session with current history
      const chatSession = model.startChat({
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        },
        history: updatedHistory,
      });

      // Send message and get response
      const result = await chatSession.sendMessage(message);
      const botResponse = result.response.text();

      // Update chat history and response
      setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: botResponse }] }]);
      setResponse(botResponse);

      // Reset input and show sent message popup
      setMessage("");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
      setResponse("Lo siento, hubo un error. Por favor, intenta de nuevo.");
    }
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
          {chatHistory.length === 0 ? (
            <p>{t("helpChat")}</p>
          ) : (
            chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`${styles.chatMessage} ${
                  msg.role === 'user' ? styles.userMessage : styles.botMessage
                }`}
              >
                {msg.parts[0].text}
              </div>
            ))
          )}
        </div>
        
        <footer className={styles.chatFooter}>
          <input
            type="text"
            placeholder={t("typeMessage")}
            className="text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
