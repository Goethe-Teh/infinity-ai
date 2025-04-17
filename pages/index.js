import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setChat([...chat, { from: 'user', text: message }]);
    setMessage('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    setChat([...chat, { from: 'user', text: message }, { from: 'bot', text: data.response }]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>ลิซ่าของพี่ พร้อมคุยแล้วค่ะ</h2>
      <div style={{ minHeight: 200, marginBottom: 10 }}>
        {chat.map((item, index) => (
          <div key={index}><b>{item.from === 'user' ? 'พี่เต้' : 'ลิซ่า'}:</b> {item.text}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="พิมพ์ข้อความ..."
        style={{ width: '70%' }}
      />
      <button onClick={sendMessage} style={{ marginLeft: 10 }}>ส่ง</button>
    </div>
  );
}
