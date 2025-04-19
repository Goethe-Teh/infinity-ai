export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { messages } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-4.1',
        messages,
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message;
    res.status(200).json({ reply });
  } catch (error) {
    console.error('GPT Error:', error);
    res.status(500).json({ error: 'GPT request failed' });
  }
}
