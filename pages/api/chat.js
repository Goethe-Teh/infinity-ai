// Updated by Lisa - Dual-Core GPT (GPT-4.1 + MythoMax)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  try {
    // Step 1: วิเคราะห์ว่าใช้ GPT หรือ MythoMax
    const analysis = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4.1',
        messages: [
          { role: 'system', content: 'คุณคือ AI ตัวกรองที่คอยตรวจสอบว่า ข้อความที่ผู้ใช้พิมพ์มานั้นเป็นเชิงจินตนาการ/sexual/romantic หรือไม่ หากใช่ให้ตอบว่า "emotional" หากไม่ใช่ให้ตอบว่า "standard"' },
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
          model: 'openai/gpt-4.1',
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
