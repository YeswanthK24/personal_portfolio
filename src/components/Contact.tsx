"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { profile } from "@/data/portfolio";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const result = (await response.json().catch(() => null)) as
        | { message?: string; error?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.error ?? "Failed to send message");
      }

      setSubmitState("success");
      setSubmitMessage(result?.message ?? "Message sent successfully.");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitState("error");
      setSubmitMessage("Message could not be sent right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-shell pb-32" id="contact">
      <div className="section-orb section-orb--orange left-10 top-10 h-60 w-60" />
      <div className="section-orb section-orb--cyan right-10 bottom-10 h-56 w-56" />

      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Contact" title="Contact." description="A simple way to reach me." />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="glass-panel rounded-[2rem] p-6 md:p-9">
              <p className="section-kicker">Direct Reach</p>
              <div className="mt-6 space-y-4">
                <ContactLink
                  href={`mailto:${profile.contacts.email}`}
                  icon={<MailIcon />}
                  label={profile.contacts.email}
                />
                <ContactLink
                  href={`tel:${profile.contacts.phone.replace(/\s+/g, "")}`}
                  icon={<PhoneIcon />}
                  label={profile.contacts.phone}
                />
                <ContactLink
                  href={profile.contacts.github}
                  icon={<GithubIcon />}
                  label="github.com/YeswanthK24"
                />
                <ContactLink
                  href={profile.contacts.linkedin}
                  icon={<LinkedinIcon />}
                  label="linkedin.com/in/yeswanth-k"
                />
              </div>
            </div>

            <a
              href={profile.contacts.resume}
              download
              className="button-secondary w-full sm:w-auto"
            >
              <ResumeIcon />
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="glass-panel rounded-[2rem] p-6 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/60">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white transition-colors focus:border-cyan-300 focus:outline-hidden"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/60">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white transition-colors focus:border-cyan-300 focus:outline-hidden"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/60">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(event) => setFormState({ ...formState, message: event.target.value })}
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white transition-colors focus:border-cyan-300 focus:outline-hidden"
                  placeholder="Tell me about the role or project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="button-primary button-block disabled:translate-y-0 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black/70" />
                    Sending...
                  </>
                ) : submitState === "success" ? (
                  "Message Sent!"
                ) : (
                  "Send Message"
                )}
              </button>

              {submitMessage ? (
                <p
                  className={`text-sm leading-6 ${
                    submitState === "error" ? "text-rose-200/90" : "text-cyan-100/85"
                  }`}
                >
                  {submitMessage}
                </p>
              ) : null}
            </form>
          </motion.div>
        </div>

        <footer className="mt-20 border-t border-white/6 pt-8 text-center text-sm text-white/45">
          <p>&copy; {new Date().getFullYear()} {profile.name}.</p>
        </footer>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-4 text-white/80 transition-transform hover:-translate-y-1 hover:bg-white/5"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
        {icon}
      </span>
      <span className="min-w-0 break-all text-sm leading-6 sm:break-words">{label}</span>
    </a>
  );
}

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.77.64 2.6a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.48-1.25a2 2 0 0 1 2.11-.45c.83.3 1.7.52 2.6.64A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ResumeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M12 18v-6" />
    <path d="m9.5 14 2.5 2.5 2.5-2.5" />
  </svg>
);
