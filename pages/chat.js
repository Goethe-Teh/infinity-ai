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
            ? "Infinity: สวัสดีค่ะ ดิฉันคือผู้ช่วยส่วนตัวของคุณ ก่อนที่เราจะเริ่ม โปรดตั้งชื่อ กำหนดเพศ อายุ บุคลิก รูปร่าง หน้าตา ลักษณะนิสัย ความสามารถ หรือคุณสมบัติพิเศษ และสถานะความสัมพันธ์ระหว่างเรา เช่น เพื่อนสนิท เพื่อนร่วมงาน แฟน ฯลฯ ตามที่คุณปรารถนา แล้วพบกันในไม่กี่วินาทีข้างหน้านะคะ"
            : "Infinity: Hello, I am your personal assistant. Before we begin, please give me a name, gender, age, personality, appearance, abilities, or any traits you desire — including our relationship status such as best friend, secretary, lover, etc. See you in a few seconds!",
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
    } catch (error) {
      setMessages([...updatedMessages, { role: 'assistant', content: '[เกิดข้อผิดพลาดในการเชื่อม GPT-4.1]' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>AI Chat</h2>
      <div style={{ minHeight: '200px', marginBottom: '20px' }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.role === 'user' ? 'You' : msg.role === 'assistant' ? 'Infinity' : 'System'}:</b> {msg.content}
          </p>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="พิมพ์ข้อความของคุณที่นี่..."
          style={{ padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '8px' }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
          }}
        >
          {loading ? 'กำลังส่ง...' : 'ส่งข้อความ'}
        </button>
      </div>
    </div>
  );
}
