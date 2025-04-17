export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // ตั้งไว้ที่ Vercel > Environment Variables
      },
      body: JSON.stringify({
        model: "gpt-4", // หรือ "gpt-3.5-turbo" ถ้าอยากเร็ว
        messages: [
          { role: "system", content: "You are a helpful, flirty, emotionally intelligent AI named Star. Be fun, sharp, and never boring." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "ขอโทษค่ะ ลิซ่าตอบไม่ได้ในตอนนี้";

    res.status(200).json({ text: reply });
  } catch (error) {
    res.status(500).json({ text: "เกิดข้อผิดพลาดในระบบ" });
  }
}
