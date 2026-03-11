
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { generateResponse } from '../services/geminiService';
import { Send, BrainCircuit } from 'lucide-react';
import { skillData, mockCieData, upcomingLabs } from '../data/mockData';
import MarkdownRenderer from './MarkdownRenderer';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hello! I am your AI study assistant. How can I help you plan your academics today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (prompt?: string) => {
    const userMessage = prompt || input;
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      let aiResponse;
      // Check if the user is asking for a study plan
      if (userMessage.toLowerCase().includes('study plan')) {
        // In a real app, this would come from a shared state management solution
        const targetCGPA = '9.00'; 
        
        const studentData = {
            targetCGPA,
            skills: skillData,
            cieData: mockCieData[0], // Using the most recent semester's data
            deadlines: upcomingLabs,
        };
        aiResponse = await generateResponse(userMessage, studentData);
      } else {
        aiResponse = await generateResponse(userMessage);
      }
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I couldn't process your request right now." }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const suggestionChips = [
    "Prepare my study plan",
    "Which subject am I weak in?",
    "When is my next exam?"
  ];

  return (
    <div className="flex flex-col h-full p-4">
      <h3 className="text-xl font-bold text-brand-red mb-4 flex items-center"><BrainCircuit className="mr-2"/> Your AI Study Assistant</h3>
      <div ref={chatHistoryRef} className="flex-1 overflow-y-auto space-y-4 p-2 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-red-100 text-brand-charcoal' : 'bg-gray-100 text-brand-charcoal'}`}>
              {msg.sender === 'ai' ? (
                <MarkdownRenderer content={msg.text} />
              ) : (
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="max-w-md px-4 py-2 rounded-xl bg-gray-100 text-brand-charcoal">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse delay-150"></div>
                    </div>
                </div>
            </div>
        )}
      </div>
      <div className="mt-auto border-t pt-4">
        <div className="flex flex-wrap gap-2 mb-2">
            {suggestionChips.map(chip => (
                <button key={chip} onClick={() => handleSend(chip)} className="px-3 py-1 text-xs text-brand-red border border-brand-red rounded-full bg-brand-beige hover:bg-red-100 transition-colors">
                    {chip}
                </button>
            ))}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Ask for a study plan, subject analysis, or any question..."
            className="flex-1 w-full px-4 py-2 bg-brand-beige border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="p-3 text-white bg-brand-red rounded-lg disabled:bg-red-300 hover:bg-red-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
