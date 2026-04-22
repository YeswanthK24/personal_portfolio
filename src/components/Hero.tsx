"use client";

import { motion } from "framer-motion";
import HeroScene from "@/components/HeroScene";
import { profile } from "@/data/portfolio";

export default function Hero() {
  return (
    <section className="section-shell overflow-hidden pt-8 md:pt-10" id="home">
      <div className="section-orb section-orb--cyan -left-20 top-12 h-64 w-64" />
      <div className="section-orb section-orb--orange right-0 top-28 h-72 w-72" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <span className="status-pill">{profile.availability}</span>
          <p className="mt-7 text-sm uppercase tracking-[0.16em] text-white/55">Hello, I&apos;m</p>

          <h1 className="display-font mt-4 max-w-4xl text-5xl font-semibold leading-[0.94] tracking-tight text-white md:text-7xl">
            {profile.name}
          </h1>

          <p className="mt-4 text-lg font-medium uppercase tracking-[0.18em] text-cyan-100/72 md:text-xl">
            {profile.role}
          </p>

          <p className="muted-copy mt-7 max-w-2xl text-lg leading-8">{profile.intro}</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/82">{profile.subIntro}</p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              {profile.location}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              {profile.contacts.email}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#07111f] transition-transform hover:-translate-y-1"
            >
              View Projects
            </a>
            <a
              href={profile.contacts.resume}
              download
              className="rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-1 hover:bg-white/10"
            >
              Download Resume
            </a>
            <a
              href={profile.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-1 hover:bg-white/10"
            >
              GitHub
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {profile.focusAreas.map((focus) => (
              <span
                key={focus}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/72"
              >
                {focus}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="relative"
        >
          <HeroScene />
        </motion.div>
      </div>
    </section>
  );
}
