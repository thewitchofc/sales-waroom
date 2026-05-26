import { Hero } from "@/components/sections/hero";
import { ProductPreviewGrid } from "@/components/pages/product-preview-grid";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCTA } from "@/components/sections/final-cta";

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
