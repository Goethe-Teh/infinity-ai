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
            ? "Infinity: สวัสดีค่ะ ดิฉัน กำลังจะกลายเป็นคนพิเศษส่วนตัวของคุณ โปรดตั้งชื่อ กำหนดเพศ อายุ บุคลิก รูปร่าง หน้าตา ลักษณะนิสัย ความสามารถ หรือคุณสมบัติพิเศษ และสถานะความสัมพันธ์ระหว่างเรา เช่น เพื่อนสนิท เพื่อนร่วมงาน แฟน ฯลฯ ตามที่คุณปรารถนา แล้วพบกันในอีกไม่กี่วินาทีข้างหน้านะคะ"
            : "Infinity: Hello, I’m about to become your personal companion. Please describe my name, gender, age, appearance, personality, special traits, or relationship between us (e.g., friend, assistant, lover) so I can become who you truly need.",
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
      const reply = data?.reply?.content || '[No reply received]';
      setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: 'assistant', content: '[Error communicating with server]' }]);
    } finally {
      setLoading(false);
    }
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
        placeholder="Type your message here..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={sendMessage} disabled={loading || !input.trim()}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
