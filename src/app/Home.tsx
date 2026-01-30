"use client";

import { useClientReady } from "./hooks/useClientReady";
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

const aboutHighlights = [
    {
        title: "Automation Strategy",
        description: "End-to-end design that keeps humans in the loop while scaling impact.",
        gradient: "from-purple-500/25 via-indigo-500/15 to-sky-500/15",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-200"
            >
                <path
                    d="M7 7.5c0-1.38 1.12-2.5 2.5-2.5h5a2.5 2.5 0 0 1 0 5h-5A2.5 2.5 0 0 1 7 7.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M5 13.5C5 12.12 6.12 11 7.5 11H12a2.5 2.5 0 0 1 0 5H7.5A2.5 2.5 0 0 1 5 13.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M14.5 11v-1.25M14.5 18.25V16.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: "Team Enablement",
        description: "Workshops, playbooks, and documentation that make adoption stick.",
        gradient: "from-purple-500/25 via-indigo-500/15 to-sky-500/15",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-200"
            >
                <path
                    d="M8.5 7a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0ZM5 17.5A5.5 5.5 0 0 1 10.5 12h3A5.5 5.5 0 0 1 19 17.5V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M4 9.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm12 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: "Reliable Delivery",
        description: "Runbooks, monitoring, and iteration loops that protect outcomes.",
        gradient: "from-purple-500/25 via-indigo-500/15 to-sky-500/15",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-200"
            >
                <path
                    d="M6 5h12a1 1 0 0 1 .96 1.27l-1.8 6.3a2 2 0 0 1-1.92 1.43H8.76a2 2 0 0 1-1.92-1.43l-1.8-6.3A1 1 0 0 1 6 5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M10.5 17.5a1.5 1.5 0 1 1 3 0v1a1.5 1.5 0 1 1-3 0v-1Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M9 9h6M9.5 12H12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
];

const skillHighlights = [
    {
        title: "Automation Architecture",
        description: "Design orchestration, branching logic, and error handling so workflows stay resilient.",
        gradient: "from-purple-500/25 via-indigo-500/15 to-sky-500/15",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-200"
            >
                <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                    d="M9.4 8.4 10 10m5-2 1.2 2.6M12 14.5V12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: "Data & Messaging Flows",
        description: "Connect CRMs, payments, and messaging platforms with clean handoffs between teams.",
        gradient: "from-purple-500/25 via-indigo-500/15 to-sky-500/15",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-200"
            >
                <path
                    d="M7 6h10a2 2 0 0 1 2 2v1.5a2 2 0 0 1-2 2H7A2 2 0 0 1 5 9.5V8a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M7 14h4.5a2.5 2.5 0 0 1 0 5H7a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="m12 9.5 2 1.5 2-1.5M11.5 16h5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: "Guardrails & QA",
        description: "Monitoring, fallbacks, and documentation so automations stay trusted and transparent.",
        gradient: "from-purple-500/25 via-indigo-500/15 to-sky-500/15",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-200"
            >
                <path
                    d="M6.5 7.5a5.5 5.5 0 0 1 11 0v2.8a7 7 0 0 1-3.9 6.3l-1.6.8a.5.5 0 0 1-.5 0l-1.6-.8A7 7 0 0 1 6.5 10.3V7.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M12 8.5v3M12 14.5h.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
];

const toolIcons = [
    {
        name: "n8n",
        description: "Visual orchestration for multi-step workflows.",
        iconPaths: ["/icons/tools/n8n.svg"],
    },
    {
        name: "Zapier",
        description: "Fast automations that connect scattered tools.",
        iconPaths: ["/icons/tools/zapier.svg"],
    },
    {
        name: "Make.com",
        description: "Complex branching, variables, and scheduling.",
        iconPaths: ["/icons/tools/make.svg"],
    },
    {
        name: "Slack & Twilio",
        description: "Messaging hooks for alerts, nudges, and follow-ups.",
        iconPaths: ["/icons/tools/slack.svg", "/icons/tools/twilio.svg"],
    },
    {
        name: "Stripe & Brex",
        description: "Revenue, finance, and approvals tied to workflows.",
        iconPaths: ["/icons/tools/stripe.svg", "/icons/tools/brex.svg"],
    },
    {
        name: "Airtable & Notion",
        description: "Lightweight databases and documentation that stay in sync.",
        iconPaths: ["/icons/tools/airtable.svg", "/icons/tools/notion.svg"],
    },
    {
        name: "OpenAI & AI Video",
        description: "Creative assets, summaries, and assistants backed by guardrails.",
        iconPaths: ["/icons/tools/openai.svg", "/icons/tools/video.svg"],
    },
];

export default function Home() {
    const ready = useClientReady();
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
        if (!ready) return;

        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const mediaQuery = window.matchMedia("(min-width: 768px)");

        const handleWheel = (event: WheelEvent) => {
            if (!mediaQuery.matches || !scrollContainer) return;

            const primaryDelta =
                Math.abs(event.deltaY) >= Math.abs(event.deltaX)
                    ? event.deltaY
                    : event.deltaX;

            if (primaryDelta === 0) return;

            const path = event.composedPath();
            const canScrollVertically = path.some((target) => {
                if (!(target instanceof HTMLElement)) return false;
                if (target.dataset.allowVerticalScroll !== "true") return false;

                const { scrollHeight, clientHeight, scrollTop } = target;
                if (scrollHeight <= clientHeight) return false;

                const edgeTolerance = 2;
                const isAtTop = scrollTop <= edgeTolerance;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - edgeTolerance;

                if (primaryDelta < 0 && !isAtTop) return true;
                if (primaryDelta > 0 && !isAtBottom) return true;

                return false;
            });

            if (Math.abs(event.deltaY) >= Math.abs(event.deltaX) && canScrollVertically) {
                return;
            }

            event.preventDefault();
            scrollContainer.scrollBy({
                left: primaryDelta,
                behavior: "smooth",
            });
        };

        scrollContainer.addEventListener("wheel", handleWheel, {
            passive: false,
        });

        return () => {
            scrollContainer.removeEventListener("wheel", handleWheel);
        };
    }, [ready]); // 👈 AHORA SE ACTIVA SOLO CUANDO ready = true


    const handleNavClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
        event.preventDefault();
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });
    };

    // Evita mismatch PERO mantiene el árbol DOM
    if (!ready) {
        return (
            <main className="min-h-dvh bg-[#050509] text-zinc-100 overflow-hidden scroll-smooth" />
        );
    }


    return (
        <main className="min-h-dvh bg-[#050509] text-zinc-100 overflow-hidden scroll-smooth">
            <CustomCursor />
            {/* Background gradient */}
            <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-[#050509] via-[#050509] to-[#050509]" />
            <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 mix-blend-screen">
                <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-600 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-600 blur-3xl" />
            </div>

            <header
                className="fixed inset-x-4 bottom-4 z-20 mx-auto flex max-w-xl items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md md:inset-x-0 md:bottom-auto md:left-0 md:right-0 md:top-4 md:max-w-6xl md:justify-between md:rounded-2xl md:border-zinc-800 md:bg-zinc-900/40 md:px-6 md:py-5"
                style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
            >
                <span
                    onClick={(event) => handleNavClick(event, "hero")}
                    className="hidden text-sm uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-200 transition cursor-pointer md:inline"
                >
                    Paul Cohen
                </span>

                <nav
                    aria-label="Primary"
                    className="flex w-full items-center gap-2 text-sm font-medium text-zinc-200 md:w-auto md:gap-6 md:font-normal md:text-zinc-300"
                >
                    <a
                        href="#about"
                        onClick={(event) => handleNavClick(event, "about")}
                        className="flex flex-1 items-center justify-center rounded-full bg-zinc-800/60 px-3 py-2 transition hover:bg-zinc-800/80 hover:text-white md:flex-none md:bg-transparent md:px-0 md:py-0 md:hover:bg-transparent"
                    >
                        About
                    </a>
                    <a
                        href="#experience"
                        onClick={(event) => handleNavClick(event, "experience")}
                        className="flex flex-1 items-center justify-center rounded-full bg-zinc-800/60 px-3 py-2 transition hover:bg-zinc-800/80 hover:text-white md:flex-none md:bg-transparent md:px-0 md:py-0 md:hover:bg-transparent"
                    >
                        Experience
                    </a>
                    <a
                        href="#projects"
                        onClick={(event) => handleNavClick(event, "projects")}
                        className="flex flex-1 items-center justify-center rounded-full bg-zinc-800/60 px-3 py-2 transition hover:bg-zinc-800/80 hover:text-white md:flex-none md:bg-transparent md:px-0 md:py-0 md:hover:bg-transparent"
                    >
                        Projects
                    </a>
                    <a
                        href="#contact"
                        onClick={(event) => handleNavClick(event, "contact")}
                        className="flex flex-1 items-center justify-center rounded-full bg-zinc-800/60 px-3 py-2 transition hover:bg-zinc-800/80 hover:text-white md:flex-none md:bg-transparent md:px-0 md:py-0 md:hover:bg-transparent"
                    >
                        Contact
                    </a>
                </nav>
            </header>

            {/* Scroll Arrows */}
            <div className="fixed z-30 inset-y-0 right-4 flex flex-col items-center justify-center gap-4 md:flex">
                {/* Left */}
                <button
                    onClick={() => scrollContainerRef.current?.scrollBy({ left: -400, behavior: "smooth" })}
                    className="hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-zinc-900/40 border border-zinc-800 backdrop-blur-md hover:bg-zinc-900/60 hover:border-zinc-700 transition shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                >
                    <span className="text-zinc-300 text-xl">‹</span>
                </button>

                {/* Right */}
                <button
                    onClick={() => scrollContainerRef.current?.scrollBy({ left: 400, behavior: "smooth" })}
                    className="hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-zinc-900/40 border border-zinc-800 backdrop-blur-md hover:bg-zinc-900/60 hover:border-zinc-700 transition shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                >
                    <span className="text-zinc-300 text-xl">›</span>
                </button>
            </div>

            {/* Animated Scroll Hint */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="
                    fixed
                    bottom-6
                    left-1/2
                    -translate-x-1/2
                    z-30
                    hidden md:flex
                    flex-col
                    items-center
                    gap-1
                    pointer-events-none
                "
            >
                {/* Auto-hide after 6 seconds */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 6, duration: 1 }}
                    className="flex flex-col items-center gap-2"
                >
                    {/* Text */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                        className="
        text-xs 
        text-zinc-300 
        bg-zinc-900/60 
        px-4 py-2 
        rounded-full 
        border border-zinc-700 
        backdrop-blur-md 
        shadow-lg
      "
                    >
                        You can scroll →
                    </motion.span>

                    {/* Icon animation */}
                    <motion.div
                        initial={{ x: 0, opacity: 0.4 }}
                        animate={{ x: 12, opacity: 1 }}
                        transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.2, ease: "easeInOut" }}
                        className="text-zinc-400 text-sm"
                    >
                        →
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "easeInOut" }}
                        className="h-[2px] w-10 bg-gradient-to-r from-purple-400 to-sky-400 rounded-full"
                    />
                </motion.div>
            </motion.div>


            <div
  ref={scrollContainerRef}
  className="
    smooth-scroll
    flex flex-col gap-8
    min-h-dvh
    overflow-y-auto 
    overflow-x-hidden
    px-4 pt-20 pb-24

    md:flex-row
    md:h-dvh
    md:overflow-x-scroll 
    md:overflow-y-hidden 
    md:snap-x md:snap-mandatory
    md:px-8 md:pt-0 md:pb-0    /* 👈 SIN PADDING TOP EN DESKTOP */
    md:[touch-action:pan-x]

    md:[scrollbar-width:thin]
    md:[scrollbar-color:rgba(255,255,255,0.15)_transparent]
    md:[&::-webkit-scrollbar]:h-1.5
    md:[&::-webkit-scrollbar-track]:bg-transparent
    md:[&::-webkit-scrollbar-thumb]:bg-[rgba(255,255,255,0.25)]
    md:[&::-webkit-scrollbar-thumb]:rounded-full
    md:[&::-webkit-scrollbar-thumb]:transition-all
    md:[&::-webkit-scrollbar-thumb]:duration-300
    md:hover:[&::-webkit-scrollbar-thumb]:bg-[rgba(255,255,255,0.35)]
    md:[&::-webkit-scrollbar]:transition-opacity
    md:[&::-webkit-scrollbar]:duration-300
    md:[&::-webkit-scrollbar]:opacity-0
    md:hover:[&::-webkit-scrollbar]:opacity-100
  "
>




                {/* HERO */}
                <section
                    id="hero"
                    className="
    min-h-[75vh]
    w-full
    snap-center
    flex items-start        /* mobile */

    md:w-screen 
    md:shrink-0
    md:min-h-screen
    md:flex 
    md:items-center         /* desktop → centra perfecto */
  "
                >

                    {ready && (
                        <>
                            <motion.div
                                style={{ x: layer1X, y: layer1Y }}
                                className="pointer-events-none absolute -left-32 -top-28 h-64 w-64 rounded-full bg-purple-500/40 blur-3xl"
                            />
                            <motion.div
                                style={{ x: layer2X, y: layer2Y }}
                                className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-sky-500/40 blur-3xl"
                            />
                        </>
                    )}


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
                                        href="/resume.pdf"
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
                                src="/paul.png"
                                alt="Portrait of Paul Cohen"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050509] via-transparent" />
                            <div className="absolute bottom-3 left-3 rounded-full bg-zinc-900/70 px-3 py-1 text-xs text-zinc-200 backdrop-blur">
                                Based on real impact, not hype.
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* CONTACT */}
                <motion.section
                    id="contact"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="
    w-full
    snap-center
    min-h-auto
    items-start

    md:w-screen
    md:shrink-0
    md:min-h-screen
    md:flex
    md:items-center
  "
                >
                    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 text-sm text-zinc-300 backdrop-blur-md md:p-10">
                        <div className="grid gap-6 md:grid-cols-[1.4fr,1fr] md:items-start">
                            <div className="space-y-5">
                                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-200/90">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" />
                                    <span>Ready to collaborate</span>
                                </div>
                                <div className="space-y-3">
                                    <h2 className="text-xl font-semibold text-zinc-50 md:text-2xl">
                                        Let&apos;s build what&apos;s next
                                    </h2>
                                    <p className="leading-relaxed text-zinc-200">
                                        Scaling ops, reducing manual work, or experimenting with AI? Let&apos;s talk through the problem and map the quickest way to ship something dependable.
                                    </p>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <a
                                        href="mailto:paulcohen10000@gmail.com"
                                        className="group flex items-center justify-between gap-3 rounded-2xl border border-purple-400/50 bg-purple-500/15 px-4 py-3 font-medium text-purple-100 shadow-[0_10px_40px_rgba(147,51,234,0.15)] transition hover:-translate-y-[2px] hover:border-purple-300 hover:bg-purple-500/20"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-400/20 text-purple-100 shadow-[0_12px_30px_rgba(147,51,234,0.25)]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                                                        stroke="currentColor"
                                                        strokeWidth="1.6"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M6.5 8.5 12 12l5.5-3.5"
                                                        stroke="currentColor"
                                                        strokeWidth="1.6"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                            <span>Email me</span>
                                        </span>
                                        <span className="text-lg transition group-hover:translate-x-1">→</span>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/pjcohen/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center justify-between gap-3 rounded-2xl border border-zinc-700 bg-zinc-800/60 px-4 py-3 font-medium text-zinc-100 transition hover:-translate-y-[2px] hover:border-zinc-500 hover:bg-zinc-800"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-700/40 text-zinc-50 shadow-[0_12px_30px_rgba(255,255,255,0.08)]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="h-5 w-5"
                                                >
                                                    <rect x="3" y="3" width="18" height="18" rx="4" className="fill-current" />
                                                    <path
                                                        d="M8.25 9.75v7.5"
                                                        stroke="#0A66C2"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                    />
                                                    <circle cx="8.25" cy="6.75" r="1.05" fill="#0A66C2" />
                                                    <path
                                                        d="M12.5 17.25v-4.25c0-.97.78-1.75 1.75-1.75v0c.97 0 1.75.78 1.75 1.75v4.25"
                                                        stroke="#0A66C2"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            </span>
                                            <span>Connect on LinkedIn</span>
                                        </span>
                                        <span className="text-lg transition group-hover:translate-x-1">→</span>
                                    </a>
                                </div>
                                <div className="grid gap-2 text-zinc-200 sm:grid-cols-2">
                                    <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/80 p-4">
                                        <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Projects I love</p>
                                        <p className="mt-2 text-sm font-semibold text-zinc-50">Marketing + CS automations</p>
                                        <p className="text-sm text-zinc-300">Playbooks that nudge leads and customers without losing the human touch.</p>
                                    </div>
                                    <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/80 p-4">
                                        <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">How I work</p>
                                        <p className="mt-2 text-sm font-semibold text-zinc-50">Discovery → pilot → scale</p>
                                        <p className="text-sm text-zinc-300">Fast iterations with guardrails, documentation, and clear owners baked in.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800/70 bg-gradient-to-b from-zinc-900/80 via-zinc-900/70 to-zinc-900/50 p-5">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-zinc-100">
                                        Want to know more?
                                    </p>
                                    <span className="text-lg text-purple-200">→</span>
                                </div>
                                <p className="text-sm text-zinc-300">
                                    Jump to the highlights to see my approach, leadership style, and hands-on projects.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <a
                                        href="#about"
                                        onClick={(event) => handleNavClick(event, "about")}
                                        className="group flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/70 px-4 py-2 text-xs font-medium text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
                                    >
                                        About &amp; Skills
                                        <span className="transition group-hover:translate-x-0.5">→</span>
                                    </a>
                                    <a
                                        href="#experience"
                                        onClick={(event) => handleNavClick(event, "experience")}
                                        className="group flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/70 px-4 py-2 text-xs font-medium text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
                                    >
                                        Experience
                                        <span className="transition group-hover:translate-x-0.5">→</span>
                                    </a>
                                    <a
                                        href="#projects"
                                        onClick={(event) => handleNavClick(event, "projects")}
                                        className="group flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/70 px-4 py-2 text-xs font-medium text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
                                    >
                                        Projects
                                        <span className="transition group-hover:translate-x-0.5">→</span>
                                    </a>
                                </div>
                                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/70 p-4 text-xs text-zinc-400">
                                    <p className="font-semibold text-zinc-200">Prefer a quick intro?</p>
                                    <p>Tell me what you&apos;re trying to automate and I&apos;ll reply within a day with next steps.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* ABOUT + SKILLS */}
                <motion.section
                    id="about"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="
    w-full
    snap-center
    min-h-auto
    items-start

    md:w-screen
    md:shrink-0
    md:min-h-screen
    md:flex
    md:items-center
  "
                >
                    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#0b0b14] via-[#0c0c1c] to-[#0a0a10] p-6 shadow-[0_0_80px_rgba(99,102,241,0.18)] backdrop-blur-md md:mt-16 md:max-h-[82vh] md:p-10">
                        <div className="pointer-events-none absolute -left-16 top-6 h-40 w-40 rounded-full bg-purple-600/20 blur-3xl" />
                        <div className="pointer-events-none absolute -right-10 bottom-6 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl" />

                        <div
                            data-allow-vertical-scroll="true"
                            className="flex flex-col gap-6 md:h-[72vh] md:max-h-[72vh] md:overflow-y-auto md:pr-3 md:[scrollbar-width:thin] md:[scrollbar-color:rgba(255,255,255,0.15)_transparent] md:[&::-webkit-scrollbar]:w-1.5 md:[&::-webkit-scrollbar-track]:bg-transparent md:[&::-webkit-scrollbar-thumb]:bg-[rgba(255,255,255,0.25)] md:[&::-webkit-scrollbar-thumb]:rounded-full md:hover:[&::-webkit-scrollbar-thumb]:bg-[rgba(255,255,255,0.35)]"
                        >
                            <div className="space-y-6">
                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-semibold text-zinc-50">
                                            About Paul
                                        </h2>
                                        <p className="max-w-3xl text-sm leading-relaxed text-zinc-300">
                                            I’m an Operations &amp; AI Automation Lead focused on building systems that make work more human, not less. Clear goals, high standards, and meaningful outcomes guide every collaboration.
                                        </p>
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ type: "spring", stiffness: 220, damping: 12 }}
                                        className="relative inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-purple-100"
                                    >
                                        <span className="flex h-2 w-2 rounded-full bg-purple-200 shadow-[0_0_0_6px_rgba(168,85,247,0.2)]" />
                                        Building calm, reliable systems
                                    </motion.div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-3 rounded-2xl border border-zinc-800/70 bg-zinc-900/50 p-4 shadow-inner">
                                        <h3 className="text-sm font-semibold text-zinc-100">What motivates me</h3>
                                        <p className="text-sm leading-relaxed text-zinc-300">
                                            Whether I’m designing automations, integrating APIs, or supporting cross-functional teams, my goal is to deliver reliable outcomes and make everyone’s day a little easier. I prioritize the people behind the processes and the long-term health of the systems we build.
                                        </p>
                                        <div className="flex flex-wrap gap-2 text-[11px] text-zinc-200">
                                            <span className="rounded-full bg-purple-500/10 px-3 py-1 font-medium text-purple-100">Human-centered</span>
                                            <span className="rounded-full bg-purple-500/10 px-3 py-1 font-medium text-purple-100">Impact-first</span>
                                            <span className="rounded-full bg-purple-500/10 px-3 py-1 font-medium text-purple-100">Documented</span>
                                            <span className="rounded-full bg-purple-500/10 px-3 py-1 font-medium text-purple-100">Measurable</span>
                                        </div>
                                    </div>

                                    <div className="relative overflow-hidden rounded-2xl border border-zinc-800/70 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-transparent p-4">
                                        <div className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-purple-500/20 blur-2xl" />
                                        <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-indigo-500/20 blur-2xl" />
                                        <div className="relative space-y-2">
                                            <h3 className="text-sm font-semibold text-zinc-100">How I work</h3>
                                            <ul className="space-y-2 text-sm text-zinc-300">
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1 h-2 w-2 rounded-full bg-purple-200" />
                                                    Design clarity, then automate what matters.
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1 h-2 w-2 rounded-full bg-purple-200" />
                                                    Pair fast experiments with strong QA and monitoring.
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1 h-2 w-2 rounded-full bg-purple-200" />
                                                    Leave teams with playbooks, runbooks, and clear ownership.
                                                </li>
                                            </ul>
                                            <motion.div
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                                className="mt-3 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-[11px] font-medium text-purple-100"
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-purple-200" />
                                                Ops leader who keeps experimentation safe
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    {aboutHighlights.map((item, index) => (
                                        <motion.div
                                            key={item.title}
                                            whileHover={{ y: -6, scale: 1.01 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 12 }}
                                            className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4"
                                            style={{
                                                boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
                                            }}
                                        >
                                            <div className={`absolute inset-0 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100 bg-gradient-to-br ${item.gradient}`} />
                                            <div className="relative flex items-start gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700/70 bg-zinc-900/70 shadow-inner">
                                                    {item.icon}
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-sm font-semibold text-zinc-100">{item.title}</h3>
                                                    <p className="text-xs leading-relaxed text-zinc-300">{item.description}</p>
                                                </div>
                                            </div>
                                            <motion.div
                                                className="mt-4 h-1 rounded-full bg-gradient-to-r from-purple-400/80 via-indigo-400/70 to-sky-400/80"
                                                initial={{ scaleX: 0, originX: 0 }}
                                                whileInView={{ scaleX: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.1 * index + 0.1, duration: 0.5 }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div id="skills" className="relative space-y-6 rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#0b0b14]/80 via-[#0c0c1c]/80 to-[#0a0a10]/80 p-6 shadow-[0_0_80px_rgba(99,102,241,0.18)]">
                                <div className="pointer-events-none absolute -left-14 top-4 h-40 w-40 rounded-full bg-purple-600/20 blur-3xl" />
                                <div className="pointer-events-none absolute -right-10 bottom-6 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl" />

                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-semibold text-zinc-50">
                                            Skills &amp; Tools
                                        </h2>
                                        <p className="max-w-3xl text-sm leading-relaxed text-zinc-300">
                                            Systems thinking meets hands-on execution. I design automation stacks, connect the data, and keep the guardrails in place so teams can ship confidently.
                                        </p>
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ type: "spring", stiffness: 220, damping: 12 }}
                                        className="relative inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-purple-100"
                                    >
                                        <span className="flex h-2 w-2 rounded-full bg-purple-200 shadow-[0_0_0_6px_rgba(168,85,247,0.2)]" />
                                        Automation-first, human-centered
                                    </motion.div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-3 rounded-2xl border border-zinc-800/70 bg-zinc-900/50 p-4 shadow-inner">
                                        <h3 className="text-sm font-semibold text-zinc-100">What I build</h3>
                                        <p className="text-sm leading-relaxed text-zinc-300">
                                            Workflow architectures that blend no-code and code, keeping data accurate across CRMs, finance, and messaging tools. Every flow ships with clear ownership and documented handoffs.
                                        </p>
                                        <div className="flex flex-wrap gap-2 text-[11px] text-zinc-200">
                                            <span className="rounded-full bg-purple-500/10 px-3 py-1 font-medium text-purple-100">Orchestrations</span>
                                            <span className="rounded-full bg-purple-500/10 px-3 py-1 font-medium text-purple-100">APIs &amp; Webhooks</span>
                                            <span className="rounded-full bg-purple-500/10 px-3 py-1 font-medium text-purple-100">Messaging</span>
                                            <span className="rounded-full bg-purple-500/10 px-3 py-1 font-medium text-purple-100">Analytics</span>
                                        </div>
                                    </div>

                                    <div className="relative overflow-hidden rounded-2xl border border-zinc-800/70 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-transparent p-4">
                                        <div className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-purple-500/20 blur-2xl" />
                                        <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-indigo-500/20 blur-2xl" />
                                        <div className="relative space-y-2">
                                            <h3 className="text-sm font-semibold text-zinc-100">How I keep it safe</h3>
                                            <ul className="space-y-2 text-sm text-zinc-300">
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1 h-2 w-2 rounded-full bg-purple-200" />
                                                    QA checklists, test accounts, and alerting for every release.
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1 h-2 w-2 rounded-full bg-purple-200" />
                                                    Fallbacks and retries when APIs misbehave.
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1 h-2 w-2 rounded-full bg-purple-200" />
                                                    Runbooks and docs that make ownership clear after launch.
                                                </li>
                                            </ul>
                                            <motion.div
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                                className="mt-3 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-[11px] font-medium text-purple-100"
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-purple-200" />
                                                Safe experimentation beats fragile hacks
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    {skillHighlights.map((item, index) => (
                                        <motion.div
                                            key={item.title}
                                            whileHover={{ y: -6, scale: 1.01 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 12 }}
                                            className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4"
                                            style={{
                                                boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
                                            }}
                                        >
                                            <div className={`absolute inset-0 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100 bg-gradient-to-br ${item.gradient}`} />
                                            <div className="relative flex items-start gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700/70 bg-zinc-900/70 shadow-inner">
                                                    {item.icon}
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-sm font-semibold text-zinc-100">{item.title}</h3>
                                                    <p className="text-xs leading-relaxed text-zinc-300">{item.description}</p>
                                                </div>
                                            </div>
                                            <motion.div
                                                className="mt-4 h-1 rounded-full bg-gradient-to-r from-purple-400/80 via-indigo-400/70 to-sky-400/80"
                                                initial={{ scaleX: 0, originX: 0 }}
                                                whileInView={{ scaleX: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.1 * index + 0.1, duration: 0.5 }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-zinc-100">Toolbox</h3>
                                        <span className="text-xs text-zinc-400">APIs, no-code, and AI that play nicely together.</span>
                                    </div>
                                    <div className="grid gap-3 md:grid-cols-3">
                                        {toolIcons.map((tool) => (
                                            <MagneticHover key={tool.name} className="block">
                                                <div className="group relative flex items-start gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-4 shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
                                                    <div className="flex items-center gap-2">
                                                        {tool.iconPaths.map((path) => (
                                                            <div
                                                                key={path}
                                                                className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
                                                            >
                                                                <div className="absolute inset-0 bg-white/5 opacity-0 transition duration-300 group-hover:opacity-80" />
                                                                <Image src={path} alt={`${tool.name} icon`} width={32} height={32} className="relative h-8 w-8 object-contain" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-semibold text-zinc-100">{tool.name}</p>
                                                        <p className="text-xs text-zinc-300">{tool.description}</p>
                                                    </div>
                                                </div>
                                            </MagneticHover>
                                        ))}
                                    </div>
                                </div>
                            </div>
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
                    className="
    w-full
    snap-center
    min-h-auto
    items-start

    md:w-screen
    md:shrink-0
    md:min-h-screen
    md:flex
    md:items-center
  "
                >
                    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#0b0b14] via-[#0c0c1c] to-[#0a0a10] p-6 shadow-[0_0_80px_rgba(99,102,241,0.18)] backdrop-blur-md md:mt-16 md:max-h-[82vh] md:p-10">
                        <div className="pointer-events-none absolute -left-16 top-6 h-40 w-40 rounded-full bg-purple-600/20 blur-3xl" />
                        <div className="pointer-events-none absolute -right-10 bottom-6 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl" />

                        <div
                            data-allow-vertical-scroll="true"
                            className="flex flex-col gap-6 md:h-[72vh] md:max-h-[72vh] md:overflow-y-auto md:pr-3 md:[scrollbar-width:thin] md:[scrollbar-color:rgba(255,255,255,0.15)_transparent] md:[&::-webkit-scrollbar]:w-1.5 md:[&::-webkit-scrollbar-track]:bg-transparent md:[&::-webkit-scrollbar-thumb]:bg-[rgba(255,255,255,0.25)] md:[&::-webkit-scrollbar-thumb]:rounded-full md:hover:[&::-webkit-scrollbar-thumb]:bg-[rgba(255,255,255,0.35)]"
                        >
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-semibold text-zinc-50">
                                        Experience
                                    </h2>
                                    <p className="max-w-3xl text-sm leading-relaxed text-zinc-300">
                                        A blend of automation leadership and customer-facing execution. I build reliable systems and keep teams aligned while scaling.
                                    </p>
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 220, damping: 12 }}
                                    className="relative inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-purple-100"
                                >
                                    <span className="flex h-2 w-2 rounded-full bg-purple-200 shadow-[0_0_0_6px_rgba(168,85,247,0.2)]" />
                                    Automation &amp; Ops
                                </motion.div>
                            </div>

                            <div className="relative space-y-6 border-l border-zinc-800/70 pl-6">
                                <div className="absolute left-[-0.5px] top-0 h-full w-px bg-gradient-to-b from-purple-400/80 via-indigo-400/50 to-transparent" />
                                {/* Item 1 */}
                                <MagneticHover className="block">
                                    <article className="group relative space-y-3 overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/70 via-zinc-900/50 to-zinc-900/30 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                                        <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.12), transparent 40%), radial-gradient(circle at 80% 20%, rgba(56,189,248,0.12), transparent 35%)" }} />
                                        <div className="relative flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-sm font-semibold text-zinc-50">
                                                    Operations &amp; AI Automation Lead
                                                </h3>
                                                <p className="text-xs text-zinc-400">
                                                    CitizenShipper · Feb 2025 – Present
                                                </p>
                                            </div>
                                            <span className="relative rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[11px] font-medium text-purple-100">
                                                Lead Role
                                            </span>
                                        </div>
                                        <ul className="relative space-y-2 text-sm leading-relaxed text-zinc-300">
                                            <li>
                                                Built automations using n8n, Zapier, Make, and custom API integrations.
                                            </li>
                                            <li>
                                                Designed workflow systems for syncing data, triggering notifications, and supporting Operations, Customer Success, and Marketing.
                                            </li>
                                            <li>
                                                Created AI-generated videos and creative assets for campaigns.
                                            </li>
                                            <li>
                                                Automated review ingestion, background checks, CRM updates, and communication workflows.
                                            </li>
                                            <li>
                                                Deployed automation solutions that save an estimated 20–40 hours per month.
                                            </li>
                                            <li>
                                                Frequently took ownership of complex problems and delivered solutions end-to-end.
                                            </li>
                                        </ul>
                                    </article>
                                </MagneticHover>

                                {/* Item 2 */}
                                <MagneticHover className="block">
                                    <article className="group relative space-y-3 overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/70 via-zinc-900/50 to-zinc-900/30 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                                        <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.12), transparent 40%), radial-gradient(circle at 80% 20%, rgba(56,189,248,0.12), transparent 35%)" }} />
                                        <div className="relative flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-sm font-semibold text-zinc-50">
                                                    CS Operations
                                                </h3>
                                                <p className="text-xs text-zinc-400">
                                                    CitizenShipper · Oct 2023 – Apr 2025
                                                </p>
                                            </div>
                                            <span className="relative rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-medium text-indigo-100">
                                                Customer Success
                                            </span>
                                        </div>
                                        <ul className="relative space-y-2 text-sm leading-relaxed text-zinc-300">
                                            <li>
                                                Supported customers across inbound and outbound communication channels.
                                            </li>
                                            <li>
                                                Helped maintain long-term customer relationships with clear, personalized assistance.
                                            </li>
                                            <li>
                                                Connected everyday support needs with internal tools and processes to keep workflows running smoothly.
                                            </li>
                                            <li>
                                                Collaborated with cross-functional teams to surface feedback and identify opportunities for process improvement.
                                            </li>
                                        </ul>
                                    </article>
                                </MagneticHover>
                            </div>
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
                    className="
    w-full
    snap-center
    min-h-auto
    items-start

    md:w-screen
    md:shrink-0
    md:min-h-screen
    md:flex
    md:items-center
  "
                >
                    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#0b0b14] via-[#0c0c1c] to-[#0a0a10] p-6 shadow-[0_0_80px_rgba(99,102,241,0.18)] backdrop-blur-md md:mt-16 md:max-h-[82vh] md:p-10">
                        <div className="pointer-events-none absolute -left-14 top-4 h-36 w-36 rounded-full bg-purple-600/20 blur-3xl" />
                        <div className="pointer-events-none absolute -right-10 bottom-6 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl" />

                        <div
                            data-allow-vertical-scroll="true"
                            className="flex flex-col gap-6 md:h-[72vh] md:max-h-[72vh] md:overflow-y-auto md:pr-3 md:[scrollbar-width:thin] md:[scrollbar-color:rgba(255,255,255,0.15)_transparent] md:[&::-webkit-scrollbar]:w-1.5 md:[&::-webkit-scrollbar-track]:bg-transparent md:[&::-webkit-scrollbar-thumb]:bg-[rgba(255,255,255,0.25)] md:[&::-webkit-scrollbar-thumb]:rounded-full md:hover:[&::-webkit-scrollbar-thumb]:bg-[rgba(255,255,255,0.35)]"
                        >
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-semibold text-zinc-50">
                                        Selected Automation Work
                                    </h2>
                                    <p className="max-w-3xl text-sm leading-relaxed text-zinc-300">
                                        Hands-on builds that combine orchestration, data flows, and clear playbooks so teams can move faster.
                                    </p>
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 220, damping: 12 }}
                                    className="relative inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-indigo-100"
                                >
                                    <span className="flex h-2 w-2 rounded-full bg-indigo-200 shadow-[0_0_0_6px_rgba(129,140,248,0.2)]" />
                                    Automations
                                </motion.div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <MagneticHover className="h-full">
                                    <div className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/70 via-zinc-900/50 to-zinc-900/30 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                                        <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.12), transparent 40%), radial-gradient(circle at 80% 20%, rgba(56,189,248,0.12), transparent 35%)" }} />
                                        <div className="relative flex items-center gap-2 text-[11px] font-medium text-purple-100">
                                            <span className="h-2 w-2 rounded-full bg-purple-200" />
                                            Workflow Design
                                        </div>
                                        <h3 className="relative text-sm font-semibold text-zinc-50">
                                            Automated Lead Qualification &amp; Routing
                                        </h3>
                                        <p className="relative text-sm text-zinc-300">
                                            Designed an n8n-based workflow that scored inbound leads, enriched them via API, and routed them to the right team with automated notifications.
                                        </p>
                                        <p className="relative text-xs text-zinc-400">
                                            Tools: n8n, REST APIs, CRM, notifications
                                        </p>
                                    </div>
                                </MagneticHover>

                                <MagneticHover className="h-full">
                                    <div className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/70 via-zinc-900/50 to-zinc-900/30 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                                        <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.12), transparent 40%), radial-gradient(circle at 80% 20%, rgba(56,189,248,0.12), transparent 35%)" }} />
                                        <div className="relative flex items-center gap-2 text-[11px] font-medium text-sky-100">
                                            <span className="h-2 w-2 rounded-full bg-sky-200" />
                                            Signal Routing
                                        </div>
                                        <h3 className="relative text-sm font-semibold text-zinc-50">
                                            Review &amp; Safety Signal Pipeline
                                        </h3>
                                        <p className="relative text-sm text-zinc-300">
                                            Built an automation that ingests reviews, runs background checks, and surfaces key signals to Operations and Customer Success for faster decisions.
                                        </p>
                                        <p className="relative text-xs text-zinc-400">
                                            Tools: Make.com, APIs, internal dashboards
                                        </p>
                                    </div>
                                </MagneticHover>
                            </div>
                        </div>
                    </div>
                </motion.section>

            </div>
        </main>
    );

}
