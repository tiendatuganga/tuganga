import { productService } from "@/lib/services/product-service";
import { BrandIntro } from "@/components/home/BrandIntro";
import { Hero } from "@/components/home/Hero";
import { HomeCatalog } from "@/components/home/HomeCatalog";
import { SaludBanner } from "@/components/home/SaludBanner";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactSection } from "@/components/home/ContactSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default async function HomePage() {
  const allProducts = await productService.getAllProducts();
  const catalogProducts = allProducts.filter((product) => product.availability !== "SOLD");

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
