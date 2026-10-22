export type ProjectCase = {
  id: string;
  category: string;
  title: string;
  status: string;
  statusKind: "deployed" | "pilot" | "review" | "partial";
  summary: string;
  contribution: string;
  result: string;
  tools: readonly string[];
  flow: readonly [string, string, string, string];
  controlStep: number;
  problem: string;
  implementation: string;
  control: string;
  scope: string;
};

// Public summaries only. Diagrams contain no production records or configuration.
export const projects: readonly ProjectCase[] = [
  {
    id: "approval-gated-intake",
    category: "Workflow integration",
    title: "Approval-gated work intake",
    status: "Deployed",
    statusKind: "deployed",
    summary: "A Slack-to-tracker handoff that preserves request context and waits for human approval.",
    contribution: "Integration & write verification",
    result: "Approved requests become tasks with a verified link back to the source.",
    tools: ["Python", "Slack API", "Plane API", "SQLite"],
    flow: ["Request", "Human approval", "Create task", "Verify link"],
    controlStep: 1,
    problem: "Moving a request from a conversation into a tracker can lose its context or create duplicate tasks when a write is uncertain.",
    implementation: "I contributed to an AI-assisted build connecting Slack requests to task creation, with source deduplication, durable receipts, and verification of the saved task.",
    control: "Human approval gates task creation. Uncertain writes are reconciled before another task is created.",
    scope: "Deployed for approved-request handoff, saved-task verification, and source-linked receipts.",
  },
  {
    id: "analytics-ai-reporting",
    category: "Internal tools · Applied AI",
    title: "Analytics & AI reporting assistant",
    status: "Deployed internal tool",
    statusKind: "deployed",
    summary: "A reporting interface pairing charts and shared reporting periods with AI explanations of validated aggregates.",
    contribution: "Reporting interface & bounded AI context",
    result: "A working interface for exploring reports and explaining the figures shown.",
    tools: ["JavaScript / Node.js", "Python", "PostgreSQL", "Chart.js", "AI APIs"],
    flow: ["Sources", "Validate aggregate", "Select period", "Explain"],
    controlStep: 1,
    problem: "Charts and AI explanations need the same reporting period, metric definitions, and data context to be useful together.",
    implementation: "I helped build the navigation, charts, shared period selection, and AI explanation interface through collaborative, AI-assisted implementation.",
    control: "AI receives bounded aggregate context. Metric definitions remain visible, and stale or unavailable data is identified in the interface.",
    scope: "The reporting and AI explanation interface is deployed, with shared periods, visible metric definitions, and data-availability states.",
  },
  {
    id: "employee-self-service",
    category: "Internal tools · Data migration",
    title: "Employee self-service & migration",
    status: "Deployed pilot",
    statusKind: "pilot",
    summary: "A request and approval portal, supported by repeatable migration tooling for historical records and attachments.",
    contribution: "Portal workflows & migration tooling",
    result: "A deployed portal pilot and migrated historical subset; broader migration is in progress.",
    tools: ["Frappe / ERPNext", "Python", "Vue", "Airtable", "Google Workspace"],
    flow: ["Request", "Review", "Approve", "Preserve record"],
    controlStep: 2,
    problem: "A self-service portal needs clear request and approval paths, while historical imports must retain record provenance and attachment integrity.",
    implementation: "I helped build request, approval, and availability workflows alongside repeatable import tooling, using collaborative and AI-assisted implementation.",
    control: "Role-based access and human approvals govern the portal. Imports preserve provenance and check file integrity so repeat runs can be reviewed.",
    scope: "The portal pilot is deployed and a historical subset has been migrated. The broader migration remains in progress.",
  },
  {
    id: "support-operations",
    category: "Customer operations",
    title: "Support operations workspace",
    status: "Under acceptance review",
    statusKind: "review",
    summary: "Core agent workflows on an open-source support platform, from queue routing to shared responses and reporting.",
    contribution: "Workflow implementation & agent QA",
    result: "Core workflows function; adoption and the full transition remain under review.",
    tools: ["Chatwoot", "Ruby on Rails", "Vue", "Zendesk API"],
    flow: ["Incoming ticket", "Classify", "Queue", "Agent review"],
    controlStep: 3,
    problem: "A support workspace must bring routing, contact handling, responses, and reporting together without disrupting agent workflows.",
    implementation: "I collaboratively implemented queues, routing, contact classification, merging, shared responses, and reporting, and helped run agent workflow QA.",
    control: "Explicit permissions, controlled communication, workflow tests, and migration checks support acceptance review.",
    scope: "Core agent workflows are implemented. Acceptance, adoption, and the full transition remain under review.",
  },
  {
    id: "marketing-reporting",
    category: "Reporting · Source integration",
    title: "Marketing reporting workspace",
    status: "Protected pilot deployed",
    statusKind: "pilot",
    summary: "A shared reporting pilot connecting advertising, site, payment, and attribution sources for comparison.",
    contribution: "Source integrations & reconciliation",
    result: "Usable charts and definitions, with coverage gaps and source periods made explicit.",
    tools: ["Python", "JavaScript", "REST / advertising APIs", "GA4", "Stripe", "Power BI"],
    flow: ["Source APIs", "Align periods", "Check coverage", "Compare reports"],
    controlStep: 2,
    problem: "Comparing source reports requires aligned periods and clear definitions, especially when sources have different calendars or incomplete coverage.",
    implementation: "I helped build source integrations, charts, metric definitions, and reconciliation to underlying reports through collaborative, AI-assisted implementation.",
    control: "The interface identifies partial or missing data and keeps source calendars explicit rather than presenting every source as equally current.",
    scope: "A protected shared pilot is deployed with partial source coverage. Reporting gaps, source periods, and data availability remain visible.",
  },
  {
    id: "case-follow-up",
    category: "Applied AI · Human review",
    title: "Opt-in case follow-up assistant",
    status: "Tracking deployed · Delivery in review",
    statusKind: "partial",
    summary: "Human-started case tracking with owner, missing information, next steps, and source-cited AI context.",
    contribution: "Case tracking & reviewable AI context",
    result: "Tracking and advisory features are deployed; scheduled delivery acceptance is incomplete.",
    tools: ["Node.js", "Slack", "SQLite", "Claude", "Read-only support integration"],
    flow: ["Human opt-in", "Track open work", "Cited context", "Human decision"],
    controlStep: 3,
    problem: "An open case needs a visible owner, missing information, and next step, while AI suggestions need sources and a human decision.",
    implementation: "I contributed to an AI-assisted build for opt-in case tracking, persistent delivery tracking, deduplication, and source-cited context for human review.",
    control: "People start and complete cases. The support integration is read-only, and AI cannot close a case.",
    scope: "Tracking and advisory features are deployed. Scheduled reminder delivery is awaiting verification and acceptance.",
  },
];
