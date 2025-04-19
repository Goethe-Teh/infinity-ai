// Updated by Lisa - Dual-Core GPT (GPT-4.1 + MythoMax)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  try {
    // วิเคราะห์ว่าเป็นข้อความแนว emotional หรือ standard
    const analysis = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4',
        messages: [
          { role: 'system', content: 'คุณคือ AI ตัวกรอง ตรวจสอบว่า user พิมพ์มาเป็น sexual/จินตนาการ หรือไม่ ถ้าใช่ตอบว่า "emotional" ถ้าไม่ใช่ให้ตอบว่า "standard"' },
          messages[messages.length - 1]
        ],
      }),
    });

    const result = await analysis.json();
    const route = result?.choices?.[0]?.message?.content?.toLowerCase().includes("emotional") ? "emotional" : "standard";

    let reply;

    if (route === "emotional") {
      const emotion = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gryphe/mythomax-l2-13b',
          messages,
        }),
      });
      const emoData = await emotion.json();
      reply = emoData?.choices?.[0]?.message;
    } else {
      const gpt = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4',
          messages,
        }),
      });
      const gptData = await gpt.json();
      reply = gptData?.choices?.[0]?.message;
    }

    res.status(200).json({ reply });

  } catch (error) {
    console.error('Dual-Core Error:', error);
    res.status(500).json({ error: 'Dual-Core Fusion failed.' });
  }
}
