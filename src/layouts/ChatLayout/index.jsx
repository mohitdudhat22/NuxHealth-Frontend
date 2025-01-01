import { NHButton } from "@/components";
import { ChatSidebar } from "@/components";
import { useState } from "react";

export const ChatLayout = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setIsLoading(true);
    try {
      const userMessage = {
        id: Date.now().toString(),
        content: inputMessage,
        sender: "user",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage("");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "This is a simulated response. Replace with actual API integration.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-[334px,1fr] h-full max-h-[calc(100vh-var(--header-height))]">
      {/* Sidebar */}
      <ChatSidebar />

      {/* Main Chat Area */}

    </div>
  );
};
