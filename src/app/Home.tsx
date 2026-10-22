import Image from "next/image";
import CustomCursor from "./components/CustomCursor";
import SelectedWork from "./components/SelectedWork";

const linkedin = "https://www.linkedin.com/in/pjcohen/";
const email = "mailto:paulcohen10000@gmail.com";

function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {diagonal ? (
        <path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

const experience = [
  {
    company: "CitizenShipper",
    role: "AI Systems & Automation Specialist",
    dates: "Feb 2025 — Present",
    current: true,
    description: "Designing, building, and maintaining adaptable automations across Operations, Customer Success, and Marketing. Connecting n8n, Zapier, Make, OpenAI, and APIs with business systems, while keeping human review and reliable monitoring part of the workflow.",
  },
  {
    company: "CitizenShipper",
    role: "Customer Success",
    dates: "Oct 2023 — Apr 2025",
    description: "Optimized ticket flows and standard operating procedures, supported cross-functional escalations, and identified gaps in customer workflows.",
  },
  {
    company: "Psilolabs",
    role: "Customer Success Manager",
    dates: "Sep 2022 — Sep 2023",
    description: "Customer success experience that continues to shape how I approach processes, communication, and the people using a system.",
  },
  {
    company: "Concentrix",
    role: "Team Lead",
    dates: "Jun 2021 — Feb 2022",
    description: "A foundation in team leadership and customer operations.",
  },
  {
    company: "Concentrix",
    role: "Bilingual Customer Service Representative",
    dates: "Feb 2020 — Jun 2021",
    description: "Customer service experience that grounds my approach to the people and processes behind a workflow.",
  },
];

export default function Home() {
  return (
    <>
      <CustomCursor />
      <div className="ambient-glow" aria-hidden="true"><span /><span /><span /></div>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="page-width header-inner">
          <a className="wordmark" href="#top" aria-label="Paul Cohen, back to top"><span className="monogram">pc<span>.</span></span><span className="wordmark-name">Paul Cohen</span></a>
          <nav className="desktop-nav" aria-label="Main navigation"><a href="#work">Selected work</a><a href="#experience">Experience</a><a href="#about">About</a></nav>
          <a className="header-contact" href="#contact">Let&apos;s talk <Arrow diagonal /></a>
        </div>
      </header>

      <main id="main">
        <section className="hero page-width" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="small-line" /> AI AUTOMATION & OPERATIONS</p>
            <h1 id="hero-title">Designing end-to-end automations <span>that turn complexity into clarity.</span></h1>
            <p className="hero-intro">I build automation systems that connect tools, teams, and data — so people can focus on meaningful work instead of repetitive tasks.</p>
            <p className="hero-description">From Operations and Marketing to Customer Success, I help build workflows that teams can understand and maintain.</p>
            <div className="hero-actions"><a className="button button-primary" href={email}>Let&apos;s connect <Arrow diagonal /></a><a className="text-link" href="#work">Explore my work <Arrow /></a></div>
            <div className="hero-tools"><span>BUILT WITH</span><p>n8n <i /> Zapier <i /> Make <i /> API integrations</p></div>
          </div>
          <div className="hero-portrait">
            <div className="portrait-accent" aria-hidden="true"><svg viewBox="0 0 460 500" fill="none"><path d="M-40 325c180-250 300 240 550-35M-45 280c180-250 300 240 550-35M-50 235c180-250 300 240 550-35" stroke="currentColor" strokeWidth="1" /></svg></div>
            <div className="portrait-frame"><Image src="/paul-linkedin.jpg" alt="Paul Cohen" fill sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 430px" priority className="portrait-image" /></div>
            <div className="portrait-note"><span className="note-icon" aria-hidden="true">↗</span><span>Workflow design<br /><strong>Integration & validation</strong></span></div>
            <div className="portrait-caption"><span>PAUL COHEN</span><span>AI Systems & Automation Specialist</span></div>
          </div>
        </section>

        <div className="page-width impact-strip" aria-label="My approach">
          <div><strong>Built to last</strong><p>Clear controls<br /><span>and maintainable workflows</span></p></div>
          <div><strong>End to end</strong><p>From the messy process<br /><span>to a connected workflow</span></p></div>
          <div><strong>People first</strong><p>Technology that makes<br /><span>day-to-day work easier</span></p></div>
        </div>

        <SelectedWork />

        <section className="toolbox-section" aria-labelledby="toolbox-title"><div className="page-width toolbox-inner"><div><p className="eyebrow" id="toolbox-title">THE TOOLBOX</p><p>The right tool for the problem.</p></div><ul><li>n8n</li><li>Zapier</li><li>Make</li><li>OpenAI</li><li>APIs & webhooks</li></ul></div></section>

        <section id="experience" className="section page-width experience-section" aria-labelledby="experience-title"><div className="experience-intro"><p className="eyebrow">02 / EXPERIENCE</p><h2 id="experience-title">People, processes,<br />and what&apos;s next.</h2><p>My path from Customer Success to AI and automation keeps the human side of every system in view.</p><a className="text-link" href="/resume.pdf" target="_blank" rel="noreferrer">View my résumé <Arrow diagonal /></a></div><div className="experience-list">{experience.map((item) => <article className="experience-item" key={`${item.company}-${item.role}`}><div className="experience-meta"><span>{item.company}</span><span>{item.dates}</span></div><h3>{item.role}{item.current && <span className="current-badge">CURRENT</span>}</h3><p>{item.description}</p></article>)}<div className="earlier-experience"><span className="eyebrow">EARLIER</span><p>Customer Success Manager · Plantcado <span>Feb 2018 — Feb 2020</span></p></div></div></section>

        <section id="about" className="about-section" aria-labelledby="about-title"><div className="page-width about-inner"><div><p className="eyebrow">03 / THE PERSON BEHIND THE PROCESS</p><h2 id="about-title">I like untangling<br /><span>the complicated.</span></h2></div><div className="about-copy"><p>I enjoy finding the gap between how work happens and how it could work better. Sometimes that means connecting the right tools. Sometimes it means simplifying the process first.</p><p>My work spans Operations, Customer Success, and Marketing. I use n8n, Zapier, Make, and API integrations to connect systems and support the people using them.</p><p>The goal is simple: make day-to-day work easier for the people doing it.</p><div className="education-note"><span className="eyebrow">ALWAYS LEARNING</span><p>Business Administration — in progress<br /><span>Universidad de Costa Rica · 2021–Present</span></p></div></div></div></section>

        <section id="contact" className="section page-width contact-section" aria-labelledby="contact-title"><p className="eyebrow">04 / LET&apos;S CONNECT</p><div className="contact-heading"><h2 id="contact-title">What could work<br /><span>better?</span></h2><a className="contact-arrow" href={email} aria-label="Email Paul Cohen"><Arrow diagonal /></a></div><div className="contact-bottom"><p>Have a process to simplify, a system to connect,<br className="desktop-break" /> or an idea worth exploring? I&apos;d love to hear it.</p><div><a className="text-link" href={email}>Email me <Arrow diagonal /></a><a className="text-link" href={linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <Arrow diagonal /></a></div></div></section>
      </main>

      <footer className="site-footer"><div className="page-width footer-inner"><a className="footer-name" href="#top">Paul Cohen<span>.</span></a><p>AI Automation & Operations</p><a href="#top">Back to top ↑</a></div></footer>
    </>
  );
}
