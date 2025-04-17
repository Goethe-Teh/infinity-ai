import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [character, setCharacter] = useState('female');

  const sendMessage = async () => {
    if (!message.trim()) return;
    setChat([...chat, { from: 'user', text: message }]);
    setMessage('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, character }),
    });

    const data = await res.json();
    setChat([...chat, { from: 'user', text: message }, { from: 'bot', text: data.response }]);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Infinity AI Chat</h2>

      <label>AI Character:</label>
      <select value={character} onChange={e => setCharacter(e.target.value)} style={{ marginBottom: 10 }}>
        <option value="female">Female (Lisa)</option>
        <option value="male">Male (Leo)</option>
      </select>

      <div style={{ marginBottom: 10 }}>
        {chat.map((entry, i) => (
          <div key={i} style={{ color: entry.from === 'user' ? '#000' : '#0070f3' }}>
            <strong>{entry.from === 'user' ? 'You' : character === 'female' ? 'Lisa' : 'Leo'}:</strong> {entry.text}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
        style={{ width: '100%', padding: 8 }}
      />
    </div>
  );
}
