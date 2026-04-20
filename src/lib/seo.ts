import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.procinix.ai";

export const SITE_NAME = "Procinix";
export const BRAND_LINE = "Automation & Beyond";
export const HERO_LINE = "Don't Change Your Business to Fit Software.";
export const DEFAULT_DESCRIPTION =
  "Procinix is a unified finance operations platform — agentic AI, intelligent workflows, and real-time analytics across Source-to-Pay, Order-to-Cash, and Record-to-Report. Built for multi-entity, multi-country, multi-industry operations.";
export const DEFAULT_OG_IMAGE = "/og-default.png";

type PageSeo = {
  title: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  noindex?: boolean;
};

export function buildMetadata(seo: PageSeo): Metadata {
  const url = `${SITE_URL}${seo.path.startsWith("/") ? seo.path : `/${seo.path}`}`;
  const description = seo.description ?? DEFAULT_DESCRIPTION;
  const image = seo.image ?? DEFAULT_OG_IMAGE;
  const fullTitle =
    seo.title === SITE_NAME ? SITE_NAME : `${seo.title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    robots: seo.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type: seo.type ?? "website",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      publishedTime: seo.publishedTime,
      modifiedTime: seo.modifiedTime,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-procinix.png`,
    sameAs: ["https://www.linkedin.com/company/procinix"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@procinix.ai",
        availableLanguage: ["en"],
      },
    ],
  };
}

export function softwareApplicationJsonLd(params: {
  name: string;
  description: string;
  url: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: params.category ?? "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function breadcrumbJsonLd(trail: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
