"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { skillGroups } from "@/data/portfolio";

export default function Skills() {
  return (
    <section className="section-shell" id="skills">
      <div className="section-orb section-orb--cyan -left-16 top-16 h-56 w-56" />
      <div className="section-orb section-orb--orange right-0 top-32 h-56 w-56" />

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Skills"
          title="Core skills."
          description="Short and focused."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, idx) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
              className="glass-panel depth-panel rounded-[1.75rem] p-7"
            >
              <div className="depth-layer">
                <p className="section-kicker">{group.title}</p>
                <p className="mt-4 text-sm leading-6 text-white/72">{group.caption}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.13em] text-white/75"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
