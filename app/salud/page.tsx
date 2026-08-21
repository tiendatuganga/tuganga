import type { Metadata } from "next";
import Image from "next/image";
import { CategoryNavigation } from "@/components/ui/CategoryNavigation";
import styles from "./salud.module.css";

export const metadata: Metadata = {
  title: "Salud — Outlet de bienestar revisado en Berja",
  description: "Equipos de recuperación, fototerapia, estética y primeros auxilios revisados a mano en Berja, Almería.",
};

type HealthProduct = {
  model: string;
  title: string;
  description: string;
  specs: string[];
  image?: string;
  imageAlt?: string;
  icon?: string;
  reviewed?: boolean;
};

const sections: { id: string; title: string; description: string; products: HealthProduct[] }[] = [
  {
    id: "recuperacion",
    title: "Recuperación deportiva y circulación",
    description: "Botas de presoterapia y compresión neumática FIT KING para piernas cansadas, recuperación muscular y mala circulación.",
    products: [
      { model: "FT-091A", title: "FIT KING Recovery Power Pro — Botas de presoterapia", description: "Compresión neumática de pierna completa, recargable y portátil, con 12 niveles de intensidad y 4 zonas independientes.", specs: ["Compresión 40–150 mmHg", "Batería 2500mAh · 3-4h autonomía", "Temporizador 15–60 min"], image: "https://www.fitkingshop.com/cdn/shop/files/20241220-173652.jpg?v=1769512286&width=1000", imageAlt: "FIT KING Recovery Power Pro FT-091A", reviewed: true },
      { model: "FT-082A", title: "FIT KING Air Massage Boots — Pierna y pie", description: "4 cámaras de aire con sensor que ajusta la presión automáticamente al tamaño de la pierna. Cierre de cremallera.", specs: ["8 niveles de compresión", "3 modos de masaje", "Temporizador 20/25/30 min"], image: "https://www.fitkingshop.com/cdn/shop/products/71igrVsuEYL.jpg?v=1770109784&width=1600", imageAlt: "FIT KING FT-082A Air Massage Boots", reviewed: true },
      { model: "FT-068A", title: "FIT KING Dynamic Leg Compression Boots", description: "Masaje secuencial por 3 cámaras de aire que imita el amasado manual, con sensor inteligente de ajuste automático.", specs: ["3 modos · 9 intensidades", "Pantalla LCD", "Tejido ripstop resistente"], image: "https://www.fitkingshop.com/cdn/shop/products/CompressionRecoverySystem1.jpg?v=1671547169&width=1200", imageAlt: "FIT KING FT-068A Compression Recovery System", reviewed: true },
    ],
  },
  {
    id: "luz",
    title: "Terapia de luz y bienestar",
    description: "Paneles de luz roja e infrarroja y fototerapia capilar para cuidado de la piel, dolor muscular y salud del cabello en casa.",
    products: [
      { model: "Morfone · LLD-200D", title: "Lámpara de Terapia de Luz Roja e Infrarroja", description: "Panel de 200 LEDs con tri-longitud de onda (660/850/940nm), sin calor, soporte ajustable y gafas protectoras.", specs: ["5 niveles de brillo", "Uso facial y corporal"], icon: "🔴" },
      { model: "Aolawco", title: "Lámpara de Luz Roja con Mando — 180 LEDs", description: "4 cabezales orientables para dirigir la luz a la zona exacta del cuerpo, con mando a distancia y temporizador.", specs: ["660 / 850 / 940 nm", "Soporte de pie ajustable"], image: "https://assets.jobalots.com/product_image/A5cIGNLtpo9p9yAoiKeO8o2x2rdoLU68uEqek64t.png?format=auto&width=1080&quality=100", imageAlt: "Lámpara Aolawco 180 LEDs", reviewed: true },
      { model: "Gorro capilar", title: "Gorro de Crecimiento Capilar — Luz Roja y Azul", description: "Fototerapia de cuero cabelludo inalámbrica y recargable por USB, pensada para el uso diario integrado en la rutina.", specs: ["Luz roja + luz azul LED", "Uso diario 20-30 min"], icon: "🧢" },
    ],
  },
  {
    id: "belleza",
    title: "Belleza y estética profesional",
    description: "Microneedling, mascarillas LED y máquinas de maquillaje semipermanente para cuidado facial y micropigmentación.",
    products: [
      { model: "7 colores", title: "Máscara LED Facial Plegable con Pulverización", description: "Mascarilla facial LED con 7 modos de color y función de vapor mediante depósito de agua. Formato plegable.", specs: ["Pantalla táctil", "Ahorra espacio guardada"], icon: "💆" },
      { model: "Dr.Pen M8S", title: "Microneedling Inalámbrico Profesional", description: "Motor de hasta 16.000 RPM, profundidad ajustable 0-2.5mm y pantalla LED táctil. Cable o inalámbrico.", specs: ["Cartuchos sellados individualmente", "Uso cosmético doméstico"], image: "https://m.media-amazon.com/images/I/61SKYK2L3PL._AC_SX679_.jpg", imageAlt: "Dr.Pen M8S Microneedling", reviewed: true },
      { model: "Dr.Pen A8S", title: "Microneedling Pen con 7 Cartuchos", description: "Incluye 7 cartuchos de repuesto de fábrica. Modo inalámbrico o con cable, ideal para empezar en casa.", specs: ["7 cartuchos incluidos", "Uso cosmético doméstico"], icon: "✒️" },
      { model: "Biomaser", title: "Kit Máquina de Maquillaje Semipermanente Inalámbrica", description: "Pluma rotativa de aluminio con batería de 1600mAh, motor silencioso de baja vibración y 10 cartuchos incluidos.", specs: ["3-6h de autonomía", "Cejas, labios, delineado"], image: "https://assets.jobalots.com/product_image/OWAX21KPtSxOZFjshznmSzbufMx58XQxKQjK6nkg.png?format=auto&width=1080&quality=100", imageAlt: "Biomaser máquina de maquillaje semipermanente", reviewed: true },
    ],
  },
  {
    id: "auxilios",
    title: "Primeros auxilios y formación",
    description: "Equipos de práctica para formación sanitaria, seguros de usar tantas veces como haga falta.",
    products: [
      { model: "XFT-D0009", title: "Mini Entrenador de DEA/DESA en Español", description: "Simulador de desfibrilador para formación en Soporte Básico de Vida, sin alto voltaje: 100% seguro para practicar.", specs: ["Voz e instrucciones en español", "Incluye parches adulto y niño", "Cumple directrices AHA/ERC"], icon: "🫀" },
    ],
  },
];

function HealthProductCard({ product }: { product: HealthProduct }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardMedia}>
        {product.reviewed && <span className={styles.reviewed}>✓ revisado</span>}
        {product.image ? (
          <Image src={product.image} alt={product.imageAlt ?? product.title} fill sizes="(min-width: 1100px) 360px, (min-width: 700px) 45vw, 100vw" />
        ) : (
          <div className={styles.placeholder}><span>{product.icon}</span><small>FOTO PENDIENTE<br />DE AÑADIR</small></div>
        )}
      </div>
      <div className={styles.cardBody}>
        <div className={styles.model}>{product.model}</div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <ul>{product.specs.map((spec) => <li key={spec}>{spec}</li>)}</ul>
        <div className={styles.cardFoot}>
          <span>Consultar precio</span>
          <small>Canal por confirmar</small>
        </div>
      </div>
    </article>
  );
}

export default function SaludPage() {
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
          <div className={styles.grid}>{section.products.map((product) => <HealthProductCard key={`${section.id}-${product.model}`} product={product} />)}</div>
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
