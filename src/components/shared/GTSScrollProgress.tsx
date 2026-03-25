/**
 * GTS Scroll Progress Bar
 * Индикатор прогресса прокрутки страницы
 */

import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { gtsAnimations } from '../../utils/gts-animations';

interface GTSScrollProgressProps {
  position?: 'top' | 'bottom';
  height?: number;
  color?: string;
  className?: string;
}

export const GTSScrollProgress: React.FC<GTSScrollProgressProps> = ({
  position = 'top',
  height = 3,
  color = 'var(--gts-portal-accent)',
  className = '',
}) => {
  const { scrollYProgress } = useScroll();
  
  // Плавная анимация прогресса
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const positionClasses = position === 'top' 
    ? 'top-0' 
    : 'bottom-0';

  return (
    <motion.div
      className={`fixed left-0 right-0 ${positionClasses} z-50 origin-left ${className}`}
      style={{
        height: `${height}px`,
        scaleX,
        backgroundColor: color,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: gtsAnimations.durations.fast,
        ease: gtsAnimations.easing.out,
      }}
    />
  );
};

export default GTSScrollProgress;
