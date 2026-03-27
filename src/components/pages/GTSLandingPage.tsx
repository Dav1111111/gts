// GTS Landing Page - All landing sections in one component

import React, { Component, Suspense, lazy, type ReactNode } from "react";
import { motion } from "motion/react";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { GTSHeroSection } from "../GTSHeroSection";
import { GTSFooter } from "../GTSFooter";
import { Route } from "../GTSRouter";

const GTSExpeditionsCalendar = lazy(() =>
  import("../GTSExpeditionsCalendar").then((module) => ({ default: module.GTSExpeditionsCalendar }))
);
const GTSAboutSection = lazy(() =>
  import("../GTSAboutSection").then((module) => ({ default: module.GTSAboutSection }))
);
const GTSTopOffersSection = lazy(() =>
  import("../GTSTopOffersSection").then((module) => ({ default: module.GTSTopOffersSection }))
);
const GTSExperiencesSection = lazy(() =>
  import("../GTSExperiencesSection").then((module) => ({ default: module.GTSExperiencesSection }))
);
const GTSLiveFeedSection = lazy(() =>
  import("../GTSLiveFeedSection").then((module) => ({ default: module.GTSLiveFeedSection }))
);
const GTSInteractiveMapSection = lazy(() =>
  import("../GTSInteractiveMapSection").then((module) => ({ default: module.GTSInteractiveMapSection }))
);
const GTSUnifiedTestimonialsSection = lazy(() =>
  import("../GTSUnifiedTestimonialsSection").then((module) => ({ default: module.GTSUnifiedTestimonialsSection }))
);
const GTSMembershipSection = lazy(() =>
  import("../GTSMembershipSection").then((module) => ({ default: module.GTSMembershipSection }))
);

interface GTSLandingPageProps {
  onNavigate: (route: any) => void;
}

class LandingSectionBoundary extends Component<
  { children: ReactNode; sectionName: string },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; sectionName: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(`Landing section failed: ${this.props.sectionName}`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="bg-[#0B0B0C] text-white px-6 py-16">
          <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg">Секция временно недоступна</div>
            <div className="mt-2 text-sm text-white/60">{this.props.sectionName}</div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

function LandingSectionLoader() {
  return (
    <section className="bg-[#0B0B0C] text-white px-6 py-16">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
        Загрузка секции...
      </div>
    </section>
  );
}

function LazyLandingSection({
  sectionName,
  children,
}: {
  sectionName: string;
  children: ReactNode;
}) {
  return (
    <LandingSectionBoundary sectionName={sectionName}>
      <Suspense fallback={<LandingSectionLoader />}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.div>
      </Suspense>
    </LandingSectionBoundary>
  );
}

export function GTSLandingPage({ onNavigate }: GTSLandingPageProps) {

  return (
    <div className="min-h-screen">
      <GTSNavigationHeader onNavigate={onNavigate} />

      <main>
        <section id="hero">
          <GTSHeroSection />
        </section>

        <section id="expeditions">
          <LazyLandingSection sectionName="Экспедиции">
            <GTSExpeditionsCalendar onNavigate={onNavigate} />
          </LazyLandingSection>
        </section>

        <section id="about">
          <LazyLandingSection sectionName="О клубе">
            <GTSAboutSection onNavigate={onNavigate} />
          </LazyLandingSection>
        </section>

        <section id="top-offers">
          <LazyLandingSection sectionName="Спецпредложения">
            <GTSTopOffersSection />
          </LazyLandingSection>
        </section>

        <section id="experiences">
          <LazyLandingSection sectionName="Впечатления">
            <GTSExperiencesSection />
          </LazyLandingSection>
        </section>

        <section id="live-feed">
          <LazyLandingSection sectionName="Лента">
            <GTSLiveFeedSection />
          </LazyLandingSection>
        </section>

        <section id="interactive-map">
          <LazyLandingSection sectionName="Карта">
            <GTSInteractiveMapSection />
          </LazyLandingSection>
        </section>

        <section id="testimonials">
          <LazyLandingSection sectionName="Отзывы">
            <GTSUnifiedTestimonialsSection />
          </LazyLandingSection>
        </section>

        <section id="membership">
          <LazyLandingSection sectionName="Членство">
            <GTSMembershipSection />
          </LazyLandingSection>
        </section>
      </main>

      <GTSFooter />
    </div>
  );
}
