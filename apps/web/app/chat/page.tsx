"use client";

import { useCallback, useState } from "react";
import { Prompt } from "@repo/types";
import { createChatCompletion } from "@actions/createPrompt";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import UserIcon from "@components/UserIcon";
import { signOut } from "next-auth/react";

const ChatPage = () => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Prompt[]>([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Prompt = {
      sessionId: uuidv4(),
      result: message,
      role: "user",
      prompt: message,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage("");
    setIsTyping(true);

    try {
      const response = await createChatCompletion(message);
      const aiMessage: Prompt = {
        sessionId: response.sessionId,
        result: response.result,
        role: response.role,
        prompt: response.prompt,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChangePrompt = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
        <header className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-gray-600" avatarUrl={session?.user?.image} />
              </div>
              <p className="text-sm font-medium">{session?.user?.name}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="p-1 text-xs border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              aria-label="Sign out"
            >
              Sign Out
            </button>
          </div>
        </header>
        <div className="h-[70vh] overflow-y-auto p-4">
          {messages.map((m) => (
            <div
              key={m.sessionId}
              className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${m.role === "user" ? "bg-gray-800 text-white" : "bg-gray-400 text-black"}`}
              >
                {m.result}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="text-left">
              <span className="inline-block p-2 rounded-lg bg-gray-200 text-black">
                AI is typing...
              </span>
            </div>
          )}
        </div>
        <footer className="p-4 border-t border-gray-200">
          <div className="flex w-full space-x-2">
            <input
              type="text"
              value={message}
              onChange={(event) => handleChangePrompt(event)}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isTyping}
              onClick={handleMessage}
              className="px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gra-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChatPage;
