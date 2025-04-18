mport { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // เปลี่ยนภาษาตรงนี้ได้ตามต้องการ ('th', 'en', ฯลฯ)
    router.push(`/chat?language=th`);
  }, []);

  return <p>กำลังโหลด...</p>;
}
