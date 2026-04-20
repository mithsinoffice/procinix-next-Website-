import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CORE_ROUTES } from "@/lib/routes";
import { AuroraBackground } from "@/components/primitives/AuroraBackground";
import { GridLines } from "@/components/primitives/GridLines";
import { Container } from "@/components/primitives/Container";
import { Chip } from "@/components/primitives/Chip";
import { ContactForm } from "@/components/forms/ContactForm";

const route = CORE_ROUTES.bookDemo;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

const includes = [
  "Walk through your operating model — S2P, O2C, R2R",
  "Configurable workflow scenarios on your complexity",
  "Agentic AI and exception handling on real examples",
  "Directional ROI projection based on your inputs",
  "Integration map against your current stack",
];

export default function Page() {
  return (
    <section className="relative isolate overflow-hidden pt-[72px] pb-24 lg:pb-32 min-h-[calc(100vh-72px)]">
      <AuroraBackground intensity="soft" />
      <GridLines />
      <Container size="wide" className="relative z-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Chip tone="amber" dot className="mb-6">
              Book a Demo
            </Chip>
            <h1 className="font-display text-white leading-[1.04] tracking-[-0.025em] text-[40px] sm:text-[52px] lg:text-[60px]">
              A 30-minute walkthrough. <br />
              <span className="text-white/40">Built around you.</span>
            </h1>
            <p className="mt-6 text-[16.5px] text-white/65 leading-[1.6] max-w-lg">
              No canned pitch. We adapt to your operating model, your complexity,
              and the outcomes you're targeting — and show the platform working
              on them.
            </p>
            <div className="mt-10">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--accent-amber)] mb-4">
                What you'll see
              </div>
              <ul className="space-y-3">
                {includes.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[14.5px] text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[var(--accent-teal-bright)] mt-1 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ContactForm
              intent="demo"
              headline="Request your walkthrough."
              subhead="Tell us a little about your operations — we'll tailor the session."
              submitLabel="Request Demo"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
