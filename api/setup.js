export default function handler(req, res) {
  const { gender } = req.body;
  const pronoun = gender === 'male' ? 'ผม' : gender === 'female' ? 'ดิฉัน' : 'ฉัน';
  const message = `สวัสดี ${pronoun} เป็น AI ส่วนตัวของคุณ โปรดกำหนด บุคลิก รูปร่าง หน้าตา ลักษณะนิสัย ความสามารถ หรือสิ่งที่คุณปรารถนา`;
  res.status(200).json({ message });
}
