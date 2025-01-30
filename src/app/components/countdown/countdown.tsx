// src/components/Countdown.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../../styles/countdown.module.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = +new Date(targetDate) - +new Date();
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export default function Countdown() {
  const weddingDate = "2025-06-15T00:00:00"; // 📅 Define a data do casamento
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(weddingDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className={styles.countdown}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.timer}>
        <div>
          <span>{timeLeft.days}</span>
          <p>Dias</p>
        </div>
        <div>
          <span>{timeLeft.hours}</span>
          <p>Horas</p>
        </div>
        <div>
          <span>{timeLeft.minutes}</span>
          <p>Minutos</p>
        </div>
        <div>
          <span>{timeLeft.seconds}</span>
          <p>Segundos</p>
        </div>
      </div>
    </motion.div>
  );
}
