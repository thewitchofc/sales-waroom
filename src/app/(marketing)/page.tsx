import { Hero } from "@/components/sections/hero";
import { ProductPreviewGrid } from "@/components/pages/product-preview-grid";
import { FinalCTA } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductPreviewGrid />
      <FinalCTA />
    </>
  );
}
