export default async function handler(req, res) {
  try {
    const { message, gender } = req.body;

    const name =
      gender === 'female'
        ? 'Star'
        : gender === 'male'
        ? 'Sky'
        : 'Space';

    const reply = `ขอบคุณที่บอกมานะคะ ฉันชื่อ ${name} ยินดีคุยกับคุณเสมอเลย~ ข้อความของคุณคือ: "${message}"`;

    res.status(200).json({ text: reply });
  } catch (error) {
    res.status(500).json({ text: 'ขอโทษค่ะ เกิดข้อผิดพลาดในการตอบกลับ' });
  }
}
