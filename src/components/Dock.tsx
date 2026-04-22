"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type SVGProps } from "react";

const Icons = {
  Home: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  ),
  Code: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
  ),
  Zap: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  ),
  Star: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
  ),
  Mail: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
  ),
  FileText: (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>
  ),
};

const DOCK_ITEMS = [
  { id: "home", icon: Icons.Home, label: "Home", href: "#home" },
  { id: "projects", icon: Icons.Code, label: "Projects", href: "#projects" },
  { id: "skills", icon: Icons.Zap, label: "Skills", href: "#skills" },
  { id: "contact", icon: Icons.Mail, label: "Contact", href: "#contact" },
  { id: "github", icon: Icons.Star, label: "GitHub", href: "https://github.com/YeswanthK24", external: true },
  { id: "resume", icon: Icons.FileText, label: "Resume", href: "/Yeswanth_K_Resume.pdf", external: true },
];

export default function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(event) => mouseX.set(event.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-4 left-1/2 z-50 flex h-16 w-[calc(100%-1.5rem)] max-w-[52rem] -translate-x-1/2 items-end gap-3 overflow-x-auto rounded-[1.6rem] border border-white/10 bg-[#07121f]/70 px-4 pb-3 backdrop-blur-xl md:bottom-6 md:w-auto"
    >
      {DOCK_ITEMS.map((item) => (
        <DockIcon key={item.id} mouseX={mouseX} item={item} />
      ))}
    </motion.div>
  );
}

function DockIcon({
  mouseX,
  item,
}: {
  mouseX: MotionValue<number>;
  item: (typeof DOCK_ITEMS)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <a href={item.href} target={item.external ? "_blank" : undefined} rel="noopener noreferrer">
      <motion.div
        ref={ref}
        style={{ width }}
        className="group relative flex aspect-square w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/12"
      >
        <item.icon className="h-1/2 w-1/2 group-hover:text-white" />
        <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#050d18] px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          {item.label}
        </span>
      </motion.div>
    </a>
  );
}
