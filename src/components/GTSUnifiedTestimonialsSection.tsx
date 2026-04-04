import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, Play, Heart, MessageCircle, Share2, Calendar, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useCMS } from "../cms/CMSProvider";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "fill-[#91040C] text-[#91040C]" : "text-white/15"}`}
        />
      ))}
    </div>
  );
}

export function GTSUnifiedTestimonialsSection() {
  const { data: { reviews, guestStories: stories } } = useCMS();
  const [activeTab, setActiveTab] = useState<"reviews" | "stories">("reviews");

  return (
    <section className="py-20 lg:py-28 bg-[#0B0B0C]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#91040C" }} />
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#91040C" }}>
              Реальные впечатления
            </span>
          </div>
          <h2
            className="font-black uppercase leading-none text-white"
            style={{ fontSize: "clamp(32px, 5vw, 72px)", letterSpacing: "-0.02em" }}
          >
            Отзывы и{" "}
            <span style={{ color: "#91040C" }}>истории гостей</span>
          </h2>
        </motion.div>

        {/* Tab bar */}
        <div className="flex gap-px mb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          {(["reviews", "stories"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 py-3 text-xs uppercase tracking-[0.3em] font-semibold transition-colors relative"
              style={{
                color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.35)",
                borderBottom: activeTab === tab ? "2px solid #91040C" : "2px solid transparent",
                marginBottom: -1,
                background: "transparent",
              }}
            >
              {tab === "reviews" ? "Отзывы клиентов" : "Истории гостей"}
            </button>
          ))}
        </div>

        {/* Reviews */}
        {activeTab === "reviews" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-[#0B0B0C] p-6 lg:p-8 flex flex-col gap-5"
              >
                {/* Author */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 overflow-hidden" style={{ background: "rgba(145,4,12,0.15)" }}>
                    <ImageWithFallback
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white text-sm font-semibold truncate">{review.name}</span>
                      <span className="text-white/25 text-[10px] flex-shrink-0 ml-2">{review.date}</span>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                </div>

                {/* Text */}
                <p className="text-white/55 text-sm leading-relaxed flex-1">{review.text}</p>

                {/* Service tag */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[9px] uppercase tracking-[0.3em] font-semibold px-2.5 py-1"
                    style={{ color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {review.service}
                  </span>
                  {review.verified && (
                    <span
                      className="text-[9px] uppercase tracking-[0.25em] font-bold px-2.5 py-1"
                      style={{ color: "#91040C", border: "1px solid rgba(145,4,12,0.3)" }}
                    >
                      Проверено
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stories */}
        {activeTab === "stories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {stories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-[#0B0B0C] flex flex-col"
              >
                {/* Story Header */}
                <div className="p-4 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-8 h-8 flex-shrink-0 overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <ImageWithFallback
                      src={story.avatar}
                      alt={story.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-semibold truncate">{story.author}</div>
                    <div className="flex items-center gap-2 text-[10px] text-white/30 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {story.date}
                      {story.location && (
                        <>
                          <span>·</span>
                          <MapPin className="w-3 h-3" />
                          {story.location}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={story.content}
                    alt={story.caption}
                    className="w-full h-full object-cover"
                  />
                  {story.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-10 h-10 bg-white/90 flex items-center justify-center">
                        <Play className="w-4 h-4 text-black ml-0.5" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span
                      className="text-[9px] uppercase tracking-[0.25em] font-bold px-2 py-0.5 text-white"
                      style={{ background: "rgba(0,0,0,0.72)" }}
                    >
                      {story.service}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 flex-1 flex flex-col gap-3">
                  <p className="text-white/50 text-xs leading-relaxed flex-1">{story.caption}</p>
                  <div className="flex items-center justify-between text-white/30 text-xs">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5" />
                        {story.likes}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {story.comments}
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase tracking-widest">Поделиться</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-white/35 text-sm">
            {activeTab === "reviews"
              ? "Поделитесь своими впечатлениями о поездке с GTS"
              : "Отметьте нас в своих фото и видео — @grandtoursochi"}
          </p>
          <div className="flex gap-3">
            <button
              className="px-6 py-3 text-xs uppercase tracking-[0.3em] font-semibold text-white/50 transition-colors hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
            >
              {activeTab === "reviews" ? "Оставить отзыв" : "Загрузить фото"}
            </button>
            <button
              className="px-6 py-3 text-xs uppercase tracking-[0.3em] font-semibold text-white transition-colors"
              style={{ background: "#91040C" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#6d0309")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#91040C")}
            >
              Посмотреть все
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
