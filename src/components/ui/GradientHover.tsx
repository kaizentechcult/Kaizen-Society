'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GradientHoverProps {
  children: React.ReactNode;
  className?: string;
}

const GradientHover = ({ children, className = '' }: GradientHoverProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        animate={{
          opacity: isHovered ? 0.15 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(139, 92, 246), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

export default GradientHover; 