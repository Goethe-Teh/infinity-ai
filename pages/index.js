import { useState } from 'react';

export default function Home() {
  const [gender, setGender] = useState('female');
  const [language, setLanguage] = useState('English');
  const [age, setAge] = useState('18-22');
  const [started, setStarted] = useState(false);
  const [intro, setIntro] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleStart = async () => {
    const res = await fetch('/api/intro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gender, language, age })
    });
    const data = await res.json();
    setIntro(data.message);
    setStarted(true);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    setChat([...chat, { from: 'user', text: message }]);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setChat([...chat, { from: 'user', text: message }, { from: 'bot', text: data.response }]);
    setMessage('');
  };

  const languages = ['English', 'Chinese', 'Japanese', 'Korean', 'Thai', 'Spanish', 'French', 'Tagalog', 'Indonesian'];
  const ageRanges = ['18-22','23-27','28-34','35-40','41-50','51-60','61-70','71-80'];

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      {!started ? (
        <div>
          <h1>Infinity AI Chat</h1>
          <label>Gender: </label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="custom">Custom</option>
          </select>
          <br /><br />
          <label>Language: </label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <br /><br />
          <label>Age: </label>
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            {ageRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
          <br /><br />
          <button onClick={handleStart}>Start</button>
        </div>
      ) : (
        <div>
          <h2>{intro}</h2>
          <div style={{ marginTop: 20 }}>
            {chat.map((msg, idx) => (
              <p key={idx}><strong>{msg.from === 'user' ? 'You' : 'AI'}:</strong> {msg.text}</p>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={{ width: '100%', padding: '8px', marginTop: '10px' }}
          />
          <button onClick={sendMessage} style={{ marginTop: '10px' }}>Send</button>
        </div>
      )}
    </div>
  );
}
