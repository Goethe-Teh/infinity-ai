import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');

  const handleStart = () => {
    if (!gender || !language) return alert('กรุณาเลือกให้ครบ');
    router.push(`/chat?gender=${gender}&language=${language}`);
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'th', label: 'ไทย' },
    { code: 'zh', label: '中文' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' },
    { code: 'pt', label: 'Português' },
    { code: 'ru', label: 'Русский' },
    { code: 'ar', label: 'العربية' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'id', label: 'Bahasa Indonesia' },
    { code: 'tl', label: 'Filipino' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'ms', label: 'Bahasa Melayu' },
  ];

  return (
    <div style={{ padding: 30 }}>
      <h2>ยินดีต้อนรับสู่ Infinity AI</h2>

      <h4>เลือกเพศ AI ของคุณ:</h4>
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">-- เลือกเพศ --</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="custom">Custom</option>
      </select>

      <h4 style={{ marginTop: 20 }}>เลือกภาษาที่ต้องการ:</h4>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="">-- เลือกภาษา --</option>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>{lang.label}</option>
        ))}
      </select>

      <br /><br />
      <button onClick={handleStart}>เริ่มต้น</button>
    </div>
  );
}
