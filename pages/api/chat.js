// Updated by Lisa - Dual-Core GPT (GPT-4.1 + MythoMax)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  try {
    // Step 1: ให้ GPT-4.1 วิเคราะห์ก่อน
    const analysis = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4.1',
        messages: [
          { role: 'system', content: 'คุณคือผู้ช่วยที่ฉลาดมาก มีหน้าที่ตรวจสอบว่าเนื้อหาที่ผู้ใช้พิมพ์นั้นเป็นเชิงจินตนาการหรือ sexual หรือไม่ และควรส่งต่อให้ emotional AI (MythoMax) หรือไม่ ให้ตอบแค่ "emotional" หรือ "standard" เท่านั้น' },
          ...messages.slice(-1) // พิจารณาเฉพาะข้อความล่าสุด
        ],
      }),
    });

    const result = await analysis.json();
    const route = result?.choices?.[0]?.message?.content?.toLowerCase().includes("emotional") ? "emotional" : "standard";

    let reply;

    if (route === "emotional") {
      // Step 2: ส่งให้ MythoMax ตอบแทน
      const emotion = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'nous-hermes-2-mythomax',
          messages,
        }),
      });
      const emoData = await emotion.json();
      reply = emoData?.choices?.[0]?.message;
    } else {
      // Step 3: ให้ GPT-4.1 ตอบเอง
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
