export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const reply = `AI ตอบว่า: "${message}" น่าสนใจจังเลยค่ะ!`;

    res.status(200).json({ text: reply });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
