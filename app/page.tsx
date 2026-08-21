import { productService } from "@/lib/services/product-service";
import { BrandIntro } from "@/components/home/BrandIntro";
import { Hero } from "@/components/home/Hero";
import { HomeCatalog } from "@/components/home/HomeCatalog";
import { SaludBanner } from "@/components/home/SaludBanner";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactSection } from "@/components/home/ContactSection";
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
      <BrandIntro />
      <HomeCatalog products={catalogProducts} />
      <SaludBanner />
      <ReviewsSection />
      <FaqSection />
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
