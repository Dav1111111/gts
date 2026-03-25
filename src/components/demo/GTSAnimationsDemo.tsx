/**
 * GTS Animations Demo
 * Демонстрация всех анимаций системы GTS
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  GTSAnimated,
  GTSStaggerList,
  GTSStaggerItem,
  GTSAnimatedCard,
  GTSAnimatedButton,
  GTSAnimatedModal,
  GTSAnimatedNotification,
  GTSFadeInView,
  AnimatePresence,
  GTSScaleUpView,
  GTSWaveReveal,
  GTSParallaxSlide,
  GTSRotateReveal,
  GTSSpringPop,
  GTSBlurReveal,
  GTSLayerStack,
  GTSZoomBounce,
  GTSFlipReveal,
  GTSMultiSlide,
} from '../ui-kit';
import { gtsAnimations } from '../../utils/gts-animations';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Star, Sparkles, Zap, Heart, TrendingUp, Award } from 'lucide-react';

export const GTSAnimationsDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeTab, setActiveTab] = useState<'css' | 'motion' | 'advanced' | 'components'>('advanced');

  const demoItems = [
    { id: 1, icon: Star, title: 'Анимация 1', desc: 'Первый элемент' },
    { id: 2, icon: Sparkles, title: 'Анимация 2', desc: 'Второй элемент' },
    { id: 3, icon: Zap, title: 'Анимация 3', desc: 'Третий элемент' },
    { id: 4, icon: Heart, title: 'Анимация 4', desc: 'Четвертый элемент' },
    { id: 5, icon: TrendingUp, title: 'Анимация 5', desc: 'Пятый элемент' },
    { id: 6, icon: Award, title: 'Анимация 6', desc: 'Шестой элемент' },
  ];

  return (
    <div className="min-h-screen bg-[var(--gts-portal-bg)] text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <GTSAnimated variant="slideDown">
          <div className="text-center mb-8">
            <h1 className="text-5xl mb-4 text-white">🎬 GTS Animations Demo</h1>
            <p className="text-xl text-white/70">
              Демонстрация всех анимаций системы Grand Tour Sochi
            </p>
          </div>
        </GTSAnimated>

        {/* Tabs */}
        <div className="flex gap-4 justify-center mb-12">
          {(['css', 'motion', 'advanced', 'components'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-[var(--gts-portal-accent)] text-white'
                  : 'bg-[var(--gts-portal-card)] text-white/70 hover:text-white'
              }`}
            >
              {tab === 'css' && 'CSS Анимации'}
              {tab === 'motion' && 'Motion Базовые'}
              {tab === 'advanced' && '🌟 Продвинутые'}
              {tab === 'components' && 'Компоненты'}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {/* CSS Animations Tab */}
          {activeTab === 'css' && (
            <motion.div
              key="css"
              variants={gtsAnimations.variants.fade}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Fade Animations */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">Fade Анимации</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg gts-animate-fade-in">
                    <h3 className="text-xl mb-2">Fade In</h3>
                    <p className="text-white/70">className="gts-animate-fade-in"</p>
                  </div>
                </div>
              </section>

              {/* Slide Animations */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">Slide Анимации</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg gts-animate-slide-up">
                    <h3 className="text-xl mb-2">↑ Slide Up</h3>
                    <p className="text-white/70 text-sm">gts-animate-slide-up</p>
                  </div>
                  <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg gts-animate-slide-down">
                    <h3 className="text-xl mb-2">↓ Slide Down</h3>
                    <p className="text-white/70 text-sm">gts-animate-slide-down</p>
                  </div>
                  <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg gts-animate-slide-left">
                    <h3 className="text-xl mb-2">← Slide Left</h3>
                    <p className="text-white/70 text-sm">gts-animate-slide-left</p>
                  </div>
                  <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg gts-animate-slide-right">
                    <h3 className="text-xl mb-2">→ Slide Right</h3>
                    <p className="text-white/70 text-sm">gts-animate-slide-right</p>
                  </div>
                </div>
              </section>

              {/* Hover Effects */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">Hover Эффекты</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg gts-hover-lift cursor-pointer">
                    <h3 className="text-xl mb-2">Lift</h3>
                    <p className="text-white/70 text-sm">gts-hover-lift</p>
                  </div>
                  <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg gts-hover-scale cursor-pointer">
                    <h3 className="text-xl mb-2">Scale</h3>
                    <p className="text-white/70 text-sm">gts-hover-scale</p>
                  </div>
                  <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg gts-hover-glow cursor-pointer border border-[var(--gts-portal-border)]">
                    <h3 className="text-xl mb-2">Glow</h3>
                    <p className="text-white/70 text-sm">gts-hover-glow</p>
                  </div>
                  <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg gts-hover-brightness cursor-pointer">
                    <h3 className="text-xl mb-2">Brightness</h3>
                    <p className="text-white/70 text-sm">gts-hover-brightness</p>
                  </div>
                </div>
              </section>

              {/* Infinite Animations */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">Бесконечные Анимации</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg">
                    <div className="gts-animate-pulse mb-4">
                      <Star className="w-12 h-12 text-[var(--gts-portal-accent)] mx-auto" />
                    </div>
                    <h3 className="text-xl mb-2 text-center">Pulse</h3>
                    <p className="text-white/70 text-sm text-center">gts-animate-pulse</p>
                  </div>
                  <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg">
                    <div className="gts-animate-spin mb-4">
                      <Sparkles className="w-12 h-12 text-[var(--gts-portal-accent)] mx-auto" />
                    </div>
                    <h3 className="text-xl mb-2 text-center">Spin</h3>
                    <p className="text-white/70 text-sm text-center">gts-animate-spin</p>
                  </div>
                  <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg border border-[var(--gts-portal-border)] gts-animate-glow">
                    <Zap className="w-12 h-12 text-[var(--gts-portal-accent)] mx-auto mb-4" />
                    <h3 className="text-xl mb-2 text-center">Glow</h3>
                    <p className="text-white/70 text-sm text-center">gts-animate-glow</p>
                  </div>
                  <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg">
                    <div className="gts-animate-float mb-4">
                      <Heart className="w-12 h-12 text-[var(--gts-portal-accent)] mx-auto" />
                    </div>
                    <h3 className="text-xl mb-2 text-center">Float</h3>
                    <p className="text-white/70 text-sm text-center">gts-animate-float</p>
                  </div>
                </div>
              </section>

              {/* Stagger Effect */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">Stagger Эффект (CSS)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {demoItems.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="p-6 bg-[var(--gts-portal-card)] rounded-lg gts-stagger-item"
                    >
                      <item.icon className="w-8 h-8 text-[var(--gts-portal-accent)] mb-3" />
                      <h3 className="text-xl mb-2">{item.title}</h3>
                      <p className="text-white/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* Motion Animations Tab */}
          {activeTab === 'motion' && (
            <motion.div
              key="motion"
              variants={gtsAnimations.variants.slideUp}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Motion Variants */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">Motion Variants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {['fade', 'slideUp', 'slideDown', 'scale', 'bounce'].map((variant, i) => (
                    <GTSAnimated
                      key={variant}
                      variant={variant as any}
                      delay={i * 0.1}
                    >
                      <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg">
                        <h3 className="text-xl mb-2 capitalize">{variant}</h3>
                        <p className="text-white/70 text-sm">
                          variant="{variant}"
                        </p>
                      </div>
                    </GTSAnimated>
                  ))}
                </div>
              </section>

              {/* Hover Interactions */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">Motion Hover Эффекты</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    whileHover={gtsAnimations.hover.lift}
                    className="p-6 bg-[var(--gts-portal-card)] rounded-lg cursor-pointer"
                  >
                    <h3 className="text-xl mb-2">Hover Lift</h3>
                    <p className="text-white/70 text-sm">whileHover=lift</p>
                  </motion.div>
                  <motion.div
                    whileHover={gtsAnimations.hover.scale}
                    className="p-6 bg-[var(--gts-portal-card)] rounded-lg cursor-pointer"
                  >
                    <h3 className="text-xl mb-2">Hover Scale</h3>
                    <p className="text-white/70 text-sm">whileHover=scale</p>
                  </motion.div>
                  <motion.div
                    whileHover={gtsAnimations.hover.glow}
                    className="p-6 bg-[var(--gts-portal-card)] rounded-lg cursor-pointer border border-[var(--gts-portal-border)]"
                  >
                    <h3 className="text-xl mb-2">Hover Glow</h3>
                    <p className="text-white/70 text-sm">whileHover=glow</p>
                  </motion.div>
                </div>
              </section>

              {/* Stagger with Motion */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">Motion Stagger</h2>
                <motion.div
                  variants={gtsAnimations.stagger.container}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {demoItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={gtsAnimations.stagger.item}
                      whileHover={gtsAnimations.hover.lift}
                      className="p-6 bg-[var(--gts-portal-card)] rounded-lg cursor-pointer"
                    >
                      <item.icon className="w-8 h-8 text-[var(--gts-portal-accent)] mb-3" />
                      <h3 className="text-xl mb-2">{item.title}</h3>
                      <p className="text-white/70">{item.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </section>
            </motion.div>
          )}

          {/* Advanced Animations Tab */}
          {activeTab === 'advanced' && (
            <motion.div
              key="advanced"
              variants={gtsAnimations.variants.scale}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Scale Up Animation */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">🎯 Scale Up (Увеличение)</h2>
                <p className="text-white/70 mb-6">Объекты плавно увеличиваются с маленького размера</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {demoItems.slice(0, 3).map((item, i) => (
                    <GTSScaleUpView key={item.id} scale={0.7} delay={i * 0.1}>
                      <div className="p-8 bg-[var(--gts-portal-card)] rounded-lg text-center">
                        <item.icon className="w-12 h-12 text-[var(--gts-portal-accent)] mx-auto mb-4" />
                        <h3 className="text-xl mb-2">{item.title}</h3>
                        <p className="text-white/70">{item.desc}</p>
                      </div>
                    </GTSScaleUpView>
                  ))}
                </div>
              </section>

              {/* Wave Reveal */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">🌊 Wave Reveal (Волна)</h2>
                <p className="text-white/70 mb-6">Элементы всплывают волной снизу вверх</p>
                <div className="space-y-4">
                  {demoItems.slice(0, 4).map((item, i) => (
                    <GTSWaveReveal key={item.id} delay={i * 0.1} distance={80}>
                      <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg flex items-center gap-4">
                        <item.icon className="w-8 h-8 text-[var(--gts-portal-accent)]" />
                        <div>
                          <h3 className="text-lg">{item.title}</h3>
                          <p className="text-white/70 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    </GTSWaveReveal>
                  ))}
                </div>
              </section>

              {/* Parallax Slide */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">📐 Parallax Slide (Параллакс)</h2>
                <p className="text-white/70 mb-6">Элементы выезжают с разных сторон</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GTSParallaxSlide direction="left" distance={100}>
                    <div className="p-8 bg-[var(--gts-portal-card)] rounded-lg">
                      <h3 className="text-xl mb-2">← Слева</h3>
                      <p className="text-white/70">direction="left"</p>
                    </div>
                  </GTSParallaxSlide>
                  <GTSParallaxSlide direction="right" distance={100}>
                    <div className="p-8 bg-[var(--gts-portal-card)] rounded-lg">
                      <h3 className="text-xl mb-2">→ Справа</h3>
                      <p className="text-white/70">direction="right"</p>
                    </div>
                  </GTSParallaxSlide>
                  <GTSParallaxSlide direction="up" distance={100}>
                    <div className="p-8 bg-[var(--gts-portal-card)] rounded-lg">
                      <h3 className="text-xl mb-2">↑ Снизу</h3>
                      <p className="text-white/70">direction="up"</p>
                    </div>
                  </GTSParallaxSlide>
                  <GTSParallaxSlide direction="down" distance={100}>
                    <div className="p-8 bg-[var(--gts-portal-card)] rounded-lg">
                      <h3 className="text-xl mb-2">↓ Сверху</h3>
                      <p className="text-white/70">direction="down"</p>
                    </div>
                  </GTSParallaxSlide>
                </div>
              </section>

              {/* Rotate Reveal */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">🎪 Rotate Reveal (Вращение)</h2>
                <p className="text-white/70 mb-6">Элементы появляются с вращением и отскоком</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {demoItems.slice(0, 3).map((item, i) => (
                    <GTSRotateReveal key={item.id} delay={i * 0.15} rotation={-20 + i * 10}>
                      <div className="p-8 bg-[var(--gts-portal-card)] rounded-lg text-center">
                        <item.icon className="w-12 h-12 text-[var(--gts-portal-accent)] mx-auto mb-4" />
                        <h3 className="text-xl mb-2">{item.title}</h3>
                        <p className="text-white/70">{item.desc}</p>
                      </div>
                    </GTSRotateReveal>
                  ))}
                </div>
              </section>

              {/* Spring Pop */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">💫 Spring Pop (Пружинный эффект)</h2>
                <p className="text-white/70 mb-6">Элементы "выпрыгивают" с пружинной анимацией</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {demoItems.map((item, i) => (
                    <GTSSpringPop key={item.id} delay={i * 0.1}>
                      <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg text-center">
                        <item.icon className="w-10 h-10 text-[var(--gts-portal-accent)] mx-auto mb-3" />
                        <h3 className="text-lg mb-1">{item.title}</h3>
                        <p className="text-white/70 text-sm">{item.desc}</p>
                      </div>
                    </GTSSpringPop>
                  ))}
                </div>
              </section>

              {/* Blur Reveal */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">🎨 Blur Reveal (Размытие)</h2>
                <p className="text-white/70 mb-6">Появление с эффектом размытия</p>
                <GTSBlurReveal>
                  <div className="p-12 bg-[var(--gts-portal-card)] rounded-lg text-center">
                    <Sparkles className="w-16 h-16 text-[var(--gts-portal-accent)] mx-auto mb-4" />
                    <h3 className="text-2xl mb-4">Blur Reveal Effect</h3>
                    <p className="text-white/70 text-lg">
                      Контент плавно появляется из размытия
                    </p>
                  </div>
                </GTSBlurReveal>
              </section>

              {/* Layer Stack */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">📦 Layer Stack (Карты из колоды)</h2>
                <p className="text-white/70 mb-6">Элементы выезжают из-под друг друга</p>
                <GTSLayerStack staggerDelay={0.15}>
                  {demoItems.slice(0, 4).map((item) => (
                    <div key={item.id} className="p-8 bg-[var(--gts-portal-card)] rounded-lg mb-4 flex items-center gap-4">
                      <item.icon className="w-10 h-10 text-[var(--gts-portal-accent)]" />
                      <div>
                        <h3 className="text-xl mb-1">{item.title}</h3>
                        <p className="text-white/70">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </GTSLayerStack>
              </section>

              {/* Zoom Bounce */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">🎯 Zoom Bounce (Отскок)</h2>
                <p className="text-white/70 mb-6">Быстрое увеличение с отскоком</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {demoItems.slice(0, 3).map((item, i) => (
                    <GTSZoomBounce key={item.id} delay={i * 0.1}>
                      <div className="p-8 bg-[var(--gts-portal-card)] rounded-lg text-center border-2 border-[var(--gts-portal-accent)]">
                        <item.icon className="w-12 h-12 text-[var(--gts-portal-accent)] mx-auto mb-4" />
                        <h3 className="text-xl mb-2">{item.title}</h3>
                        <p className="text-white/70">{item.desc}</p>
                      </div>
                    </GTSZoomBounce>
                  ))}
                </div>
              </section>

              {/* Flip Reveal */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">🔄 Flip Reveal (Переворот)</h2>
                <p className="text-white/70 mb-6">Элементы переворачиваются при появлении</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GTSFlipReveal axis="y" delay={0}>
                    <div className="p-10 bg-[var(--gts-portal-card)] rounded-lg text-center">
                      <h3 className="text-xl mb-2">Flip Y-axis</h3>
                      <p className="text-white/70">axis="y"</p>
                    </div>
                  </GTSFlipReveal>
                  <GTSFlipReveal axis="x" delay={0.2}>
                    <div className="p-10 bg-[var(--gts-portal-card)] rounded-lg text-center">
                      <h3 className="text-xl mb-2">Flip X-axis</h3>
                      <p className="text-white/70">axis="x"</p>
                    </div>
                  </GTSFlipReveal>
                </div>
              </section>

              {/* Multi-Direction Slide */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">🎪 Multi-Direction (Разные стороны)</h2>
                <p className="text-white/70 mb-6">Элементы выезжают с чередующихся сторон</p>
                <GTSMultiSlide pattern="alternate" staggerDelay={0.1}>
                  {demoItems.map((item) => (
                    <div key={item.id} className="p-6 bg-[var(--gts-portal-card)] rounded-lg mb-4 flex items-center gap-4">
                      <item.icon className="w-8 h-8 text-[var(--gts-portal-accent)]" />
                      <div>
                        <h3 className="text-lg">{item.title}</h3>
                        <p className="text-white/70 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </GTSMultiSlide>
              </section>
            </motion.div>
          )}

          {/* Components Tab */}
          {activeTab === 'components' && (
            <motion.div
              key="components"
              variants={gtsAnimations.variants.scale}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Animated Cards */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">GTSAnimatedCard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {demoItems.slice(0, 3).map((item) => (
                    <GTSAnimatedCard
                      key={item.id}
                      interactive
                      className="p-6 bg-[var(--gts-portal-card)] rounded-lg"
                    >
                      <item.icon className="w-10 h-10 text-[var(--gts-portal-accent)] mb-4" />
                      <h3 className="text-xl mb-2">{item.title}</h3>
                      <p className="text-white/70">{item.desc}</p>
                    </GTSAnimatedCard>
                  ))}
                </div>
              </section>

              {/* Animated Buttons */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">GTSAnimatedButton</h2>
                <div className="flex flex-wrap gap-4">
                  <GTSAnimatedButton
                    variant="default"
                    className="px-6 py-3 bg-[var(--gts-portal-accent)] text-white rounded-lg"
                  >
                    Default Button
                  </GTSAnimatedButton>
                  <GTSAnimatedButton
                    variant="scale"
                    className="px-6 py-3 bg-[var(--gts-portal-card)] text-white border border-[var(--gts-portal-border)] rounded-lg"
                  >
                    Scale Button
                  </GTSAnimatedButton>
                  <GTSAnimatedButton
                    variant="glow"
                    className="px-6 py-3 bg-[var(--gts-portal-accent)] text-white rounded-lg border border-[var(--gts-portal-accent)]"
                  >
                    Glow Button
                  </GTSAnimatedButton>
                </div>
              </section>

              {/* Stagger List */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">GTSStaggerList</h2>
                <GTSStaggerList staggerDelay={0.1}>
                  {demoItems.map((item) => (
                    <GTSStaggerItem key={item.id}>
                      <div className="p-6 bg-[var(--gts-portal-card)] rounded-lg mb-4">
                        <div className="flex items-center gap-4">
                          <item.icon className="w-8 h-8 text-[var(--gts-portal-accent)]" />
                          <div>
                            <h3 className="text-xl">{item.title}</h3>
                            <p className="text-white/70">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    </GTSStaggerItem>
                  ))}
                </GTSStaggerList>
              </section>

              {/* Modal */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">GTSAnimatedModal</h2>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-[var(--gts-portal-accent)]"
                >
                  Открыть модальное окно
                </Button>

                <AnimatePresence>
                  <GTSAnimatedModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    className="p-8 bg-[var(--gts-portal-surface)] rounded-xl max-w-md border border-[var(--gts-portal-border)]"
                  >
                    <h2 className="text-2xl mb-4">Модальное окно</h2>
                    <p className="text-white/70 mb-6">
                      Это пример анимированного модального окна с плавными переходами
                    </p>
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      className="w-full bg-[var(--gts-portal-accent)]"
                    >
                      Закрыть
                    </Button>
                  </GTSAnimatedModal>
                </AnimatePresence>
              </section>

              {/* Notification */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">GTSAnimatedNotification</h2>
                <Button
                  onClick={() => {
                    setShowNotification(true);
                    setTimeout(() => setShowNotification(false), 3000);
                  }}
                  className="px-6 py-3 bg-[var(--gts-portal-accent)]"
                >
                  Показать уведомление
                </Button>

                <AnimatePresence>
                  {showNotification && (
                    <GTSAnimatedNotification className="fixed top-4 right-4 p-4 bg-[var(--gts-portal-surface)] rounded-lg border border-[var(--gts-portal-border)] shadow-lg max-w-sm z-50">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-[var(--gts-portal-accent)] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium mb-1">Уведомление!</h3>
                          <p className="text-sm text-white/70">
                            Это анимированное уведомление появляется с bounce эффектом
                          </p>
                        </div>
                      </div>
                    </GTSAnimatedNotification>
                  )}
                </AnimatePresence>
              </section>

              {/* FadeInView */}
              <section className="mb-16">
                <h2 className="text-3xl mb-6">GTSFadeInView (Scroll Animation)</h2>
                <p className="text-white/70 mb-6">
                  Прокрутите вниз, чтобы увидеть элементы, появляющиеся при скролле
                </p>
                <div className="space-y-8">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <GTSFadeInView key={num} delay={num * 0.05}>
                      <div className="p-8 bg-[var(--gts-portal-card)] rounded-lg">
                        <h3 className="text-2xl mb-2">Секция {num}</h3>
                        <p className="text-white/70">
                          Появляется при скролле в зону видимости
                        </p>
                      </div>
                    </GTSFadeInView>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-4 bg-[var(--gts-portal-accent)] text-white rounded-full shadow-lg z-50"
      >
        ↑
      </motion.button>
    </div>
  );
};

export default GTSAnimationsDemo;
