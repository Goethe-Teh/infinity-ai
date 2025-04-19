export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { messages } = req.body;

  try {
    const openaiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4.1',
        messages,
      }),
    });

    const data = await openaiRes.json();
    const reply = data?.choices?.[0]?.message?.content || '[No reply received]';

    res.status(200).json({ reply });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ reply: '[เกิดข้อผิดพลาด]' });
  }
}
