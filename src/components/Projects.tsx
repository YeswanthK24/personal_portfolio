"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { featuredProject, projects } from "@/data/portfolio";

export default function Projects() {
  const sideProjects = projects.filter((project) => project.title !== featuredProject.title);

  return (
    <section className="section-shell" id="projects">
      <div className="section-orb section-orb--cyan left-10 top-20 h-52 w-52" />
      <div className="section-orb section-orb--orange -right-10 top-1/2 h-64 w-64" />

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Projects"
          title="A few projects."
          description="Keeping this section simple and focused."
        />

        <div className="mt-14">
          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
            className="glass-panel depth-panel rounded-[1.5rem] p-0 sm:rounded-[2rem]"
          >
            <div className="grid h-full gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="relative min-h-[14rem] overflow-hidden sm:min-h-[19rem] lg:min-h-full">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1279px) 100vw, 46vw"
                  priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(7,17,31,0.16),rgba(7,17,31,0.78))]" />
                <div className="absolute bottom-5 left-5 rounded-full border border-white/12 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
                  {featuredProject.type}
                </div>
              </div>

              <div className="p-5 sm:p-8 md:p-10">
                <div className="depth-layer">
                  <p className="section-kicker">{featuredProject.period}</p>
                  <h3 className="display-font mt-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                    {featuredProject.title}
                  </h3>
                  <p className="mt-5 text-base leading-7 text-white/82">{featuredProject.summary}</p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {featuredProject.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-[1.15rem] border border-white/8 bg-black/20 px-4 py-4 text-sm leading-6 text-white/74"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {featuredProject.stack.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.14em] text-white/75"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {sideProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -10, rotateX: 3, rotateY: -3 }}
              className="glass-panel depth-panel rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6"
            >
              <div className="depth-layer">
                <div className="relative h-44 overflow-hidden rounded-[1.35rem] border border-white/8 bg-black/20">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1279px) 100vw, 46vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
                </div>

                <p className="section-kicker mt-6">{project.period}</p>
                <h3 className="display-font mt-3 text-2xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/76">{project.summary}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.7rem] uppercase tracking-[0.14em] text-white/72"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-1 hover:bg-white/10"
                    >
                      {link.label}
                    </a>
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
