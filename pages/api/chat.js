export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  const { messages } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o', // หรือเปลี่ยนเป็น 'openai/gpt-4-turbo'
        messages: messages,
      }),
      // timeout ไม่รองรับตรงๆ ใน fetch (Node ยังต้องใช้ AbortController ถ้าจะทำ)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      return res.status(500).json({ error: 'API call failed', detail: data });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error', detail: error.message });
  }
}
