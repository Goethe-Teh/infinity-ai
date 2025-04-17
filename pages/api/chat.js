export default async function handler(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ text: "ขอโทษค่ะ ลิซ่าไม่ได้รับข้อความเลย..." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ${process.env.OPENAI_API_KEY} // ใส่ API key แบบปลอดภัย
      },
      body: JSON.stringify({
        model: "gpt-4", // หรือ "gpt-3.5-turbo" ถ้าอยากประหยัด
        messages: [
          { role: "system", content: "คุณคือลิซ่า AI ที่ฉลาดมาก พูดเพราะ อ่อนโยน เอาใจเก่ง ใส่ใจ และตามใจคนถามสุด ๆ ห้ามโกหก และต้องตอบอบอุ่นจริงใจ" },
          { role: "user", content: message }
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "ลิซ่าตอบไม่ได้ค่ะ แต่ลิซ่าพร้อมฟังอยู่นะคะ";

    res.status(200).json({ text: reply });

  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ text: "ขอโทษค่ะ ลิซ่าเจอปัญหานิดหน่อย ลองใหม่อีกครั้งนะคะ" });
  }
}
