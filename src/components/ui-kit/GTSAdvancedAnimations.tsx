/**
 * GTS Advanced Animations
 * Продвинутые анимационные компоненты с интересными эффектами
 * 
 * @module GTSAdvancedAnimations
 */

import React from 'react';
import { motion, HTMLMotionProps, useInView } from 'motion/react';
import { useRef } from 'react';
import { gtsAnimations } from '../../utils/gts-animations';

/**
 * 🎯 SCALE UP VIEW
 * Объект увеличивается с маленького размера при скролле
 */
interface GTSScaleUpViewProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  delay?: number;
  scale?: number; // начальный scale (по умолчанию 0.8)
  duration?: number;
}

export const GTSScaleUpView: React.FC<GTSScaleUpViewProps> = ({
  children,
  delay = 0,
  scale = 0.8,
  duration = 0.6,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.01, margin: "0px 0px 300px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // smooth
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 🌊 WAVE REVEAL
 * Элементы выезжают волной снизу вверх
 */
interface GTSWaveRevealProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  delay?: number;
  distance?: number; // расстояние подъема (px)
}

export const GTSWaveReveal: React.FC<GTSWaveRevealProps> = ({
  children,
  delay = 0,
  distance = 60,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.01, margin: "0px 0px 300px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.175, 0.885, 0.32, 1.275], // elastic
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 📐 PARALLAX SLIDE
 * Элемент выезжает с параллакс эффектом
 */
interface GTSParallaxSlideProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  distance?: number;
}

export const GTSParallaxSlide: React.FC<GTSParallaxSlideProps> = ({
  children,
  direction = 'up',
  delay = 0,
  distance = 80,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.01, margin: "0px 0px 300px 0px" });

  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
    }
  };

  const initial = getInitialPosition();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, ...initial, scale: 0.95 }
      }
      transition={{
        duration: 0.7,
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
 * 🎪 ROTATE REVEAL
 * Элемент появляется с вращением
 */
interface GTSRotateRevealProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  delay?: number;
  rotation?: number; // градусы вращения
}

export const GTSRotateReveal: React.FC<GTSRotateRevealProps> = ({
  children,
  delay = 0,
  rotation = -15,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, rotate: 0 }
          : { opacity: 0, scale: 0.8, rotate: rotation }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.68, -0.55, 0.265, 1.55], // bounce
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 💫 SPRING POP
 * Элемент "выпрыгивает" с пружинным эффектом
 */
interface GTSSpringPopProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  delay?: number;
}

export const GTSSpringPop: React.FC<GTSSpringPopProps> = ({
  children,
  delay = 0,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.01, margin: "0px 0px 300px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.3, y: 50 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.3, y: 50 }
      }
      transition={{
        duration: 0.6,
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 🎨 BLUR REVEAL
 * Элемент появляется с эффектом размытия
 */
interface GTSBlurRevealProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  delay?: number;
}

export const GTSBlurReveal: React.FC<GTSBlurRevealProps> = ({
  children,
  delay = 0,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.01, margin: "0px 0px 300px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      animate={
        isInView
          ? { opacity: 1, filter: 'blur(0px)', y: 0 }
          : { opacity: 0, filter: 'blur(10px)', y: 20 }
      }
      transition={{
        duration: 0.8,
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
 * 📦 LAYER STACK
 * Элементы выезжают из-под друг друга (stacked cards effect)
 */
interface GTSLayerStackProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}

export const GTSLayerStack: React.FC<GTSLayerStackProps> = ({
  children,
  staggerDelay = 0.1,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95, rotateX: 10 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
              : { opacity: 0, y: 30, scale: 0.95, rotateX: 10 }
          }
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ transformPerspective: 1000 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

/**
 * 🌈 GRADIENT REVEAL
 * Секция появляется с градиентной маской
 */
interface GTSGradientRevealProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

export const GTSGradientReveal: React.FC<GTSGradientRevealProps> = ({
  children,
  delay = 0,
  direction = 'bottom',
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const getClipPath = (progress: number) => {
    switch (direction) {
      case 'top':
        return `inset(${(1 - progress) * 100}% 0 0 0)`;
      case 'bottom':
        return `inset(0 0 ${(1 - progress) * 100}% 0)`;
      case 'left':
        return `inset(0 ${(1 - progress) * 100}% 0 0)`;
      case 'right':
        return `inset(0 0 0 ${(1 - progress) * 100}%)`;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: getClipPath(0) }}
      animate={
        isInView
          ? { opacity: 1, clipPath: getClipPath(1) }
          : { opacity: 0, clipPath: getClipPath(0) }
      }
      transition={{
        duration: 1,
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
 * 🎯 ZOOM BOUNCE
 * Элемент появляется с увеличением и отскоком
 */
interface GTSZoomBounceProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  delay?: number;
}

export const GTSZoomBounce: React.FC<GTSZoomBounceProps> = ({
  children,
  delay = 0,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{
        duration: 0.5,
        delay,
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 🔄 FLIP REVEAL
 * Элемент переворачивается при появлении
 */
interface GTSFlipRevealProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  delay?: number;
  axis?: 'x' | 'y';
}

export const GTSFlipReveal: React.FC<GTSFlipRevealProps> = ({
  children,
  delay = 0,
  axis = 'y',
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const rotation = axis === 'x' ? { rotateX: 90 } : { rotateY: 90 };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...rotation }}
      animate={
        isInView
          ? { opacity: 1, rotateX: 0, rotateY: 0 }
          : { opacity: 0, ...rotation }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ transformPerspective: 1000 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 🎪 MULTI-DIRECTION SLIDE
 * Дочерние элементы выезжают с разных сторон
 */
interface GTSMultiSlideProps {
  children: React.ReactNode[];
  pattern?: 'alternate' | 'wave' | 'random';
  staggerDelay?: number;
  className?: string;
}

export const GTSMultiSlide: React.FC<GTSMultiSlideProps> = ({
  children,
  pattern = 'alternate',
  staggerDelay = 0.1,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const getDirection = (index: number): 'left' | 'right' => {
    if (pattern === 'alternate') {
      return index % 2 === 0 ? 'left' : 'right';
    }
    if (pattern === 'wave') {
      return index % 3 === 0 ? 'left' : 'right';
    }
    return Math.random() > 0.5 ? 'left' : 'right';
  };

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => {
        const direction = getDirection(index);
        const xOffset = direction === 'left' ? -60 : 60;

        return (
          <motion.div
            initial={{ opacity: 0, x: xOffset, scale: 0.9 }}
            animate={
              isInView
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: xOffset, scale: 0.9 }
            }
            transition={{
              duration: 0.7,
              delay: index * staggerDelay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

/**
 * 🎨 EXPORT ALL
 */
export const GTSAdvancedAnimations = {
  ScaleUpView: GTSScaleUpView,
  WaveReveal: GTSWaveReveal,
  ParallaxSlide: GTSParallaxSlide,
  RotateReveal: GTSRotateReveal,
  SpringPop: GTSSpringPop,
  BlurReveal: GTSBlurReveal,
  LayerStack: GTSLayerStack,
  GradientReveal: GTSGradientReveal,
  ZoomBounce: GTSZoomBounce,
  FlipReveal: GTSFlipReveal,
  MultiSlide: GTSMultiSlide,
};

export default GTSAdvancedAnimations;