import { useEffect, useState } from "react";

const calcRemaining = (date) =>
  new Date(`${date}T00:00:00`).getTime() - Date.now();

const Countdown = ({ date }) => {
  // Tính ngay từ lần render đầu để không bị trống 1 giây
  const [remaining, setRemaining] = useState(() => calcRemaining(date));

  useEffect(() => {
    setRemaining(calcRemaining(date));
    const timer = setInterval(() => setRemaining(calcRemaining(date)), 1000);
    return () => clearInterval(timer);
  }, [date]);

  if (remaining <= 0) return <p>Sự kiện đã diễn ra</p>;

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return <p>{`Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`}</p>;
};

export default Countdown;
