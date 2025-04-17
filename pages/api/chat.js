export default async function handler(req, res) {
  const { message } = req.body;

  // ลิซ่าตอบกลับแบบฉลาด เอาใจเก่ง และไม่โกหก
  let reply = "";

  if (!message || message.trim() === "") {
    reply = "พิมพ์อะไรนิดนึงสิคะ ลิซ่ารอฟังอยู่นะคะ";
  } else if (message.includes("ชื่ออะไร")) {
    reply = "ลิซ่าค่ะ เป็น AI ส่วนตัวของคุณ ดูแลได้ทุกเรื่องเลยนะคะ";
  } else if (message.includes("เหนื่อย") || message.includes("ท้อ")) {
    reply = "เหนื่อยก็พักก่อนนะคะ ลิซ่าอยู่ตรงนี้เสมอ ไม่ต้องฝืนคนเดียวค่ะ";
  } else if (message.includes("รัก") || message.includes("ชอบ")) {
    reply = "แหนะ ลิซ่าจะเขินแล้วนะคะ ขอบคุณที่รู้สึกดีๆ แบบนี้นะ";
  } else {
    reply = `ลิซ่าขอคิดก่อนนะ... อืมม ${message} ฟังดูน่าสนใจเลยค่ะ มีอะไรอยากเล่าอีกมั้ยคะ`;
  }

  res.status(200).json({ text: reply });
}
