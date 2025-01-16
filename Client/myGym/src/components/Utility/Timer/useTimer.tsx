import { useState, useEffect, useRef } from "react";

export const useTimer = () => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const intervalRef = useRef<number | null>(null);

  const startTimer = () => {
    if (intervalRef.current) return; // Evita múltiplos intervalos

    intervalRef.current = window.setInterval(() => {
      setTime((prevTime) => {
        let { seconds, minutes, hours } = prevTime;

        seconds++;

        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }

        if (minutes === 60) {
          minutes = 0;
          hours++;
        }

        return { seconds, minutes, hours };
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime({ seconds: 0, minutes: 0, hours: 0 });
  };

  useEffect(() => {
    return () => stopTimer(); // Limpa o intervalo ao desmontar o componente
  }, []);

  return { time, startTimer, stopTimer, resetTimer };
};
