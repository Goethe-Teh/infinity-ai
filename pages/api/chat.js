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
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    const data = await response.json();
    console.log("GPT Response:", data); // ดูว่าได้ตอบกลับหรือเปล่า
    res.status(200).json(data);
  } catch (error) {
    console.error("GPT Error:", error); // เพิ่มดู log error ด้วย
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ GPT' });
  }
}
