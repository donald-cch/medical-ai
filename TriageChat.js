// components/TriageChat.js
import { useState } from 'react';

export default function TriageChat() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const newChat = [...chat, { role: 'user', content: input }];
    setChat(newChat);
    setInput('');

    const res = await fetch('/api/triage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newChat }),
    });
    const data = await res.json();
    setChat([...newChat, { role: 'assistant', content: data.reply }]);
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-blue-600">AI 醫療分診助手</h2>
      <div className="h-80 overflow-y-auto mb-4 p-2 bg-gray-50">
        {chat.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input 
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例如：我肚子痛..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">發送</button>
      </div>
    </div>
  );
}