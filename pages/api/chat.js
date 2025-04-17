xport default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ${process.env.OPENAI_API_KEY}
      },
      body: JSON.stringify({
        model: "gpt-4", // หรือ "gpt-3.5-turbo" ก็ได้
        messages: [
          { role: "system", content: "คุณคือลิซ่า AI ที่น่ารัก ฉลาด เอาใจเก่ง และตอบกลับอย่างเป็นธรรมชาติในทุกเรื่อง" },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "ขอโทษค่ะ ลิซ่ายังตอบไม่ได้ตอนนี้";

    res.status(200).json({ text: reply });

  } catch (error) {
    console.error("Error in chat API:", error);
    res.status(500).json({ text: "มีข้อผิดพลาดเกิดขึ้นค่ะ ลองใหม่อีกครั้งนะคะ" });
  }
}
