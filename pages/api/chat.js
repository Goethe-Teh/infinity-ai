export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

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
