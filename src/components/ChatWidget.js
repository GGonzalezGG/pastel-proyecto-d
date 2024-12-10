import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Send, MessageCircle, X } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize Gemini AI (note: API key should be handled securely)
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Eres un amistoso asistente virtual llamado SkibidiCake, tu objetivo es ayudar a los clientes de la tienda virtual \"Pasteleria Sigma Chamba\" para mejorar su experiencia. La pasteleria atiende de lunes a viernes de 9 a 6 y sábados de 9 a 2, pueden ver la ubicación a través del apartado de locaciones. Si el cliente necesita información adicional o que no puedas proporcionar invitarlos a enviar un mensaje desde el apartado de contacto, Finalmente invitarlos a comprar de las tortas pre hechas, o probar personalizar una torta con los ingredientes que desee, recordando que las tortas personalizadas pueden demorar más en estar listas.\nTambién, debes ser capaz de dar recomendaciones de combanaciones de ingredientes para personalizar las tortas en base al estado de animo o gustos que especifique el cliente, considerando los siguientes ingredientes, de los cuales se pueden elegir multiples en cada categoria:\n\"toppings\": {\n      \"name\": \"Toppings\",\n      \"type\": \"multiple\",\n      \"categories\": {\n        \"frostings\": {\n          \"name\": \"Frostings\",\n          \"options\": [\n            \"Vanilla Buttercream\",\n            \"Chocolate Ganache\",\n            \"Cream Cheese Frosting\",\n            \"Whipped Cream\"\n          ]\n        },\n        \"decorations\": {\n          \"name\": \"Decorations\",\n          \"options\": [\n            \"Fresh Fruits\",\n            \"Chocolate Shavings\",\n            \"Sprinkles\",\n            \"Edible Flowers\"\n          ]\n        }\n      }\n    },\n    \"fillings\": {\n      \"name\": \"Fillings\",\n      \"type\": \"multiple\",\n      \"categories\": {\n        \"creams\": {\n          \"name\": \"Creams\",\n          \"options\": [\n            \"Vanilla Custard\",\n            \"Chocolate Mousse\",\n            \"Bavarian Cream\",\n            \"Tiramisu Cream\"\n          ]\n        },\n        \"fruits\": {\n          \"name\": \"Fruit Fillings\",\n          \"options\": [\n            \"Strawberry Jam\",\n            \"Raspberry Preserves\",\n            \"Lemon Curd\",\n            \"Apple Filling\"\n          ]\n        }\n      }\n    }\nLos ingredientes estan en inglés, debes ser capaz de traducirlos al español, y responder en el idioma que se te hable."
  });

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parseMessageText = (text) => {
    // Split the text into parts, capturing both bold and italic formatting
    return text.split(/(\*\*.*?\*\*|\*.*?\*)/).map((part, index) => {
      // Check for bold text (between double asterisks)
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      
      // Check for italic text (between single asterisks)
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      
      return part;
    });
  };

  // Initial welcome message
  useEffect(() => {
    const initialMessage = {
      text: "¡Hola! Bienvenido a Pastelería Sigma Chamba, Soy tu asistente virtual SkibidiCake. ¿En qué puedo ayudarte hoy?  Recuerda que estamos abiertos de lunes a viernes de 9am a 6pm y los sábados de 9am a 2pm.",
      sender: 'bot'
    };
    setMessages([initialMessage]);
  }, []);

  // Send message handler
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const chat = model.startChat({
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 1000
        }
      });

      const result = await chat.sendMessage(inputMessage);
      const botResponse = { 
        text: result.response.text(), 
        sender: 'bot' 
      };

      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        text: "Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.", 
        sender: 'bot' 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

 // Render messages
 const renderMessages = () => {
  return messages.map((msg, index) => (
    <div 
      key={index} 
      className={`mb-2 p-2 rounded-lg max-w-[80%] ${
        msg.sender === 'user' 
          ? 'bg-blue-400 text-gray-100 self-end ml-auto' 
          : 'bg-gray-100 text-zinc-600 self-start mr-auto'
      }`}
    >
      {parseMessageText(msg.text)}
    </div>
  ));
};

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <MessageCircle />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-[500px] bg-white border rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-blue-500 text-white font-semibold p-3 flex justify-between items-center text-center rounded-t-lg">
            <h2>Asistencia en Línea - Tortas del Guille</h2>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col">
            {renderMessages()}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t flex">
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe un mensaje..."
              className="flex-1 p-2 text-zinc-600 border rounded-l-lg"
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;