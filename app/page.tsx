import { productService } from "@/lib/services/product-service";
import { Hero } from "@/components/home/Hero";
import { HomeCatalog } from "@/components/home/HomeCatalog";
import { SaludBanner } from "@/components/home/SaludBanner";
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
  const allProducts = await productService.getAllProducts();
  const catalogProducts = shuffle(allProducts.filter((product) => product.availability !== "SOLD"));

  return (
    <>
      <Hero />
      <HomeCatalog products={catalogProducts} />
      <SaludBanner />
      <NewsletterSection />
    </>
  );
}
