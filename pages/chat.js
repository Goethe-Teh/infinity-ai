import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const router = useRouter();
  const { gender, language } = router.query;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // สร้างข้อความแรกแบบตั้งค่าภาษาและเพศ AI
  useEffect(() => {
    if (gender && language) {
      const defaultMessage = {
        role: 'system',
        content: `You are a personal AI assistant. Speak in ${language}. Your gender is ${gender}.`,
      };
      setMessages([defaultMessage]);
    }
  }, [gender, language]);

  // ฟังก์ชันส่งข้อความไปหา API
  const sendMessage = async () => {
    setLoading(true);
    const updatedMessages = [...messages, { role: 'user', content: input }];
    setMessages(updatedMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    const data = await res.json();
    const reply = data.choices[0].message.content;

    setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>AI แชทของคุณ</h2>

      <div style={{ minHeight: '200px', marginBottom: '20px' }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.role === 'user' ? 'คุณ' : msg.role === 'assistant' ? 'AI' : 'ระบบ'}:</b> {msg.content}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '60%' }}
        placeholder="พิมพ์ข้อความของคุณที่นี่..."
      />
      <button onClick={sendMessage} disabled={loading} style={{ marginLeft: '10px' }}>
        {loading ? 'รอสักครู่...' : 'ส่ง'}
      </button>
    </div>
  );
}
