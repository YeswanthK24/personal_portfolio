"use client";

import { motion } from "framer-motion";
import HeroScene from "@/components/HeroScene";
import { profile } from "@/data/portfolio";

export default function Hero() {
  return (
    <section className="section-shell overflow-hidden pb-20 pt-6 sm:pt-8 md:pt-10" id="home">
      <div className="section-orb section-orb--cyan -left-20 top-12 h-64 w-64" />
      <div className="section-orb section-orb--orange right-0 top-28 h-72 w-72" />

      <div className="mx-auto grid max-w-7xl gap-8 md:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <span className="status-pill">{profile.availability}</span>
          <p className="mt-7 text-sm uppercase tracking-[0.16em] text-white/55">Hello, I&apos;m</p>

          <h1 className="display-font mt-4 max-w-4xl text-3xl font-semibold leading-[0.96] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-7xl">
            {profile.name}
          </h1>

          <p className="mt-4 text-base font-medium uppercase tracking-[0.18em] text-cyan-100/72 sm:text-lg md:text-xl">
            {profile.role}
          </p>

          <p className="muted-copy mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">
            {profile.intro}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82 sm:text-base">
            {profile.subIntro}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              {profile.location}
            </span>
            <span className="max-w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 break-all sm:break-normal">
              {profile.contacts.email}
            </span>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#projects" className="button-primary w-full sm:w-auto">
              View Projects
            </a>
            <a
              href={profile.contacts.resume}
              download
              className="button-secondary w-full sm:w-auto"
            >
              Download Resume
            </a>
            <a
              href={profile.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary w-full sm:w-auto"
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
          className="relative order-first lg:order-none lg:pl-4"
        >
          <HeroScene />
        </motion.div>
      </div>
    </section>
  );
}
