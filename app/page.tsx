import { productService } from "@/lib/services/product-service";
import { categoryService } from "@/lib/services/category-service";
import { Hero } from "@/components/home/Hero";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { EditorialBanner } from "@/components/home/EditorialBanner";
import { SecondLifeSection } from "@/components/home/SecondLifeSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { LastChanceSection } from "@/components/home/LastChanceSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default async function HomePage() {
  const [categories, newProducts, featuredProducts, secondLifeProducts, limitedProducts, heroProducts] =
    await Promise.all([
      categoryService.getAllCategories(),
      productService.getNewProducts(8),
      productService.getFeaturedProducts(8),
      productService.getSecondLifeProducts(8),
      productService.getLimitedProducts(8),
      productService.getFeaturedProducts(3),
    ]);

  return (
    <>
      <Hero products={heroProducts} />
      <CategoriesSection categories={categories} />
      <NewArrivalsSection products={newProducts} />
      <EditorialBanner />
      <SecondLifeSection products={secondLifeProducts} />
      <FeaturedSection products={featuredProducts} />
      <LastChanceSection products={limitedProducts} />
      <NewsletterSection />
    </>
  );
}
