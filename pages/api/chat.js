export default async function handler(req, res) {
  const { messages } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openrouter/openai/gpt-4o',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    console.log("GPT Response:", JSON.stringify(data, null, 2)); // << สำคัญมาก

    if (data.error) {
      return res.status(500).json({ error: data.error.message || 'Unknown GPT error' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("GPT Error:", error);
    return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ GPT' });
  }
}
