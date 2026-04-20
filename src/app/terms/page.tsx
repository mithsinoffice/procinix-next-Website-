import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { UTILITY_ROUTES } from "@/lib/routes";
import { Container } from "@/components/primitives/Container";
import { Chip } from "@/components/primitives/Chip";

const route = UTILITY_ROUTES.terms;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

export default function Page() {
  return (
    <section className="relative pt-[72px] pb-24">
      <Container size="narrow" className="py-16 lg:py-24">
        <Chip tone="neutral" className="mb-6">
          Legal
        </Chip>
        <h1 className="font-display text-white leading-[1.04] tracking-[-0.025em] text-[40px] lg:text-[56px] mb-10">
          Terms of Service
        </h1>

        <Prose>
          <p>
            These Terms of Service govern your access to and use of www.procinix.ai
            and any Procinix services you interact with through this website.
            By using the site, you agree to these terms.
          </p>

          <h2>Use of the website</h2>
          <p>
            The website is provided for informational and business-communication
            purposes. You agree not to misuse the site, attempt to disrupt its
            operation, or use it to transmit unlawful content.
          </p>

          <h2>Intellectual property</h2>
          <p>
            All content on this site — text, graphics, logos, product names,
            and assessments — is owned by Procinix or its licensors and is
            protected by applicable intellectual property laws. You may not
            reproduce or redistribute site content without permission.
          </p>

          <h2>Value Assessment estimates</h2>
          <p>
            The Value Assessment / ROI tool produces directional estimates based
            on the inputs you provide. Actual outcomes depend on workflow
            maturity, process design, data quality, automation scope, and user
            adoption. Estimates should not be treated as commitments or
            representations of guaranteed outcomes.
          </p>

          <h2>Disclaimers</h2>
          <p>
            The website is provided "as is" without warranties of any kind.
            Procinix disclaims all implied warranties to the extent permitted by
            law.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, Procinix shall not be liable
            for indirect, incidental, or consequential damages arising from use
            of the website.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of India, without regard to
            conflict-of-laws principles. Exclusive jurisdiction for disputes
            lies with the courts of Mumbai, Maharashtra.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email{" "}
            <a href="mailto:legal@procinix.ai">legal@procinix.ai</a>.
          </p>

          <p className="muted">
            These terms are provided as a working draft. For production use,
            they should be reviewed by counsel and adapted to the applicable
            jurisdictions and services.
          </p>
        </Prose>
      </Container>
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="prose-procinix text-[15.5px] text-white/75 leading-[1.75]
        [&_h2]:font-display [&_h2]:text-white [&_h2]:text-[22px] [&_h2]:mt-10 [&_h2]:mb-3
        [&_p]:mb-5
        [&_ul]:mb-5 [&_ul]:space-y-2 [&_ul]:list-none [&_ul]:pl-0
        [&_li]:relative [&_li]:pl-5 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[10px] [&_li]:before:h-1 [&_li]:before:w-2 [&_li]:before:bg-[var(--accent-teal)] [&_li]:before:rounded-full
        [&_a]:text-[var(--accent-teal-bright)] [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-white
        [&_.muted]:text-white/40 [&_.muted]:text-[13px] [&_.muted]:italic [&_.muted]:mt-10 [&_.muted]:block"
    >
      {children}
    </div>
  );
}
