import type { Metadata } from "next";
import { buildMetadata, softwareApplicationJsonLd, SITE_URL } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import { ROICalculatorPage } from "@/components/pages/ROICalculatorPage";

const route = ROUTES.roiCalculator;

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
  keywords: route.keywords,
});

export default function Page() {
  const jsonLd = softwareApplicationJsonLd({
    name: "Procinix Platform",
    description: route.description,
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
  });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ROICalculatorPage />
    </>
  );
}
