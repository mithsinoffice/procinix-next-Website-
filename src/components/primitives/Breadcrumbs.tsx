import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "./Container";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/seo";

type Crumb = { name: string; href: string };

type Props = {
  trail: Crumb[];
};

/**
 * Visible breadcrumbs + BreadcrumbList JSON-LD.
 * Pass a trail of { name, href } — the current page is the last item.
 */
export function Breadcrumbs({ trail }: Props) {
  const schema = breadcrumbJsonLd(
    [{ name: "Home", url: SITE_URL }].concat(
      trail.map((c) => ({ name: c.name, url: `${SITE_URL}${c.href}` })),
    ),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="relative z-10 pt-[88px] pb-2"
      >
        <Container size="wide">
          <ol className="flex items-center gap-1.5 text-[12.5px] text-white/50 flex-wrap">
            <li className="flex items-center gap-1.5">
              <Link
                href="/"
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                <Home className="h-3 w-3" />
                Home
              </Link>
            </li>
            {trail.map((c, i) => {
              const isLast = i === trail.length - 1;
              return (
                <li key={c.href} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-white/30" />
                  {isLast ? (
                    <span className="text-white/75" aria-current="page">
                      {c.name}
                    </span>
                  ) : (
                    <Link
                      href={c.href}
                      className="hover:text-white transition-colors"
                    >
                      {c.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </Container>
      </nav>
    </>
  );
}
