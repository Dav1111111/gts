/**
 * GTS Scroll Animation - Оптимизированный компонент для анимаций при скролле
 * Использует уменьшенный порог срабатывания для более раннего запуска
 * 
 * @module GTSScrollAnimation
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

/**
 * Универсальный компонент для анимаций при скролле
 * 
 * @example
 * ```tsx
 * <GTSScrollAnimation delay={0.1}>
 *   <Card>Контент</Card>
 * </GTSScrollAnimation>
 * 
 * <GTSScrollAnimation variant="slideUp" stagger={0.05}>
 *   <Card>Карточка 1</Card>
 * </GTSScrollAnimation>
 * ```
 */

interface GTSScrollAnimationProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  /** Вариант анимации */
  variant?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'scaleUp';
  /** Задержка в секундах */
  delay?: number;
  /** Длительность анимации */
  duration?: number;
  /** Порог видимости для срабатывания (0-1) */
  threshold?: number;
  /** Расстояние для slide анимаций */
  distance?: number;
  /** Начальный scale для scale анимаций */
  initialScale?: number;
}

export const GTSScrollAnimation: React.FC<GTSScrollAnimationProps> = ({
  children,
  variant = 'fade',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  distance = 30,
  initialScale = 0.9,
  ...props
}) => {
  // Варианты анимаций
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: distance },
      animate: { opacity: 1, y: 0 },
    },
    slideDown: {
      initial: { opacity: 0, y: -distance },
      animate: { opacity: 1, y: 0 },
    },
    slideLeft: {
      initial: { opacity: 0, x: distance },
      animate: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: -distance },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: initialScale },
      animate: { opacity: 1, scale: 1 },
    },
    scaleUp: {
      initial: { opacity: 0, scale: initialScale, y: distance / 2 },
      animate: { opacity: 1, scale: 1, y: 0 },
    },
  };

  const selectedVariant = variants[variant];

  return (
    <motion.div
      initial={selectedVariant.initial}
      whileInView={selectedVariant.animate}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Компонент для списков с автоматическим stagger эффектом
 * 
 * @example
 * ```tsx
 * <GTSScrollAnimationList stagger={0.05}>
 *   {items.map(item => (
 *     <Card key={item.id}>{item.name}</Card>
 *   ))}
 * </GTSScrollAnimationList>
 * ```
 */

interface GTSScrollAnimationListProps {
  children: React.ReactNode[];
  variant?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  /** Задержка между элементами в секундах */
  stagger?: number;
  /** Базовая задержка перед началом анимации */
  baseDelay?: number;
  /** Порог видимости */
  threshold?: number;
  /** Класс контейнера */
  className?: string;
}

export const GTSScrollAnimationList: React.FC<GTSScrollAnimationListProps> = ({
  children,
  variant = 'slideUp',
  stagger = 0.05,
  baseDelay = 0,
  threshold = 0.1,
  className = '',
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <GTSScrollAnimation
          key={index}
          variant={variant}
          delay={baseDelay + index * stagger}
          threshold={threshold}
        >
          {child}
        </GTSScrollAnimation>
      ))}
    </div>
  );
};

export default GTSScrollAnimation;
