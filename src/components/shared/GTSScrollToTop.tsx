/**
 * GTS Scroll To Top Button
 * Плавная кнопка прокрутки наверх с анимацией
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { gtsAnimations } from '../../utils/gts-animations';

interface GTSScrollToTopProps {
  showAfter?: number; // Показывать после прокрутки N пикселей
  className?: string;
}

export const GTSScrollToTop: React.FC<GTSScrollToTopProps> = ({
  showAfter = 400,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{
            duration: gtsAnimations.durations.fast,
            ease: gtsAnimations.easing.bounce,
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 20px rgba(145, 4, 12, 0.4)',
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={`
            fixed bottom-8 right-8 z-50
            w-12 h-12 md:w-14 md:h-14
            flex items-center justify-center
            bg-[var(--gts-portal-accent)] text-white
            rounded-full shadow-lg
            transition-shadow duration-200
            hover:shadow-2xl
            ${className}
          `}
          aria-label="Прокрутить наверх"
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default GTSScrollToTop;
