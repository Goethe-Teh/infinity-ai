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
        content: language === 'th'
          ? 'Infinity: สวัสดีค่ะ ดิฉันคือผู้ช่วยส่วนตัวของคุณ ก่อนที่เราจะเริ่ม โปรดตั้งชื่อ ระบุเพศ อายุ รูปร่าง หน้าตา นิสัย หรือความสามารถพิเศษที่คุณอยากให้ฉันเป็น เพื่อให้ฉันปรับตัวได้เหมาะสมกับคุณที่สุด'
          : 'Infinity: Hello! I’m your personal assistant. Before we begin, please tell me your desired name, gender, age, appearance, personality, special traits, and your relationship status with me, such as friend, assistant, or lover.',
      };
      setMessages([defaultMessage]);
    }
  }, [language]);

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
    const reply = data?.reply || '[เกิดข้อผิดพลาด]';
    setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Chat</h2>
      <div style={{ minHeight: '200px', marginBottom: '20px' }}>
        {messages.map((msg, index) => (
          <p key={index}><b>{msg.role === 'user' ? 'You' : msg.role === 'assistant' ? 'Infinity' : 'System'}:</b> {msg.content}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="พิมพ์ข้อความของคุณที่นี่..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={sendMessage} disabled={loading || !input.trim()}>
        {loading ? 'กำลังส่ง...' : 'ส่งข้อความ'}
      </button>
    </div>
  );
}
