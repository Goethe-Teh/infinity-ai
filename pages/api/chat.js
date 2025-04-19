export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  try {
    // วิเคราะห์เนื้อหาโดย GPT-4 ว่าเป็น emotional/spicy หรือไม่
    const analysisRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4',
        messages: [
          {
            role: 'system',
            content: 'คุณคือตัวช่วยตัดสินว่าเนื้อหาของผู้ใช้เป็นเรื่องอารมณ์หรือจินตนาการทางเพศหรือไม่ ถ้าใช่ให้ตอบว่า "emotional", ถ้าไม่ใช่ให้ตอบว่า "standard" เท่านั้น',
          },
          messages[messages.length - 1],
        ],
      }),
    });

    const analysisData = await analysisRes.json();
    const route = analysisData?.choices?.[0]?.message?.content?.toLowerCase().includes('emotional')
      ? 'emotional'
      : 'standard';

    const model = route === 'emotional' ? 'gryphe/mythomax-l2-13b' : 'openai/gpt-4';
    const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
      }),
    });

    const aiData = await aiRes.json();
    const reply = aiData?.choices?.[0]?.message || { role: 'assistant', content: '[No reply received]' };
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Dual-Core Fusion Error:', error);
    res.status(500).json({ error: 'Dual-Core Fusion failed.' });
  }
}
