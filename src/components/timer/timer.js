import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './timer.css';

function Timer(props) {
  const { timer } = props;

  const [timeAgo, setTimeAgo] = useState('');

  const time = new Date(timer);
  const year = time.getFullYear();
  const month = time.getMonth(); // 0–11 (январь = 0)
  const day = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  useEffect(() => {
    // Первоначальное обновление
    setTimeAgo(formatDistanceToNow(new Date(year, month, day, hours, minutes, seconds), { includeSeconds: true }));

    // Обновление каждую секунду
    const interval = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(year, month, day, hours, minutes, seconds), { includeSeconds: true }));
    }, 5000);

    // Очистка интервала при размонтировании
    return () => clearInterval(interval);
  }, [timer]); // Зависимость от пропса date

  return <span>{timeAgo}</span>;
}

export default Timer;
