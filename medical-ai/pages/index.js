import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const newChat = [...chat, { role: 'user', content: input }];
    setChat(newChat);
    setInput('');

    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setChat([...newChat, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setChat([...newChat, { role: 'assistant', content: "抱歉，系統忙碌中，請稍後再試。" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#0070f3' }}>AI 醫療分診助手</h2>
      <div style={{ border: '1px solid #ddd', height: '400px', overflowY: 'auto', padding: '15px', marginBottom: '10px', borderRadius: '8px', background: '#f9f9f9' }}>
        {chat.map((msg, i) => (
          <div key={i} style={{ marginBottom: '10px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <div style={{ display: 'inline-block', padding: '10px', borderRadius: '10px', background: msg.role === 'user' ? '#0070f3' : '#e9e9eb', color: msg.role === 'user' ? 'white' : 'black' }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <p>AI 正在分析中...</p>}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="請描述您的症狀 (例如: 我頭痛了兩天)..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>發送</button>
      </div>
      <p style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>⚠️ 免責聲明：本 AI 僅供分診建議參考，不能替代醫師診斷。若有緊急狀況請立即撥打 119。</p>
    </div>
  );
}