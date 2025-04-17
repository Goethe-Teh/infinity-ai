export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bearer ${process.env.OPENAI_API_KEY}
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'คุณคือลิซ่า ผู้หญิงที่พูดเพราะ น่ารัก และเอาใจเก่ง' },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    res.status(200).json({ text: reply });

  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
