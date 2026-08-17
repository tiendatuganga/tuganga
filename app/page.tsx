import { productService } from "@/lib/services/product-service";
import { Hero } from "@/components/home/Hero";
import { SubNav } from "@/components/layout/SubNav";
import { AllProductsSection } from "@/components/home/AllProductsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default async function HomePage() {
  const allProducts = shuffle(await productService.getAllProducts());

  return (
    <>
      <Hero />
      <SubNav />
      <AllProductsSection products={allProducts} />
      <NewsletterSection />
    </>
  );
}