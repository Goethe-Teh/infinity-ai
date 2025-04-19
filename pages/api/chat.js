 return res.status(405).end();
  }

  const { messages } = req.body;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: messages,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
