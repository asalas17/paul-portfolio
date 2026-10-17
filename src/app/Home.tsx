import Image from "next/image";

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

function WorkflowVisual({ variant }: { variant: "connect" | "customer" | "ai" | "creative" }) {
  if (variant === "connect") {
    return (
      <div className="workflow-visual workflow-connect" role="img" aria-label="Workflow illustration: connected tools send information into an automation and then to the right team.">
        <div className="diagram-caption"><span className="status-dot" /> CONNECT THE DOTS</div>
        <div className="connection-flow">
          <div className="flow-stack"><span>APIs</span><span>Platforms</span><span>Internal tools</span></div>
          <span className="flow-line" />
          <div className="flow-core"><svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m13 3-8 11h6l-1 7 9-12h-7l1-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg></div>
          <span className="flow-line" />
          <div className="flow-output"><span className="mini-check">✓</span><span>Right information.<br />Right team.</span></div>
        </div>
        <div className="diagram-bottom"><span>ORCHESTRATE</span><span>SYNC</span><span>NOTIFY</span></div>
      </div>
    );
  }

  if (variant === "customer") {
    return (
      <div className="workflow-visual workflow-customer" role="img" aria-label="Workflow illustration: reviews, onboarding, and CRM updates become clear customer signals.">
        <div className="diagram-caption"><span className="status-dot" /> FROM SIGNAL TO ACTION</div>
        <div className="signal-list">
          {["Review received", "Onboarding updated", "CRM synchronized"].map((text, index) => <div key={text}><span className="signal-number">0{index + 1}</span><span>{text}</span><span className="signal-check">✓</span></div>)}
        </div>
        <div className="diagram-bottom"><span>CUSTOMER OPERATIONS</span><span>CONNECTED</span></div>
      </div>
    );
  }

  if (variant === "ai") {
    return (
      <div className="workflow-visual workflow-ai" role="img" aria-label="Workflow illustration: AI classifies incoming work, a person reviews sensitive decisions, and the workflow routes the result.">
        <div className="diagram-caption"><span className="status-dot" /> AI WITH HUMAN REVIEW</div>
        <div className="ai-flow"><div><span>01</span>Classify</div><span className="flow-line" /><div className="human-step"><span>02</span>Human review</div><span className="flow-line" /><div><span>03</span>Route</div></div>
        <div className="diagram-bottom"><span>CLASSIFICATION</span><span>REVIEW</span><span>DECISION SUPPORT</span></div>
      </div>
    );
  }

  return (
    <div className="workflow-visual workflow-creative" role="img" aria-label="Workflow illustration: a creative brief becomes AI-assisted video and campaign assets.">
      <div className="diagram-caption"><span className="status-dot" /> IDEAS INTO ASSETS</div>
      <div className="creative-flow"><span className="creative-brief">Brief<span /><span /><span /></span><span className="creative-line" /><div className="creative-frame"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 6 9 6-9 6V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg><span>AI + creative</span></div></div>
      <div className="diagram-bottom"><span>VIDEO</span><span>CAMPAIGN ASSETS</span><span>ITERATION</span></div>
    </div>
  );
}

const work = [
  {
    number: "01",
    label: "SYSTEMS & INTEGRATIONS",
    title: "Cross-platform operations automation.",
    description: "Connected platforms, internal tools, and APIs so information moves between teams without manual handoffs. Built reusable workflows for data synchronization and real-time notifications, with validation, retries, and monitoring to keep them dependable.",
    tools: ["n8n", "Zapier", "Make", "REST APIs"],
    variant: "connect" as const,
  },
  {
    number: "02",
    label: "CUSTOMER OPERATIONS",
    title: "Review & onboarding workflows.",
    description: "Automated review ingestion, background checks, onboarding, and CRM updates. Brought customer signals into everyday operations to help Customer Success and Operations work with the same information.",
    tools: ["CRM workflows", "Slack", "Twilio", "API integrations"],
    variant: "customer" as const,
  },
  {
    number: "03",
    label: "APPLIED AI",
    title: "AI-assisted triage & routing.",
    description: "Applied AI to classification, drafting, research, routing, and decision support. Kept human review in place for sensitive decisions and built workflows with clear controls, alerts, and recovery paths.",
    tools: ["OpenAI", "Classification & routing", "Human review"],
    variant: "ai" as const,
  },
  {
    number: "04",
    label: "AI & MARKETING",
    title: "AI creative production.",
    description: "Created AI-generated videos and creative assets for marketing campaigns, alongside integrations with advertising and business platforms. Practical experimentation that connects creative work with day-to-day execution.",
    tools: ["AI video", "Creative assets", "Facebook & Google Ads APIs"],
    variant: "creative" as const,
  },
];

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
    description: "A foundation in team leadership and customer operations, following my role as a Bilingual Customer Service Representative from February 2020 to June 2021.",
  },
];

export default function Home() {
  return (
    <>
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
            <h1 id="hero-title">Good systems.<br /><span>Less friction.</span></h1>
            <p className="hero-intro">I&apos;m Paul. I help SaaS teams turn messy processes into simple, automated workflows.</p>
            <p className="hero-description">Connecting tools, teams, and data across Operations, Customer Success, and Marketing — so people can focus on the work that matters.</p>
            <div className="hero-actions"><a className="button button-primary" href={email}>Let&apos;s connect <Arrow diagonal /></a><a className="text-link" href="#work">Explore my work <Arrow /></a></div>
            <div className="hero-tools"><span>BUILT WITH</span><p>n8n <i /> Zapier <i /> Make <i /> API integrations</p></div>
          </div>
          <div className="hero-portrait">
            <div className="portrait-accent" aria-hidden="true"><svg viewBox="0 0 460 500" fill="none"><path d="M-40 325c180-250 300 240 550-35M-45 280c180-250 300 240 550-35M-50 235c180-250 300 240 550-35" stroke="currentColor" strokeWidth="1" /></svg></div>
            <div className="portrait-frame"><Image src="/paul-linkedin.jpg" alt="Paul Cohen" fill sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 430px" priority className="portrait-image" /></div>
            <div className="portrait-note"><span className="note-icon" aria-hidden="true">↗</span><span>Built around people.<br /><strong>Connected by design.</strong></span></div>
            <div className="portrait-caption"><span>PAUL COHEN</span><span>AI Systems & Automation Specialist</span></div>
          </div>
        </section>

        <div className="page-width impact-strip" aria-label="My approach and impact">
          <div><strong>20–40+</strong><p>hours saved per month<br /><span>through automation solutions</span></p></div>
          <div><strong>End to end</strong><p>From the messy process<br /><span>to a connected workflow</span></p></div>
          <div><strong>People first</strong><p>Technology that makes<br /><span>day-to-day work easier</span></p></div>
        </div>

        <section id="work" className="section page-width work-section" aria-labelledby="work-title">
          <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-title">From moving parts<br />to working systems.</h2></div><p>A selection of the workflows and capabilities I&apos;ve built across customer operations, integrations, and AI.</p></div>
          <div className="work-list">{work.map((item) => <article className="work-item" key={item.number}><div className="work-copy"><p className="work-kicker"><span>{item.number}</span>{item.label}</p><h3>{item.title}</h3><p className="work-description">{item.description}</p><ul className="tag-list" aria-label="Tools and capabilities">{item.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div><WorkflowVisual variant={item.variant} /></article>)}</div>
        </section>

        <section className="toolbox-section" aria-labelledby="toolbox-title"><div className="page-width toolbox-inner"><div><p className="eyebrow" id="toolbox-title">THE TOOLBOX</p><p>The right tool for the problem.</p></div><ul><li>n8n</li><li>Zapier</li><li>Make</li><li>OpenAI</li><li>API integrations</li><li>Slack & Twilio</li><li>Stripe & Brex</li></ul></div></section>

        <section id="experience" className="section page-width experience-section" aria-labelledby="experience-title"><div className="experience-intro"><p className="eyebrow">02 / EXPERIENCE</p><h2 id="experience-title">People, processes,<br />and what&apos;s next.</h2><p>My path from Customer Success to AI and automation keeps the human side of every system in view.</p><a className="text-link" href="/resume.pdf" target="_blank" rel="noreferrer">View my résumé <Arrow diagonal /></a></div><div className="experience-list">{experience.map((item) => <article className="experience-item" key={`${item.company}-${item.role}`}><div className="experience-meta"><span>{item.company}</span><span>{item.dates}</span></div><h3>{item.role}{item.current && <span className="current-badge">CURRENT</span>}</h3><p>{item.description}</p></article>)}<div className="earlier-experience"><span className="eyebrow">EARLIER</span><p>Customer Success Manager · Plantcado <span>Feb 2018 — Feb 2020</span></p></div></div></section>

        <section id="about" className="about-section" aria-labelledby="about-title"><div className="page-width about-inner"><div><p className="eyebrow">03 / THE PERSON BEHIND THE PROCESS</p><h2 id="about-title">I like untangling<br /><span>the complicated.</span></h2></div><div className="about-copy"><p>I enjoy finding the gap between how work happens and how it could work better. Sometimes that means connecting the right tools. Sometimes it means simplifying the process first.</p><p>My work spans Operations, Customer Success, and Marketing. I use n8n, Zapier, Make, and API integrations to save time, reduce costs, and improve the customer experience.</p><p>The goal is simple: make day-to-day work easier for the people doing it.</p><div className="education-note"><span className="eyebrow">ALWAYS LEARNING</span><p>Business Administration<br /><span>Universidad de Costa Rica · 2021–Present</span></p></div></div></div></section>

        <section id="contact" className="section page-width contact-section" aria-labelledby="contact-title"><p className="eyebrow">04 / LET&apos;S CONNECT</p><div className="contact-heading"><h2 id="contact-title">What could work<br /><span>better?</span></h2><a className="contact-arrow" href={email} aria-label="Email Paul Cohen"><Arrow diagonal /></a></div><div className="contact-bottom"><p>Have a process to simplify, a system to connect,<br className="desktop-break" /> or an idea worth exploring? I&apos;d love to hear it.</p><div><a className="text-link" href={email}>Email me <Arrow diagonal /></a><a className="text-link" href={linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <Arrow diagonal /></a></div></div></section>
      </main>

      <footer className="site-footer"><div className="page-width footer-inner"><a className="footer-name" href="#top">Paul Cohen<span>.</span></a><p>AI Automation & Operations</p><a href="#top">Back to top ↑</a></div></footer>
    </>
  );
}
