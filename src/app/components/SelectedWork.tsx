import { projects, type ProjectCase } from "../data/projects";

function WorkflowFigure({ project }: { project: ProjectCase }) {
  return (
    <figure className="case-workflow" aria-labelledby={`${project.id}-flow-caption`}>
      <figcaption id={`${project.id}-flow-caption`}>Generalized workflow</figcaption>
      <ol className="case-flow">
        {project.flow.map((step, index) => (
          <li key={step} className={index === project.controlStep ? "case-flow-control" : undefined}>
            <span className="case-flow-number" aria-hidden="true">0{index + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className="case-illustration-note">Simplified illustration · Records omitted</p>
    </figure>
  );
}

function ProjectCard({ project, index }: { project: ProjectCase; index: number }) {
  return (
    <article className={`case-card${index < 3 ? " case-card-featured" : ""}`} id={project.id} aria-labelledby={`${project.id}-title`}>
      <div className="case-overview">
        <div className="case-heading">
          <p className="case-category">{project.category}</p>
          <span className={`case-status case-status-${project.statusKind}`}>{project.status}</span>
        </div>
        <h3 id={`${project.id}-title`}>{project.title}</h3>
        <p className="case-summary">{project.summary}</p>
        <dl className="case-facts">
          <div><dt>My contribution</dt><dd>{project.contribution}</dd></div>
          <div><dt>Delivered & current scope</dt><dd>{project.result}</dd></div>
        </dl>
        <ul className="case-tools" aria-label={`${project.title} tools`}>
          {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
      </div>
      <WorkflowFigure project={project} />
      <details className="case-details">
        <summary>
          <span className="case-read-label">Read case study</span>
          <span className="case-close-label">Close case study</span>
          <span className="case-visually-hidden">: {project.title}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </summary>
        <div className="case-detail-content">
          <div><h4>Problem</h4><p>{project.problem}</p></div>
          <div><h4>My contribution</h4><p>{project.implementation}</p></div>
          <div><h4>Decision & control</h4><p>{project.control}</p></div>
          <div><h4>Scope</h4><p>{project.scope}</p></div>
        </div>
      </details>
    </article>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="section page-width work-section" aria-labelledby="work-title">
      <div className="section-heading">
        <div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-title">From moving parts<br />to working systems.</h2></div>
        <p>Internal tools, integrations, and AI-assisted workflows I helped build. Each case shows the problem, my contribution, and delivery status.</p>
      </div>
      <div className="case-grid">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}</div>
    </section>
  );
}
