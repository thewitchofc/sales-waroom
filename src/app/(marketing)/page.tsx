import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { SectionSkeleton } from "@/components/ui/section-skeleton";

const ProductPreviewGrid = dynamic(
  () =>
    import("@/components/pages/product-preview-grid").then((m) => ({
      default: m.ProductPreviewGrid,
    })),
  { loading: () => <SectionSkeleton /> }
);

const TrustedBy = dynamic(
  () =>
    import("@/components/sections/trusted-by").then((m) => ({
      default: m.TrustedBy,
    })),
  { loading: () => <SectionSkeleton className="py-12" /> }
);

const Testimonials = dynamic(
  () =>
    import("@/components/sections/testimonials").then((m) => ({
      default: m.Testimonials,
    })),
  { loading: () => <SectionSkeleton /> }
);

const FinalCTA = dynamic(
  () =>
    import("@/components/sections/final-cta").then((m) => ({
      default: m.FinalCTA,
    })),
  { loading: () => <SectionSkeleton className="py-16" /> }
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductPreviewGrid />
      <TrustedBy />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
