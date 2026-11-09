/**
 * Long-form guide content (buyer's guides, glossary, how-to pieces).
 * Each guide is a flat list of GuideBlock entries rendered by
 * <GuideArticle> — see src/components/sections/GuideArticle.tsx.
 */

export type GuideChecklistItem = { title: string; body: string };

export type GuideBlock =
  | { type: "prose"; heading?: string; paragraphs: string[] }
  | {
      type: "checklist";
      heading: string;
      description?: string;
      items: GuideChecklistItem[];
    }
  | {
      type: "numbered";
      heading: string;
      description?: string;
      steps: GuideChecklistItem[];
    };

export const RECORD_TO_REPORT_BUYERS_GUIDE: GuideBlock[] = [
  {
    type: "prose",
    heading: "What is record-to-report software?",
    paragraphs: [
      "Record-to-report (R2R) software is the system finance teams use to run the period-end close — from posting and reconciling transactions through to consolidated, audit-ready financial statements. It replaces the spreadsheet trackers, email chains, and manual journal uploads that most finance teams still use to close the books.",
      "At a minimum, R2R software should cover close task orchestration, account and bank reconciliation, journal entry automation, provisions and accruals, intercompany elimination and consolidation, and a real-time view of close progress across every entity. The better platforms also handle amortization schedules, lease accounting, and variance analysis without a separate point tool.",
      "It's a different category from an ERP's native close module. An ERP keeps the ledger; R2R software sits on top of one or several ERPs and orchestrates the human and system work needed to turn ledger activity into a closed, reconciled, reported set of books — on a fixed calendar, with evidence.",
    ],
  },
  {
    type: "checklist",
    heading: "Core capabilities to evaluate",
    description:
      "Most R2R vendor pitches look similar on the surface. These are the capabilities that actually separate a platform that compresses your close from one that just digitizes your spreadsheets.",
    items: [
      {
        title: "Close task orchestration & calendar",
        body: "A single, role-assigned checklist per entity with dependencies, due dates, and escalation — not a shared spreadsheet re-created every month.",
      },
      {
        title: "Account & bank reconciliation automation",
        body: "Rule-based auto-matching with a clear exceptions queue, not a tool that only helps once you've already matched most lines by hand.",
      },
      {
        title: "Journal entry automation & approval",
        body: "Templated, recurring, and allocation journals with maker-checker approval and a system-of-record audit trail — no email-approved journal vouchers.",
      },
      {
        title: "Intercompany & consolidation",
        body: "Automatic intercompany matching and elimination, FX translation, and minority-interest handling across however many entities you run today — and the number you'll run in two years.",
      },
      {
        title: "Provisions, accruals & amortization",
        body: "Policy-driven, recurring provisions and amortization/lease schedules that post themselves on schedule, with the calculation visible for audit.",
      },
      {
        title: "Variance analysis & flux commentary",
        body: "Automated flux between periods and against budget, with commentary capture built into the close workflow rather than a separate deck built after.",
      },
      {
        title: "Audit trail & evidence management",
        body: "Every balance, journal, and reconciliation carries its evidence and approval history natively — auditors pull it from the system instead of you reconstructing it.",
      },
      {
        title: "Real-time close-progress visibility",
        body: "A live view of close status by entity and task for controllers and the CFO — not a status update compiled once a week.",
      },
      {
        title: "Multi-entity, multi-currency, multi-GAAP",
        body: "Native support for the entity structures, currencies, and statutory reporting bases you actually operate under, not a feature on the roadmap.",
      },
      {
        title: "ERP & source-system integration",
        body: "Clean, two-way integration with your GL and subledgers (AP, AR, fixed assets) so R2R isn't a manual-upload island.",
      },
    ],
  },
  {
    type: "prose",
    heading: "Build vs. buy vs. point tool",
    paragraphs: [
      "Three paths show up in most evaluations: keep extending spreadsheets and an internal close tracker, buy a single-purpose tool for one piece of the close (reconciliation software, or a consolidation engine alone), or adopt a unified R2R platform that covers the full close lifecycle.",
      "Spreadsheets scale the worst — every added entity, currency, or reporting basis multiplies manual effort and audit risk, and the \"system\" lives in one controller's head. A single-purpose point tool fixes one bottleneck (usually reconciliation) but leaves task orchestration, journals, and consolidation disconnected, so you're still stitching the close together by hand across tools.",
      "A unified R2R platform is the better fit once you're running close across more than a couple of entities, operating in more than one currency or statutory basis, or spending real controller time reconstructing evidence for audit each cycle. The switching cost is real, but it's paid once; the spreadsheet cost compounds every month.",
    ],
  },
  {
    type: "numbered",
    heading: "What implementation actually looks like",
    description:
      "A realistic, phase-by-phase timeline for a multi-entity R2R rollout — not the compressed \"go live in two weeks\" version vendors lead with.",
    steps: [
      {
        title: "Weeks 1–2: Discovery & close-process mapping",
        body: "Document today's close calendar, task owners, chart of accounts, and entity/consolidation structure across every legal entity in scope.",
      },
      {
        title: "Weeks 3–6: Configuration",
        body: "Build the close checklist, reconciliation rules, journal templates, provisioning policies, and consolidation/elimination logic against real historical data.",
      },
      {
        title: "Weeks 7–8: Parallel run",
        body: "Run the new system alongside the existing close process for one or two cycles, reconciling outputs before cutting over.",
      },
      {
        title: "Weeks 9–10: Go-live",
        body: "Cut over fully, with the old process kept as a documented fallback for one more cycle.",
      },
      {
        title: "Ongoing: Expand & tune",
        body: "Add entities, tighten reconciliation rules, and extend automation into provisions, amortization, and flux commentary as the team gets comfortable.",
      },
    ],
  },
  {
    type: "checklist",
    heading: "Questions to ask every vendor before you sign",
    description:
      "Use these in the demo, not after. They separate platforms that actually run a multi-entity close from ones that demo well.",
    items: [
      {
        title: "How does intercompany elimination actually work?",
        body: "Ask for a live walkthrough with mismatched intercompany balances across currencies — not a slide.",
      },
      {
        title: "What happens when a reconciliation doesn't auto-match?",
        body: "Every platform claims high auto-match rates. Ask to see the exceptions queue and how an unmatched line gets resolved and evidenced.",
      },
      {
        title: "Can it support our statutory reporting bases natively?",
        body: "IFRS, Ind AS, US GAAP, or local statutory variants — confirm native support, not \"on the roadmap\" or a manual workaround.",
      },
      {
        title: "How is audit evidence retained and exported?",
        body: "Auditors need to pull evidence directly. Ask what that export actually looks like, not just that \"everything is logged.\"",
      },
      {
        title: "What's the real implementation timeline for our entity count?",
        body: "Push past the generic answer — ask for a reference customer with a similar entity/currency footprint and their actual timeline.",
      },
      {
        title: "How does it integrate with our specific ERP and subledgers?",
        body: "Confirm the integration is two-way and already proven with your ERP version, not a custom build quoted as a change order later.",
      },
      {
        title: "Who owns configuration after go-live?",
        body: "Confirm whether your team can add entities, adjust close tasks, and change reconciliation rules without a vendor services ticket.",
      },
    ],
  },
  {
    type: "prose",
    heading: "What the switch is typically worth",
    paragraphs: [
      "Directionally, finance teams moving from a spreadsheet-driven close to a unified R2R platform see close-days compress by roughly 30–50%, full task-ownership traceability instead of ad-hoc tracking, and close progress visible in real time rather than reconstructed from status emails. Actual results depend on your starting entity count, close complexity, and how disciplined the configuration is — ask any vendor for the assumptions behind their number, not just the number.",
    ],
  },
];

export const BANK_RECONCILIATION_AUTOMATION_GUIDE: GuideBlock[] = [
  {
    type: "prose",
    heading: "What bank reconciliation automation actually does",
    paragraphs: [
      "Bank reconciliation is the process of matching your ledger's cash balance against your bank statement balance, line by line, until every transaction is accounted for. Done manually, it means exporting a bank statement, exporting ledger entries, and matching them in a spreadsheet — a process that scales badly once you're running more than one bank account or one entity.",
      "Automating it means the system ingests bank statements directly (via bank feed or file import), applies matching rules against ledger transactions, and auto-clears everything that matches — leaving only genuine exceptions for a human to investigate. The goal isn't zero human involvement; it's making sure the only things a person looks at are the ones that actually need judgment.",
    ],
  },
  {
    type: "numbered",
    heading: "How to roll it out",
    description:
      "A practical sequence for automating bank reconciliation without disrupting the close while you're mid-rollout.",
    steps: [
      {
        title: "Connect or import bank statements",
        body: "Set up a direct bank feed where your bank supports it, or a scheduled statement import (MT940, CSV, or your bank's export format) where it doesn't.",
      },
      {
        title: "Build matching rules from your actual transaction patterns",
        body: "Start with your highest-volume, most predictable transaction types (recurring vendor payments, standard customer receipts) and write matching rules against those first.",
      },
      {
        title: "Run in parallel with your manual process for one cycle",
        body: "Let the automated match run alongside your existing manual reconciliation for at least one close, and compare outputs before trusting it fully.",
      },
      {
        title: "Tune rules against the exceptions queue",
        body: "Every unmatched item is a signal — either a rule that needs to be broader, or a genuine exception. Tighten rules based on what keeps landing in the queue.",
      },
      {
        title: "Extend to every bank account and entity",
        body: "Once the pattern is proven on one account, roll it out across every bank account and entity rather than running a mixed manual/automated process indefinitely.",
      },
    ],
  },
  {
    type: "checklist",
    heading: "What good matching logic handles",
    description:
      "The difference between a reconciliation tool that helps and one that just moves your spreadsheet into software shows up in how it handles these cases.",
    items: [
      {
        title: "Exact 1:1 matches",
        body: "The easy case — one bank line matches one ledger line on amount and reference. Should auto-clear with no review needed.",
      },
      {
        title: "Many-to-one and one-to-many matches",
        body: "A single bank deposit covering several customer invoices, or several bank debits covering one vendor payment batch — common in practice, and a frequent blind spot in weaker tools.",
      },
      {
        title: "Partial and split payments",
        body: "A payment that covers part of an invoice, or splits across two ledger entries, shouldn't fall straight into the exceptions queue if the logic can handle it.",
      },
      {
        title: "Timing differences",
        body: "A transaction posted in the ledger a day before or after it clears the bank — correctly held as a reconciling item, not a false exception.",
      },
      {
        title: "Multi-currency and FX",
        body: "Bank transactions in a different currency than the ledger entry, matched after FX conversion rather than flagged as a mismatch.",
      },
      {
        title: "A clear, actionable exceptions queue",
        body: "Whatever doesn't auto-match should land in a queue with enough context (amount, date, counterparty, closest candidate matches) to resolve quickly — not just a flat list of unmatched lines.",
      },
    ],
  },
  {
    type: "prose",
    heading: "What it's worth",
    paragraphs: [
      "The direct payoff is time: reconciliation that used to take days per entity per month comes down to reviewing a short exceptions queue. The indirect payoff is control quality — automated matching rules apply the same logic every time, so reconciliation quality doesn't depend on which analyst did it or how much time they had that month, and every match carries its own evidence trail for audit.",
    ],
  },
];

export const R2R_PROCESS_AUTOMATION_GUIDE: GuideBlock[] = [
  {
    type: "prose",
    heading: "What \"automating R2R\" actually means",
    paragraphs: [
      "Record-to-report automation isn't one feature — it's automating each stage of the close in sequence, from the moment transactions are posted through to the final reporting pack. Done well, it compresses close time while making the books more defensible, not less, because every automated step still carries its own audit trail.",
      "This guide walks through the close in the order it actually runs, stage by stage, so you can see exactly where automation fits and what still needs a human in the loop.",
    ],
  },
  {
    type: "numbered",
    heading: "The R2R process, stage by stage",
    description:
      "Five stages, each with its own automation opportunity — not a single switch you flip.",
    steps: [
      {
        title: "1. Task orchestration",
        body: "Replace the shared close-tracker spreadsheet with a system-managed checklist: role-assigned tasks, dependencies, due dates, and automatic escalation when something's late.",
      },
      {
        title: "2. Reconciliation",
        body: "Automate account and bank reconciliation with rule-based matching, leaving only genuine exceptions for manual review (see our dedicated guide on automating bank reconciliation).",
      },
      {
        title: "3. Journal entries",
        body: "Template recurring and allocation journals so they generate and route for approval automatically, rather than being rebuilt from scratch each period.",
      },
      {
        title: "4. Provisions, accruals & amortization",
        body: "Set policy-driven schedules for recurring provisions, accruals, and amortization so they post themselves on schedule, with the calculation visible for audit rather than reconstructed from a side spreadsheet.",
      },
      {
        title: "5. Consolidation & reporting",
        body: "Automate intercompany matching, elimination, and FX translation so group consolidation is a scheduled run against clean data, not a quarter-end scramble — with statutory and management packs generated from the same closed numbers.",
      },
    ],
  },
  {
    type: "checklist",
    heading: "What stays manual, deliberately",
    description:
      "Automating R2R doesn't mean removing judgment — some steps should stay with a controller, by design.",
    items: [
      {
        title: "Exception investigation",
        body: "A reconciliation item that doesn't auto-match needs a person to understand why, not a rule that force-clears it.",
      },
      {
        title: "Judgment-based provisions",
        body: "Routine, policy-driven provisions can post automatically; a one-off provision based on a legal or commercial judgment call still needs a controller's sign-off.",
      },
      {
        title: "Variance explanation",
        body: "Automated flux analysis can surface what moved — explaining why it moved, in a way the CFO can act on, is still a human task.",
      },
      {
        title: "Final review and sign-off",
        body: "Automation should make the close faster to get through, not remove the final controller and CFO review before numbers go out the door.",
      },
    ],
  },
  {
    type: "prose",
    heading: "Sequencing the rollout",
    paragraphs: [
      "Don't automate all five stages at once. The practical order is usually: task orchestration first (it's the lowest-risk, highest-visibility win), then reconciliation (the biggest time sink in most closes), then journal automation, then provisions/amortization, and consolidation last — since consolidation depends on everything upstream being reliable first. Each stage should run in parallel with the existing manual process for at least one cycle before full cutover.",
    ],
  },
];
