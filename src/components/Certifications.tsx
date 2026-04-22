"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { certifications } from "@/data/portfolio";

export default function Certifications() {
  return (
    <section className="section-shell" id="certifications">
      <div className="section-orb section-orb--cyan left-10 top-12 h-52 w-52" />
      <div className="section-orb section-orb--orange right-10 bottom-12 h-56 w-56" />

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Certifications"
          title="Talent Next learning plus analytics, AWS, and deep learning foundations."
          description="This section combines internal Mphasis training with the certifications already present in the resume."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {certifications.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
              className="glass-panel depth-panel rounded-[1.75rem] p-7"
            >
              <div className="depth-layer">
                <p className="section-kicker">{item.period}</p>
                <h3 className="display-font mt-4 text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/56">
                  {item.issuer}
                </p>
                <p className="mt-5 text-sm leading-7 text-white/76">{item.note}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
