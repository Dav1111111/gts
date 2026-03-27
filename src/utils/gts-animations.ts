/**
 * GTS Animation Utilities
 * Централизованные настройки анимаций для Motion (Framer Motion)
 * 
 * @module gts-animations
 */

import { Variants } from 'motion/react';

/**
 * ⏱️ ANIMATION DURATIONS
 * Используют токены из design-tokens.css
 */
export const gtsDurations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
  slowest: 1.0,
} as const;

/**
 * 📐 EASING FUNCTIONS
 * Соответствуют токенам из design-tokens.css
 */
export const gtsEasing = {
  inOut: [0.4, 0, 0.2, 1],
  out: [0, 0, 0.2, 1],
  in: [0.4, 0, 1, 1],
  sharp: [0.4, 0, 0.6, 1],
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
} as const;

/**
 * 🎬 FADE ANIMATIONS
 */
export const gtsFadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: gtsDurations.normal,
      ease: gtsEasing.out,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * ⬆️ SLIDE UP ANIMATIONS
 */
export const gtsSlideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: gtsDurations.normal,
      ease: gtsEasing.out,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * ⬇️ SLIDE DOWN ANIMATIONS
 */
export const gtsSlideDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: gtsDurations.normal,
      ease: gtsEasing.out,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * ➡️ SLIDE LEFT ANIMATIONS
 */
export const gtsSlideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: gtsDurations.normal,
      ease: gtsEasing.out,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * ⬅️ SLIDE RIGHT ANIMATIONS
 */
export const gtsSlideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: gtsDurations.normal,
      ease: gtsEasing.out,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * 🔍 SCALE ANIMATIONS
 */
export const gtsScaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: gtsDurations.normal,
      ease: gtsEasing.out,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * 🎈 BOUNCE ANIMATIONS
 */
export const gtsBounceVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: gtsDurations.slow,
      ease: gtsEasing.bounce,
    },
  },
};

/**
 * 🌊 STAGGER CONTAINER
 * Для последовательной анимации дочерних элементов
 */
export const gtsStaggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

/**
 * 📦 STAGGER ITEM
 * Дочерние элементы для stagger контейнера
 */
export const gtsStaggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: gtsDurations.normal,
      ease: gtsEasing.out,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * 💫 MODAL/DIALOG ANIMATIONS
 */
export const gtsModalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: gtsDurations.normal,
      ease: gtsEasing.out,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * 🎭 BACKDROP ANIMATIONS
 */
export const gtsBackdropVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.out,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * 📱 DRAWER/SHEET ANIMATIONS (from bottom)
 */
export const gtsDrawerBottomVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: gtsDurations.normal,
      ease: gtsEasing.out,
    },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * 📱 DRAWER/SHEET ANIMATIONS (from right)
 */
export const gtsDrawerRightVariants: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: gtsDurations.normal,
      ease: gtsEasing.out,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * 📱 DRAWER/SHEET ANIMATIONS (from left)
 */
export const gtsDrawerLeftVariants: Variants = {
  hidden: {
    x: '-100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: gtsDurations.normal,
      ease: gtsEasing.out,
    },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * 🎯 HOVER ANIMATIONS
 * Для использования с whileHover
 */
export const gtsHoverLift = {
  y: -4,
  transition: {
    duration: gtsDurations.fast,
    ease: gtsEasing.out,
  },
};

export const gtsHoverScale = {
  scale: 1.02,
  transition: {
    duration: gtsDurations.fast,
    ease: gtsEasing.out,
  },
};

export const gtsHoverGlow = {
  boxShadow: '0 0 20px rgba(145, 4, 12, 0.3)',
  transition: {
    duration: gtsDurations.fast,
    ease: gtsEasing.out,
  },
};

/**
 * 👆 TAP ANIMATIONS
 * Для использования с whileTap
 */
export const gtsTapScale = {
  scale: 0.98,
  transition: {
    duration: gtsDurations.instant,
    ease: gtsEasing.inOut,
  },
};

export const gtsTapPress = {
  scale: 0.95,
  opacity: 0.8,
  transition: {
    duration: gtsDurations.instant,
    ease: gtsEasing.inOut,
  },
};

/**
 * 🌀 ROTATION ANIMATIONS
 */
export const gtsRotateVariants: Variants = {
  hidden: {
    opacity: 0,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: gtsDurations.slow,
      ease: gtsEasing.out,
    },
  },
};

/**
 * ✨ PAGE TRANSITION ANIMATIONS
 */
export const gtsPageVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: gtsDurations.normal,
      ease: gtsEasing.out,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * 🎪 CAROUSEL/SLIDER ANIMATIONS
 */
export const gtsCarouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

/**
 * 🔔 NOTIFICATION/TOAST ANIMATIONS
 */
export const gtsNotificationVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: gtsDurations.normal,
      ease: gtsEasing.bounce,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.8,
    transition: {
      duration: gtsDurations.fast,
      ease: gtsEasing.in,
    },
  },
};

/**
 * 📊 CHART/GRAPH ANIMATIONS
 */
export const gtsChartVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: gtsDurations.slower,
        ease: gtsEasing.inOut,
      },
      opacity: {
        duration: gtsDurations.fast,
        ease: gtsEasing.out,
      },
    },
  },
};

/**
 * 🎨 UTILITY FUNCTIONS
 */

/**
 * Создает задержку для анимации
 */
export const gtsDelay = (delay: number) => ({
  transition: {
    delay,
  },
});

/**
 * Создает пользовательский transition
 */
export const gtsCustomTransition = (
  duration: number,
  ease: number[] = [...gtsEasing.out],
  delay: number = 0
) => ({
  transition: {
    duration,
    ease,
    delay,
  },
});

/**
 * Preset для быстрой анимации списков с stagger эффектом
 */
export const gtsListAnimation = {
  container: gtsStaggerContainer,
  item: gtsStaggerItem,
};

/**
 * Preset для модальных окон
 */
export const gtsModalAnimation = {
  backdrop: gtsBackdropVariants,
  content: gtsModalVariants,
};

/**
 * Preset для drawer/sheet компонентов
 */
export const gtsDrawerAnimation = {
  backdrop: gtsBackdropVariants,
  bottom: gtsDrawerBottomVariants,
  right: gtsDrawerRightVariants,
  left: gtsDrawerLeftVariants,
};

/**
 * 🎯 PRESET CONFIGURATIONS
 * Готовые конфигурации для различных сценариев
 */
export const gtsAnimationPresets = {
  // Для карточек
  card: {
    variants: gtsScaleVariants,
    whileHover: gtsHoverLift,
    whileTap: gtsTapScale,
  },
  // Для кнопок
  button: {
    whileHover: { scale: 1.02 },
    whileTap: gtsTapPress,
    transition: { duration: gtsDurations.fast },
  },
  // Для страниц
  page: {
    variants: gtsPageVariants,
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
  },
  // Для списков
  list: {
    container: {
      variants: gtsStaggerContainer,
      initial: 'hidden',
      animate: 'visible',
      exit: 'exit',
    },
    item: {
      variants: gtsStaggerItem,
    },
  },
  // Для модалов
  modal: {
    backdrop: {
      variants: gtsBackdropVariants,
      initial: 'hidden',
      animate: 'visible',
      exit: 'exit',
    },
    content: {
      variants: gtsModalVariants,
      initial: 'hidden',
      animate: 'visible',
      exit: 'exit',
    },
  },
};

/**
 * 🎬 DEFAULT EXPORT
 * Все анимации в одном объекте для удобного импорта
 */
export const gtsAnimations = {
  durations: gtsDurations,
  easing: gtsEasing,
  variants: {
    fade: gtsFadeVariants,
    slideUp: gtsSlideUpVariants,
    slideDown: gtsSlideDownVariants,
    slideLeft: gtsSlideLeftVariants,
    slideRight: gtsSlideRightVariants,
    scale: gtsScaleVariants,
    bounce: gtsBounceVariants,
    modal: gtsModalVariants,
    backdrop: gtsBackdropVariants,
    drawer: {
      bottom: gtsDrawerBottomVariants,
      right: gtsDrawerRightVariants,
      left: gtsDrawerLeftVariants,
    },
    page: gtsPageVariants,
    notification: gtsNotificationVariants,
    chart: gtsChartVariants,
    rotate: gtsRotateVariants,
  },
  stagger: {
    container: gtsStaggerContainer,
    item: gtsStaggerItem,
  },
  hover: {
    lift: gtsHoverLift,
    scale: gtsHoverScale,
    glow: gtsHoverGlow,
  },
  tap: {
    scale: gtsTapScale,
    press: gtsTapPress,
  },
  presets: gtsAnimationPresets,
  utils: {
    delay: gtsDelay,
    custom: gtsCustomTransition,
  },
};

export default gtsAnimations;
