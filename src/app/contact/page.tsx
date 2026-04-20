import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CORE_ROUTES } from "@/lib/routes";
import { AuroraBackground } from "@/components/primitives/AuroraBackground";
import { GridLines } from "@/components/primitives/GridLines";
import { Container } from "@/components/primitives/Container";
import { Chip } from "@/components/primitives/Chip";
import { ContactForm } from "@/components/forms/ContactForm";

const route = CORE_ROUTES.contact;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

export default function Page() {
  return (
    <section className="relative isolate overflow-hidden pt-[72px] pb-24 lg:pb-32 min-h-[calc(100vh-72px)]">
      <AuroraBackground intensity="soft" />
      <GridLines />
      <Container size="wide" className="relative z-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Chip tone="teal" dot className="mb-6">
              Contact
            </Chip>
            <h1 className="font-display text-white leading-[1.04] tracking-[-0.025em] text-[40px] sm:text-[52px] lg:text-[60px]">
              Talk to a finance operations{" "}
              <span className="text-white/40">specialist.</span>
            </h1>
            <p className="mt-6 text-[16.5px] text-white/65 leading-[1.6] max-w-lg">
              We walk through your operating model, your complexity, and the
              outcomes you're targeting — then show what a tailored Procinix
              deployment looks like.
            </p>
            <ul className="mt-10 space-y-4 text-[14.5px] text-white/75">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-teal)]/10 text-[var(--accent-teal-bright)]">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-1">
                    Email
                  </div>
                  <a
                    href="mailto:hello@procinix.ai"
                    className="hover:text-white transition-colors"
                  >
                    hello@procinix.ai
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-teal)]/10 text-[var(--accent-teal-bright)]">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-1">
                    Phone
                  </div>
                  <a
                    href="tel:+918591399753"
                    className="hover:text-white transition-colors"
                  >
                    +91 85913 99753
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-teal)]/10 text-[var(--accent-teal-bright)]">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-1">
                    Coverage
                  </div>
                  India · UAE · KSA · Singapore · Australia · USA
                </div>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <ContactForm
              intent="contact"
              headline="Tell us about your finance operations."
              subhead="One of our specialists will respond within a business day."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
