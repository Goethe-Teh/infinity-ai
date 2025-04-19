export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { messages } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // วาง key ใน .env
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // หรือ gpt-4 ถ้ามี
        messages,
      }),
    });

    const data = await response.json();

    if (data?.choices?.[0]?.message?.content) {
      res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ reply: '[GPT ไม่ตอบกลับ หรือเกิดข้อผิดพลาด]' });
    }
  } catch (error) {
    console.error('Error from GPT:', error);
    res.status(500).json({ reply: '[เกิดข้อผิดพลาดในการเชื่อมต่อ GPT]' });
  }
}
