'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CompletionConfettiProps {
  isCompleted: boolean;
}

const generateConfetti = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    startX: Math.random() * window.innerWidth,
    startY: -20,
    endX: Math.random() * window.innerWidth,
    endY: window.innerHeight + 20,
    rotation: Math.random() * 720 - 360,
    scale: Math.random() * 1 + 0.5,
    color: [
      '#FF0000',
      '#00FF00',
      '#0000FF',
      '#FFD700',
      '#FF69B4',
      '#4B0082',
      '#FF4500',
      '#00FFFF',
      '#FF1493',
      '#32CD32',
    ][Math.floor(Math.random() * 10)],
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2
  }));
};

export default function CompletionConfetti({ isCompleted }: CompletionConfettiProps) {
  const [confetti, setConfetti] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      setConfetti(generateConfetti(100));
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: particle.startX,
            y: particle.startY,
            scale: 0,
            rotate: 0,
            opacity: 1 
          }}
          animate={{ 
            x: particle.endX,
            y: particle.endY,
            scale: particle.scale,
            rotate: particle.rotation,
            opacity: 0 
          }}
          transition={{ 
            duration: particle.duration,
            ease: [0.32, 0, 0.67, 0],
            delay: particle.delay
          }}
          className="absolute"
          style={{ 
            width: Math.random() > 0.5 ? '12px' : '8px',
            height: Math.random() > 0.5 ? '12px' : '8px',
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            boxShadow: '0 0 10px rgba(255,255,255,0.3)'
          }}
        />
      ))}
    </div>
  );
} 