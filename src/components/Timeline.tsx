"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { journey } from "@/data/portfolio";

export default function Timeline() {
  return (
    <section className="section-shell" id="journey">
      <div className="section-orb section-orb--orange right-10 top-10 h-60 w-60" />
      <div className="section-orb section-orb--cyan -left-14 bottom-10 h-56 w-56" />

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Journey"
          title="From AI and data science study to enterprise Java full stack delivery."
          description="The updated story now shows academic grounding, internship work, Mphasis training, and internal projects with Spring, React, FastAPI, and AI-driven systems."
        />

        <div className="relative mx-auto mt-14 max-w-5xl">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-[linear-gradient(180deg,rgba(118,228,247,0.08),rgba(118,228,247,0.65),rgba(255,159,90,0.12))] md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10">
            {journey.map((item, index) => (
              <TimelineItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof journey)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-start ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <div className="hidden w-1/2 md:block" />

      <div className="absolute left-4 top-7 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#07111f] bg-cyan-300 shadow-[0_0_18px_rgba(118,228,247,0.65)] md:left-1/2">
        <div className="absolute inset-0 rounded-full bg-cyan-200 blur-sm opacity-60" />
      </div>

      <div
        className={`w-full pl-11 md:w-1/2 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}
      >
        <div className="glass-panel rounded-[1.75rem] p-6 md:p-7">
          <div className={`flex flex-col gap-2 ${isEven ? "md:items-end" : "md:items-start"}`}>
            <span className="w-fit rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-cyan-100/75">
              {item.period}
            </span>
            <h3 className="display-font text-2xl font-semibold text-white">{item.title}</h3>
          </div>

          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/52">{item.organisation}</p>
          <p className="mt-5 text-sm leading-7 text-white/76">{item.description}</p>

          <div className={`mt-6 flex flex-wrap gap-2 ${isEven ? "md:justify-end" : ""}`}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
