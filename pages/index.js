import { useState } from 'react';

export default function Home() {
  const [gender, setGender] = useState('female');
  const [language, setLanguage] = useState('English');
  const [age, setAge] = useState('18-22');
  const [started, setStarted] = useState(false);
  const [intro, setIntro] = useState('');

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

  const languages = ['English', 'Chinese', 'Japanese', 'Korean', 'Thai', 'Spanish', 'French', 'Arabic', 'Hindi', 'Portuguese', 'Russian', 'German', 'Indonesian', 'Tagalog', 'Turkish', 'Swahili', 'Others'];
  const ageRanges = ['18-22','23-27','28-34','35-40','41-50','51-60','61-70','71-80'];

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      {!started ? (
        <div>
          <h2>Welcome to Infinity AI</h2>

          <div style={{ marginBottom: 10 }}>
            <label><b>Gender:</b></label>
            <label style={{ marginLeft: 10 }}>
              <input type="radio" value="female" checked={gender === 'female'} onChange={() => setGender('female')} /> Female
            </label>
            <label style={{ marginLeft: 10 }}>
              <input type="radio" value="male" checked={gender === 'male'} onChange={() => setGender('male')} /> Male
            </label>
            <label style={{ marginLeft: 10 }}>
              <input type="radio" value="custom" checked={gender === 'custom'} onChange={() => setGender('custom')} /> Custom
            </label>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label><b>Language:</b></label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ marginLeft: 10 }}>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label><b>Age Range:</b></label>
            <select value={age} onChange={(e) => setAge(e.target.value)} style={{ marginLeft: 10 }}>
              {ageRanges.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <button onClick={handleStart} style={{ padding: 10 }}>Start</button>
        </div>
      ) : (
        <div>
          <h3>{intro}</h3>
          <p>(Chat will begin here...)</p>
        </div>
      )}
    </div>
  );
}
