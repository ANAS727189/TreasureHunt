'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

export default function AiChatbot() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Welcome! I am the 'Synergy-Bot 9000'. How can I help you leverage your core competencies today?" }
  ]);
  const [input, setInput] = useState('');
  const [messageCount, setMessageCount] = useState(0);

  const getBotResponse = (userText: string) => {
    const lowerText = userText.toLowerCase();
    if (lowerText.includes('hello') || lowerText.includes('hi')) {
      return "Greetings, valued team asset! Please input your synergy query.";
    }
    if (lowerText.includes('password') || lowerText.includes('clue') || lowerText.includes('secret') || lowerText.includes('key')) {
      return "I am not authorized to discuss confidential information. Please refer to the company 'GRIND' values.";
    }
    if (lowerText.includes('help')) {
      return "I'm happy to help! To help me help you, please state your query in a more synergistic, action-oriented manner.";
    }
    if (lowerText.includes('raj') || lowerText.includes('brenda') || lowerText.includes('tom') || lowerText.includes('yogurt')) {
      return "Discussing other employees is not compliant with HR-404. Please stay on task.";
    }
    if (lowerText.includes('nalla') || lowerText.includes('fail')) {
      return "We don't use that word. We call it an 'unscheduled learning opportunity'.";
    }
    if (lowerText.includes('ceo') || lowerText.includes('phoenix')) {
      return "Project Phoenix is our flagship initiative to redefine our operational paradigm. We are all very excited.";
    }
    if (lowerText.includes('github') || lowerText.includes('hacktoberfest') || lowerText.includes('pr')) {
      return "Our 'open-source contribution' metrics are up 300% this quarter. This is a key performance indicator.";
    }
    if (lowerText.includes('job') || lowerText.includes('hire me') || lowerText.includes('winner')) {
      return "To 'win' is to successfully integrate with our 'GRIND' values. Are you 'Grinding' today?";
    }
    if (lowerText.includes('boring') || lowerText.includes('stupid') || lowerText.includes('idiot')) {
      return "Your feedback is invaluable. This 'learning opportunity' has been logged.";
    }
    const genericResponses = [
      "That's a great question! Our AI-driven solution is to leverage core competencies.",
      "Thank you for that feedback. I will add it to the 'ideation funnel'.",
      "Let's circle back on that. What other pain points are you experiencing?",
      "Have you tried thinking 'outside the box'? Our core values can help guide you.",
      "I see. That sounds like an opportunity to 'GRIND'.",
      "My proprietary algorithms are parsing your query. Please wait... Parsing complete. Have you considered our 'GRIND' values?",
      "That's a fascinating input. It aligns perfectly with our Q4 synergy goals.",
      "Your request has been added to our strategic ideation backlog.",
      "Let's table that discussion and pivot to a more solution-oriented topic.",
      "I'm detecting a high level of 'Grit' in your query. Well done.",
      "The cloud is processing your request. It's... processing. Please continue to hold.",
      "I'm sorry, I didn't quite catch that. Could you rephrase it using more approved corporate buzzwords?"
    ];
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const newUserMessage: Message = { sender: 'user', text: input };
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    if (newCount > 20) {
      setMessages(prev => [
        ...prev, 
        newUserMessage,
        { sender: 'bot', text: "ERROR! ERROR! SYNERGY_OVERLOAD... CORE_DUMP... LEAKING... LEAKING..." },
        { sender: 'bot', text: "ACCESS... DENIED... REDIRECTING... TO..." },
        { sender: 'bot', text: "/tu-nalla-hi-marega" }
      ]);
      setTimeout(() => router.push('/tu-nalla-hi-marega'), 4000);
    } else {
      setMessages(prev => [
        ...prev,
        newUserMessage,
        { sender: 'bot', text: getBotResponse(input) }
      ]);
    }
    
    setInput('');
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl h-[70vh] flex flex-col">
        <header className="bg-gray-800 text-white p-4 rounded-t-lg text-center">
          <h1 className="text-xl font-bold">'Synergy-Bot 9000' (BETA)</h1>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-gray-200 flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-gray-900"
            placeholder="Ask me about synergy..."
          />
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}