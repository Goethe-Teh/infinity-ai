import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const router = useRouter();
  const { language } = router.query;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (language) {
      const defaultMessage = {
        role: 'system',
        content:
          language === 'th'
            ? "Infinity: สวัสดี ฉันคือผู้ช่วยส่วนตัวของคุณ ก่อนที่เราจะเริ่ม โปรดตั้งชื่อ ระบุเพศ อายุ รูปร่าง หน้าตา นิสัย หรือความสามารถพิเศษที่คุณอยากให้ฉันเป็น เพื่อให้ฉันปรับตัวได้เหมาะสมกับคุณที่สุด"
            : "Infinity: Hello, I am your personal assistant. Before we begin, please tell me a name, gender, age, appearance, personality, or any special traits you'd like me to have so I can match you perfectly.",
      };
      setMessages([defaultMessage]);
    }
  }, [language]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const updatedMessages = [...messages, { role: 'user', content: input }];
    setMessages(updatedMessages);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      const reply = data?.reply || '[เกิดข้อผิดพลาด]';
      setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: 'assistant', content: '[เกิดข้อผิดพลาดในการเชื่อมต่อ]' }]);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>AI Chat</h2>
      <div style={{ minHeight: '200px', marginBottom: '20px' }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.role === 'user' ? 'You' : msg.role === 'assistant' ? 'Infinity' : 'System'}:</b> {msg.content}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="พิมพ์ข้อความของคุณที่นี่..."
        style={{ padding: 10, width: '100%', marginBottom: 10 }}
      />
      <button onClick={sendMessage} disabled={loading || !input.trim()}>
        {loading ? 'กำลังส่ง...' : 'ส่งข้อความ'}
      </button>
    </div>
  );
}
