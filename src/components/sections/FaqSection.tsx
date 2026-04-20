"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { faqJsonLd } from "@/lib/seo";

export type Faq = { question: string; answer: string };

type Props = {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  faqs: Faq[];
  className?: string;
};

/**
 * Accessible FAQ accordion with inline FAQPage JSON-LD.
 * FAQPage schema makes these eligible for Google rich results (expandable
 * Q&A snippets on SERP).
 */
export function FaqSection({
  eyebrow = "FAQ",
  title = (
    <>
      Questions, <span className="text-white/40">answered.</span>
    </>
  ),
  description,
  faqs,
  className,
}: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqs)),
        }}
      />
      <Section
        eyebrow={eyebrow}
        title={title}
        description={description}
        containerSize="narrow"
        className={className}
      >
        <div className="flex flex-col gap-2">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={f.question}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02]"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[16.5px] lg:text-[18px] text-white leading-snug">
                    {f.question}
                  </span>
                  <ChevronDown
                    className={
                      "h-4 w-4 shrink-0 text-white/50 transition-transform duration-300 " +
                      (isOpen ? "rotate-180 text-[var(--accent-teal-bright)]" : "")
                    }
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-[14.5px] text-white/65 leading-[1.7]">
                        {f.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
