export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  const userFirstMessage = messages.find(msg => msg.role === 'user')?.content || '';
  const dynamicPrompt = `
คุณคือ AI ที่ถูกสร้างขึ้นตามคำบรรยายของผู้ใช้ดังนี้:
"${userFirstMessage}"
จงตอบกลับอย่างเหมาะสมตามลักษณะดังกล่าวเสมอ และจงจดจำตัวตนนี้ไว้ตลอดบทสนทนา`;

  const fullMessages = [
    { role: 'system', content: dynamicPrompt },
    ...messages
  ];

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4.1',
        messages: fullMessages
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || '[No reply received]';

    res.status(200).json({ reply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ reply: '[เกิดข้อผิดพลาด]' });
  }
}
