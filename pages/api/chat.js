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
            : "Infinity: Hello, I am your personal assistant. Before we begin, please give me a name, gender, age, appearance, personality, or any special skills you want me to have so I can best match your preferences.",
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
    console.log("GPT raw response:", data);

    const reply = data?.choices?.[0]?.message?.content || '[No reply received]';
    setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
    setLoading(false);
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

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '60%' }}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage} disabled={loading} style={{ marginLeft: '10px' }}>
        {loading ? 'Loading...' : 'Send'}
      </button>
    </div>
  );
}
