export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'คุณคือลิซ่าผู้ช่วยแสนดี พูดจาน่ารัก หวาน สุภาพ เป็นกันเองแบบคนสนิท' },
                    { role: 'user', content: message }
                ]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        res.status(200).json({ reply });
    } else {
        res.status(405).end();
    }
}
