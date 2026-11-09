import { Check } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import type { GuideBlock } from "@/content/guides";

type Props = {
  blocks: GuideBlock[];
};

/**
 * Renders a long-form guide (buyer's guide, glossary entry, how-to) as a
 * sequence of prose / checklist / numbered-steps sections, reusing the same
 * primitives (Section, Card) every other page is built from so a guide page
 * looks native to the site rather than bolted on.
 */
export function GuideArticle({ blocks }: Props) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "prose") {
          return (
            <Section
              key={i}
              title={block.heading}
              containerSize="narrow"
              className={i === 0 ? undefined : "pt-0"}
            >
              <div className="flex flex-col gap-5">
                {block.paragraphs.map((p, pi) => (
                  <p
                    key={pi}
                    className="text-[15.5px] lg:text-[16.5px] text-white/65 leading-[1.75]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Section>
          );
        }

        if (block.type === "checklist") {
          return (
            <Section
              key={i}
              eyebrow="Checklist"
              title={block.heading}
              description={block.description}
              containerSize="narrow"
              className={i === 0 ? undefined : "pt-0"}
            >
              <div className="flex flex-col gap-3">
                {block.items.map((item) => (
                  <Card key={item.title} className="p-5 flex items-start gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--accent-teal)]/30 bg-[var(--accent-teal)]/10 text-[var(--accent-teal-bright)]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <h4 className="font-display text-[15.5px] text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[13.5px] text-white/55 leading-[1.6]">
                        {item.body}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>
          );
        }

        return (
          <Section
            key={i}
            eyebrow="Timeline"
            title={block.heading}
            description={block.description}
            containerSize="narrow"
            className={i === 0 ? undefined : "pt-0"}
          >
            <div className="flex flex-col gap-3">
              {block.steps.map((step, si) => (
                <Card key={step.title} className="p-5 flex items-start gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[13px] font-display text-white/70">
                    {si + 1}
                  </span>
                  <div>
                    <h4 className="font-display text-[15.5px] text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-[13.5px] text-white/55 leading-[1.6]">
                      {step.body}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
}
