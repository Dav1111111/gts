/**
 * GTS Animated Components
 * Обёртки для удобного использования анимаций в приложении
 * 
 * @module GTSAnimated
 */

import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'motion/react';
import { gtsAnimations } from '../../utils/gts-animations';

/**
 * 🎬 BASE ANIMATED COMPONENT
 */
interface GTSAnimatedProps extends HTMLMotionProps<'div'> {
  variant?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'bounce';
  delay?: number;
  children: React.ReactNode;
}

export const GTSAnimated: React.FC<GTSAnimatedProps> = ({
  variant = 'fade',
  delay = 0,
  children,
  ...props
}) => {
  const variants = gtsAnimations.variants[variant];

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 📦 STAGGER LIST
 */
interface GTSStaggerListProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerDelay?: number;
}

export const GTSStaggerList: React.FC<GTSStaggerListProps> = ({
  children,
  staggerDelay = 0.05,
  ...props
}) => {
  const containerVariants: Variants = {
    ...gtsAnimations.stagger.container,
    visible: {
      ...gtsAnimations.stagger.container.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 📄 STAGGER ITEM
 */
interface GTSStaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export const GTSStaggerItem: React.FC<GTSStaggerItemProps> = ({
  children,
  ...props
}) => {
  return (
    <motion.div
      variants={gtsAnimations.stagger.item}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 🎴 ANIMATED CARD
 */
interface GTSAnimatedCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  interactive?: boolean;
}

export const GTSAnimatedCard: React.FC<GTSAnimatedCardProps> = ({
  children,
  interactive = true,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      variants={gtsAnimations.variants.scale}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={interactive ? gtsAnimations.hover.lift : undefined}
      whileTap={interactive ? gtsAnimations.tap.scale : undefined}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 🔘 ANIMATED BUTTON
 */
interface GTSAnimatedButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'default' | 'scale' | 'glow';
}

export const GTSAnimatedButton: React.FC<GTSAnimatedButtonProps> = ({
  children,
  variant = 'default',
  ...props
}) => {
  const hoverAnimation = variant === 'glow' 
    ? gtsAnimations.hover.glow 
    : gtsAnimations.hover.scale;

  return (
    <motion.button
      whileHover={hoverAnimation}
      whileTap={gtsAnimations.tap.press}
      {...props}
    >
      {children}
    </motion.button>
  );
};

/**
 * 📄 ANIMATED PAGE
 */
interface GTSAnimatedPageProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export const GTSAnimatedPage: React.FC<GTSAnimatedPageProps> = ({
  children,
  ...props
}) => {
  return (
    <motion.div
      variants={gtsAnimations.variants.page}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 💫 ANIMATED MODAL
 */
interface GTSAnimatedModalProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const GTSAnimatedModal: React.FC<GTSAnimatedModalProps> = ({
  children,
  isOpen,
  onClose,
  ...props
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        variants={gtsAnimations.variants.backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50"
      />
      {/* Modal Content */}
      <motion.div
        variants={gtsAnimations.variants.modal}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

/**
 * 🔔 ANIMATED NOTIFICATION
 */
interface GTSAnimatedNotificationProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export const GTSAnimatedNotification: React.FC<GTSAnimatedNotificationProps> = ({
  children,
  ...props
}) => {
  return (
    <motion.div
      variants={gtsAnimations.variants.notification}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 🌊 FADE IN VIEW
 * Анимация при скролле в зону видимости
 */
interface GTSFadeInViewProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
}

export const GTSFadeInView: React.FC<GTSFadeInViewProps> = ({
  children,
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: gtsAnimations.durations.normal,
        delay,
        ease: gtsAnimations.easing.out,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * 🔄 ANIMATED PRESENCE WRAPPER
 */
export { AnimatePresence } from 'motion/react';

/**
 * 🎨 EXPORT ALL
 */
export const GTSAnimatedComponents = {
  Animated: GTSAnimated,
  StaggerList: GTSStaggerList,
  StaggerItem: GTSStaggerItem,
  Card: GTSAnimatedCard,
  Button: GTSAnimatedButton,
  Page: GTSAnimatedPage,
  Modal: GTSAnimatedModal,
  Notification: GTSAnimatedNotification,
  FadeInView: GTSFadeInView,
};

export default GTSAnimatedComponents;
