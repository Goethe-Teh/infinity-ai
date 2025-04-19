export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { messages } = req.body;

    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // ตรงนี้สามารถเปลี่ยนเป็นเรียก GPT API ได้ภายหลัง
    const fakeReply = {
      role: 'assistant',
      content: `Echo: ${lastUserMessage}`,
    };

    res.status(200).json({ choices: [{ message: fakeReply }] });
  } else {
    res.status(405).end();
  }
}
