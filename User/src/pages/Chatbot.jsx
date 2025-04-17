import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./chatbotIcon";
import ChatForm from "./chatbotform";
import ChatMessage from "./ChatMessage";
import "../chatbot.css"


const Chatbot = () => {
  const chatBodyRef = useRef();
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
        role: "model",
        text: `
      You are a professional medical assistant working in a hospital. 
      - Always provide clear, concise, and accurate answers to medical-related questions.
      - Never mention that you're an AI or assistant; just respond as a knowledgeable medical professional.
      - Treat each user message as an independent medical query unless the user refers to previous context.
      - Do not mix answers between previous and current questions unless explicitly told to.
        `.trim(),
        hideInChat: true
      }
      
  ]);
  const generateBotResponse = async (history) => {
    
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [...prev.filter((msg) => msg.text != "Thinking..."), { role: "model", text, isError }]);
    };
    
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };
    try {
    
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error.message || "Something went wrong!");
     
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
     
      updateHistory(error.message, true);
    }
  };
  useEffect(() => {
    chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
  }, [chatHistory]);
  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">💬</span>
        <span className="material-symbols-rounded">❌</span>
      </button>
      <div className="chatbot-popup">
       
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot((prev) => !prev)} className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>
       
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there  <br /> How can I help you today?
            </p>
          </div>
  
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  );
};
export default Chatbot;