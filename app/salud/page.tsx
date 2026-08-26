import type { Metadata } from "next";
import Image from "next/image";
import { CategoryNavigation } from "@/components/ui/CategoryNavigation";
import { productService } from "@/lib/services/product-service";
import { getExternalChannelName } from "@/lib/external-product";
import { formatPrice, normalizeText } from "@/lib/utils";
import type { Product } from "@/types";
import styles from "./salud.module.css";

export const metadata: Metadata = {
  title: "Salud — Outlet de bienestar revisado en Berja",
  description: "Equipos de recuperación, fototerapia, estética y primeros auxilios revisados a mano en Berja, Almería.",
};

const sectionDefinitions = [
  {
    id: "recuperacion",
    title: "Recuperación deportiva y circulación",
    description: "Botas de presoterapia y compresión neumática FIT KING para piernas cansadas, recuperación muscular y mala circulación.",
  },
  {
    id: "luz",
    title: "Terapia de luz y bienestar",
    description: "Paneles de luz roja e infrarroja y fototerapia capilar para cuidado de la piel, dolor muscular y salud del cabello en casa.",
  },
  {
    id: "belleza",
    title: "Belleza y estética profesional",
    description: "Microneedling, mascarillas LED y máquinas de maquillaje semipermanente para cuidado facial y micropigmentación.",
  },
  {
    id: "auxilios",
    title: "Primeros auxilios y formación",
    description: "Equipos de práctica para formación sanitaria, seguros de usar tantas veces como haga falta.",
  },
] as const;

function HealthProductCard({ product }: { product: Product }) {
  const channel = product.externalChannel ? getExternalChannelName(product.externalChannel) : null;

  return (
    <article className={styles.card}>
      <div className={styles.cardMedia}>
        {product.reviewed && <span className={styles.reviewed}>✓ revisado</span>}
        <Image src={product.images[0].url} alt={product.images[0].alt} fill sizes="(min-width: 1100px) 360px, (min-width: 700px) 45vw, 100vw" />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.model}>{product.brand ?? product.id}</div>
        <h3>{product.title}</h3>
        <p>{product.shortDescription ?? product.description}</p>
        <ul>{product.features?.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        <div className={styles.cardFoot}>
          <span>{formatPrice(product.price)}</span>
          {channel && <small>{channel}</small>}
        </div>
      </div>
    </article>
  );
}

export default async function SaludPage() {
  const healthProducts = await productService.getProductsByCategory("salud");
  const sections = sectionDefinitions
    .map((section) => ({
      ...section,
      products: healthProducts.filter(
        (product) => normalizeText(product.subcategory ?? "") === normalizeText(section.title)
      ),
    }))
    .filter((section) => section.products.length > 0);

  const categoryItems = sections.map((section) => ({
    label: section.title,
    href: `#${section.id}`,
  }));

  return (
    <div className={`${styles.page} theme-health`}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div><div className={styles.eyebrow}>Outlet de salud &amp; bienestar</div><h1>Equipos de recuperación, fototerapia y estética, revisados a mano antes de llegar a ti.</h1><p>Devoluciones de Amazon y grandes superficies, probadas una a una en Berja. Precios de outlet, funcionamiento comprobado, entrega en mano en Almería y Málaga.</p><div className={styles.badges}><span>✓ Probado antes de la venta</span><span>✓ Entrega en mano Almería / Málaga</span><span>✓ Envío a toda España</span></div></div>
          <div className={styles.stamp}><div><strong>REVISADO<br />EN BERJA</strong><small>100% funcional</small></div></div>
        </div>
      </section>

      <CategoryNavigation items={categoryItems} label="Explorar salud" tone="accent" />

      {sections.map((section, index) => (
        <section className={styles.category} id={section.id} key={section.id}>
          <div className={styles.categoryHead}><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.title}</h2></div>
          <p className={styles.categoryDescription}>{section.description}</p>
          <div className={styles.grid}>{section.products.map((product) => <HealthProductCard key={product.id} product={product} />)}</div>
        </section>
      ))}

      <section className={styles.trust} aria-label="Por qué confiar en Tu Ganga Salud">
        {[
          ["Revisado a mano", "Cada unidad se prueba antes de publicarse. Si no funciona al 100%, no se vende."],
          ["Origen honesto", "Devoluciones de Amazon y grandes superficies. Te decimos siempre el estado real."],
          ["Compra protegida", "Cierra la compra en Wallapop o Vinted y benefíciate de sus 48h de garantía."],
          ["Entrega local", "Prueba en mano en Berja, Almería y Málaga, o envío a toda España."],
        ].map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
      </section>

    </div>
  );
}
