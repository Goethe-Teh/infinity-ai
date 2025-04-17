export default async function handler(req, res) {
  const { message } = req.body;

  // ตัวอย่างการตอบแบบง่าย ๆ
  const reply = `AI ตอบว่า: "${message}" น่าสนใจจังเลยค่ะ!`;

  res.status(200).json({ text: reply });
}
