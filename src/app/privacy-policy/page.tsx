import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { UTILITY_ROUTES } from "@/lib/routes";
import { Container } from "@/components/primitives/Container";
import { Chip } from "@/components/primitives/Chip";

const route = UTILITY_ROUTES.privacy;

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
          Privacy Policy
        </h1>

        <Prose>
          <p>
            This Privacy Policy describes how Procinix ("we", "us") collects,
            uses, and protects personal information when you visit www.procinix.ai
            or interact with our services. By using our website, you agree to the
            terms of this policy.
          </p>

          <h2>Information we collect</h2>
          <p>
            When you contact us, request a demo, or use our Value Assessment, we
            may collect: name, company, work email, phone, country, role, and
            any information you share in form fields. We also collect anonymous
            analytics (page views, referrers, UTM parameters) via standard web
            analytics tools.
          </p>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to your inquiries and deliver requested information.</li>
            <li>To contact you about a demo, assessment, or solution fit.</li>
            <li>To improve the website and understand which content is useful.</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <h2>Sharing</h2>
          <p>
            We do not sell personal information. We may share data with
            operational service providers (e.g., email delivery, CRM) strictly
            to deliver the service, under appropriate data-handling obligations.
          </p>

          <h2>Retention</h2>
          <p>
            We retain contact information only as long as necessary for business
            communication and applicable legal requirements.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights to access,
            correct, delete, or port your personal information. To exercise
            these rights, email{" "}
            <a href="mailto:info@procinix.ai">info@procinix.ai</a>.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            We use essential cookies to operate the site and optional analytics
            cookies (Google Analytics, LinkedIn Insight, Meta Pixel where
            configured) to measure engagement. You can control cookies via your
            browser.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href="mailto:info@procinix.ai">info@procinix.ai</a>.
          </p>

          <p className="muted">
            This policy is provided as a working draft. For production launch,
            the full policy should be reviewed by counsel and adapted to the
            applicable jurisdictions.
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
