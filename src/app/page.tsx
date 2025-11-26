"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import MagneticHover from "./components/MagneticHover";

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");

    const updatePointerPreference = () => {
      setHasFinePointer(mediaQuery.matches);
    };

    updatePointerPreference();
    mediaQuery.addEventListener("change", updatePointerPreference);

    return () => mediaQuery.removeEventListener("change", updatePointerPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !hasFinePointer) {
      return undefined;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX / window.innerWidth);
      mouseY.set(event.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hasFinePointer, mouseX, mouseY, prefersReducedMotion]);

  const layer1X = useTransform(mouseX, (value) => (value - 0.5) * 60);
  const layer1Y = useTransform(mouseY, (value) => (value - 0.5) * 40);
  const layer2X = useTransform(mouseX, (value) => (value - 0.5) * -40);
  const layer2Y = useTransform(mouseY, (value) => (value - 0.5) * 30);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleWheel = (event: WheelEvent) => {
      if (!mediaQuery.matches || !scrollContainer) return;

      const deltaY = event.deltaY;
      if (deltaY === 0) return;

      event.preventDefault();
      scrollContainer.scrollTo({
        left: scrollContainer.scrollLeft + deltaY,
        behavior: "smooth",
      });
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <main className="min-h-screen bg-[#050509] text-zinc-100 overflow-y-auto overflow-x-hidden md:overflow-x-auto md:overflow-y-hidden scroll-smooth">
      <CustomCursor />
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-[#050509] via-[#050509] to-[#050509]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 mix-blend-screen">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-600 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-600 blur-3xl" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 backdrop-blur-sm">
        <span className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          Paul Cohen
        </span>
        <nav className="flex items-center gap-6 text-sm text-zinc-300">
          <a
            href="#about"
            onClick={(event) => handleNavClick(event, "about")}
            className="hover:text-white"
          >
            About
          </a>
          <a
            href="#experience"
            onClick={(event) => handleNavClick(event, "experience")}
            className="hover:text-white"
          >
            Experience
          </a>
          <a
            href="#projects"
            onClick={(event) => handleNavClick(event, "projects")}
            className="hover:text-white"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={(event) => handleNavClick(event, "contact")}
            className="hover:text-white"
          >
            Contact
          </a>
        </nav>
      </header>

      <div
        ref={scrollContainerRef}
        className="flex min-h-screen flex-col overflow-y-auto px-4 pb-12 pt-28 md:flex-row md:snap-x md:snap-mandatory md:overflow-x-auto md:overflow-y-hidden md:px-8"
      >
        {/* HERO */}
        <section className="relative flex min-h-[75vh] w-screen shrink-0 items-center justify-center snap-center md:min-h-screen">
          <motion.div
            style={{ x: layer1X, y: layer1Y }}
            className="pointer-events-none absolute -left-32 -top-28 h-64 w-64 rounded-full bg-purple-500/40 blur-3xl"
          />
          <motion.div
            style={{ x: layer2X, y: layer2Y }}
            className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-sky-500/40 blur-3xl"
          />

          <div className="mx-auto grid max-w-6xl gap-10 rounded-[32px] border border-zinc-800 bg-zinc-900/30 p-6 backdrop-blur-md md:grid-cols-[1.6fr,1.2fr] md:items-center md:p-10">
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-purple-300/90">
                Operations & AI Automation Lead
              </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
              Designing end-to-end automations
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-300">
                that turn complexity into clarity.
              </span>
            </h1>
            <p className="max-w-xl text-sm text-zinc-300 sm:text-base">
              I build automation systems that connect tools, teams, and data — so
              people can focus on meaningful work instead of repetitive tasks.
              From Operations and Marketing to Customer Success, I help ship
              workflows that actually scale.
            </p>

            <div className="flex flex-wrap gap-3">
              <MagneticHover className="inline-block">
                <a
                  href="#contact"
                  className="rounded-full border border-purple-400/70 bg-purple-500/20 px-5 py-2 text-sm font-medium text-purple-100 backdrop-blur-md hover:border-purple-300 hover:bg-purple-500/30"
                >
                  Contact Me
                </a>
              </MagneticHover>
              <MagneticHover className="inline-block">
                <a
                  href="https://pjcohen.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800/60"
                >
                  View Resume
                </a>
              </MagneticHover>
              <MagneticHover className="inline-block">
                <a
                  href="https://www.linkedin.com/in/pjcohen/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800/60"
                >
                  LinkedIn
                </a>
              </MagneticHover>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-400">
              <span className="rounded-full border border-zinc-700 px-3 py-1">
                n8n & Zapier
              </span>
              <span className="rounded-full border border-zinc-700 px-3 py-1">
                API Integrations
              </span>
              <span className="rounded-full border border-zinc-700 px-3 py-1">
                Workflow Automation
              </span>
              <span className="rounded-full border border-zinc-700 px-3 py-1">
                AI Creative Tools
              </span>
            </div>
          </motion.div>

          {/* Foto – fácil de reemplazar */}
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mx-auto h-64 w-64 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 shadow-[0_0_60px_rgba(147,51,234,0.3)] sm:h-72 sm:w-72"
          >
            <Image
              src="/paul.jpg"
              alt="Portrait of Paul Cohen"
              fill
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050509] via-transparent" />
            <div className="absolute bottom-3 left-3 rounded-full bg-zinc-900/70 px-3 py-1 text-xs text-zinc-200 backdrop-blur">
              Based on real impact, not hype.
            </div>
          </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <motion.section
          id="about"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex min-h-[75vh] w-screen shrink-0 snap-center items-center"
        >
          <div className="mx-auto max-w-3xl space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md md:p-8">
            <h2 className="text-lg font-semibold text-zinc-50">
              About Paul
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300">
              I’m an Operations &amp; AI Automation Lead focused on building systems
              that make work more human, not less. Clear goals, high standards, and
              meaningful outcomes drive how I approach every project.
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">
              Whether I’m designing an automation, integrating APIs, or supporting
              cross-functional teams, my goal is always the same: deliver reliable
              outcomes and make everyone’s day a little easier. I care deeply about
              the people behind the processes and the long-term health of the
              systems we build.
            </p>
          </div>
        </motion.section>

        {/* SKILLS */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex min-h-[75vh] w-screen shrink-0 snap-center items-center"
        >
          <div className="mx-auto flex w-full max-w-4xl flex-col space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-zinc-50">
                Core Skills
              </h2>
              <p className="text-xs text-zinc-400">
                Operations · Automation · AI · Customer Experience
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {["n8n, Zapier, Make.com",
                "API Integrations & Webhooks",
                "Twilio & Slack Integrations",
                "Stripe & Brex Automations",
                "Workflow Automation Design",
                "Customer Success Operations",
                "Process Improvement",
                "AI Video & Creative Automation",
                "Cross-Team Collaboration",
              ].map((skill) => (
                <MagneticHover key={skill} className="inline-block">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-200">
                    {skill}
                  </div>
                </MagneticHover>
              ))}
            </div>
          </div>
        </motion.section>

        {/* EXPERIENCE */}
        <motion.section
          id="experience"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex min-h-[75vh] w-screen shrink-0 snap-center items-center"
        >
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md md:p-8">
            <h2 className="text-lg font-semibold text-zinc-50">
              Experience
            </h2>

            <div className="relative space-y-6 border-l border-zinc-800 pl-6">
              {/* Item 1 */}
              <MagneticHover className="block">
                <article className="space-y-2">
                  <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border border-purple-300 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.9)]" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-50">
                        Operations &amp; AI Automation Lead
                      </h3>
                      <p className="text-xs text-zinc-400">
                        CitizenShipper · Feb 2025 – Present
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1 text-sm text-zinc-300">
                    <li>
                      Built automations using n8n, Zapier, Make, and custom API
                      integrations.
                    </li>
                    <li>
                      Designed workflow systems for syncing data, triggering
                      notifications, and supporting Operations, Customer Success, and
                      Marketing.
                    </li>
                    <li>
                      Created AI-generated videos and creative assets for campaigns.
                    </li>
                    <li>
                      Automated review ingestion, background checks, CRM updates, and
                      communication workflows.
                    </li>
                    <li>
                      Deployed automation solutions that save an estimated 20–40 hours
                      per month.
                    </li>
                    <li>
                      Frequently took ownership of complex problems and delivered
                      solutions end-to-end.
                    </li>
                  </ul>
                </article>
              </MagneticHover>

              {/* Item 2 */}
              <MagneticHover className="block">
                <article className="space-y-2">
                  <div className="absolute -left-[9px] mt-[5.5rem] h-4 w-4 rounded-full border border-zinc-500 bg-zinc-900" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-50">
                        CS Operations
                      </h3>
                      <p className="text-xs text-zinc-400">
                        CitizenShipper · Oct 2023 – Apr 2025
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1 text-sm text-zinc-300">
                    <li>
                      Supported customers across inbound and outbound communication
                      channels.
                    </li>
                    <li>
                      Helped maintain long-term customer relationships with clear,
                      personalized assistance.
                    </li>
                    <li>
                      Connected everyday support needs with internal tools and
                      processes to keep workflows running smoothly.
                    </li>
                    <li>
                      Collaborated with cross-functional teams to surface feedback and
                      identify opportunities for process improvement.
                    </li>
                  </ul>
                </article>
              </MagneticHover>
            </div>
          </div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section
          id="projects"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex min-h-[75vh] w-screen shrink-0 snap-center items-center"
        >
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md md:p-8">
            <h2 className="text-lg font-semibold text-zinc-50">
              Selected Automation Work
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <MagneticHover className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5">
                  <h3 className="text-sm font-semibold text-zinc-50">
                    Automated Lead Qualification &amp; Routing
                  </h3>
                  <p className="text-sm text-zinc-300">
                    Designed an n8n-based workflow that scored inbound leads,
                    enriched them via API, and routed them to the right team with
                    automated notifications.
                  </p>
                  <p className="text-xs text-zinc-400">
                    Tools: n8n, REST APIs, CRM, notifications
                  </p>
                </div>
              </MagneticHover>

              <MagneticHover className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5">
                  <h3 className="text-sm font-semibold text-zinc-50">
                    Review &amp; Safety Signal Pipeline
                  </h3>
                  <p className="text-sm text-zinc-300">
                    Built an automation that ingests reviews, runs background checks,
                    and surfaces key signals to Operations and Customer Success for
                    faster decisions.
                  </p>
                  <p className="text-xs text-zinc-400">
                    Tools: Make.com, APIs, internal dashboards
                  </p>
                </div>
              </MagneticHover>
            </div>
          </div>
        </motion.section>

        {/* CONTACT */}
        <motion.section
          id="contact"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex min-h-[75vh] w-screen shrink-0 snap-center items-center"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-col space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 text-sm text-zinc-300 backdrop-blur-md md:p-8">
            <h2 className="text-lg font-semibold text-zinc-50">
              Let&apos;s build what&apos;s next
            </h2>
            <p>
              If you&apos;re looking to scale your operations, reduce manual
              workload, or explore how AI and automation can support your team, I&apos;d
              love to connect.
            </p>
            <div className="space-y-2">
              <p>
                <span className="text-zinc-400">Email:</span>{" "}
                <a
                  href="mailto:paulcohen10000@gmail.com"
                  className="text-purple-300 hover:text-purple-200"
                >
                  paulcohen10000@gmail.com
                </a>
              </p>
              <p>
                <span className="text-zinc-400">LinkedIn:</span>{" "}
                <a
                  href="https://www.linkedin.com/in/pjcohen/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-300 hover:text-purple-200"
                >
                  linkedin.com/in/pjcohen
                </a>
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
