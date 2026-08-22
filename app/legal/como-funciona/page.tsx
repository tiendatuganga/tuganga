import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { legalLastUpdated } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cómo funciona TU GANGA",
  description:
    "TU GANGA funciona como catálogo: descubres un producto, consultas su ficha y continúas por Wallapop, Vinted o WhatsApp según el artículo.",
  alternates: { canonical: "/legal/como-funciona" },
};

export default function ComoFuncionaPage() {
  return (
    <LegalPage
      title="Cómo funciona TU GANGA"
      updatedAt={legalLastUpdated}
      intro="Sin letra pequeña innecesaria: TU GANGA es un escaparate de oportunidades. Aquí explicamos, en lenguaje sencillo, qué pasa en cada paso."
      toc={[
        { id: "idea", label: "La idea en una frase" },
        { id: "canales", label: "Canales disponibles" },
        { id: "flujo", label: "Paso a paso" },
        { id: "estados", label: "Estados y etiquetas" },
        { id: "disponibilidad", label: "Disponibilidad y unidades únicas" },
        { id: "independencia", label: "Independencia" },
      ]}
    >
      <LegalSection id="idea" title="La idea en una frase">
        <p>
          TU GANGA <strong>reúne y presenta oportunidades de producto</strong> para que las descubras cómodamente;
          después tú eliges por dónde continuar.
        </p>
        <p>
          No hay carrito ni pago dentro de la web: TU GANGA no procesa compras. Su papel termina (y el tuyo continúa)
          cuando sales hacia el canal del producto.
        </p>
      </LegalSection>

      <LegalSection id="canales" title="Canales disponibles">
        <p>Cada ficha puede indicar uno o varios canales para continuar la operación:</p>
        <ul>
          <li>
            <strong>Wallapop</strong>: continúas en la plataforma, donde se publica el anuncio.
          </li>
          <li>
            <strong>Vinted</strong>: igual que el anterior, dentro del entorno de Vinted.
          </li>
          <li>
            <strong>WhatsApp</strong>: abres una conversación directa para resolver dudas y concretar detalles.
          </li>
          <li>Otros canales que puedan incorporarse en el futuro se indicarán en la propia ficha.</li>
        </ul>
      </LegalSection>

      <LegalSection id="flujo" title="El flujo, paso a paso">
        <ol>
          <li>Descubres un producto navegando por el catálogo o las categorías de TU GANGA.</li>
          <li>
            Consultas su ficha: información, precio orientativo, estado y fotografías.
          </li>
          <li>Pulsas el botón o CTA disponible en esa ficha.</li>
          <li>
            Continúas la comunicación o la transacción mediante el canal indicado: fuera de TU GANGA cuando
            corresponde.
          </li>
        </ol>
      </LegalSection>

      <LegalSection id="estados" title="Estados y etiquetas">
        <p>
          Las fichas pueden mostrar etiquetas como <strong>Nuevo</strong>, <strong>Segunda vuelta</strong>,{" "}
          <strong>Revisado</strong>, <strong>Oferta</strong>, <strong>Últimas unidades</strong>,{" "}
          <strong>Disponible</strong>, <strong>Reservado</strong> o <strong>Vendido</strong>.
        </p>
        <p>Sobre la etiqueta «Revisado», conviene precisar su alcance exacto:</p>
        <ul>
          <li>
            Significa únicamente lo que realmente se haya comprobado en cada caso, tal como se indique en la ficha.
          </li>
          <li>
            No equivale a garantía comercial, certificación técnica, homologación oficial ni a afirmar que el producto
            es nuevo.
          </li>
        </ul>
        <p>
          Si tienes dudas sobre qué incluye la revisión de un artículo concreto, pregúntalo antes de cerrar cualquier
          operación a través del canal correspondiente.
        </p>
      </LegalSection>

      <LegalSection id="disponibilidad" title="Disponibilidad y unidades únicas">
        <p>
          Muchos productos son piezas únicas o de muy pocas unidades: lo que ves puede desaparecer sin previo aviso.
          Una ficha publicada no asegura que el artículo siga disponible en el momento de tu visita.
        </p>
        <p>
          Los estados «Reservado» o «Vendido» reflejan esa realidad. La confirmación final de disponibilidad siempre
          ocurre en el canal elegido, antes de cerrar la operación.
        </p>
      </LegalSection>

      <LegalSection id="independencia" title="Independencia">
        <p>
          TU GANGA es un servicio independiente. Wallapop, Vinted y demás marcas mencionadas pertenecen a sus
          respectivos titulares, y su presencia aquí solo significa que existe un enlace para continuar; no constituye
          asociación, patrocinio ni respaldo entre ambas partes. Más detalle en{" "}
          <a href="/legal/compras-externas">Enlaces y compras externas</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
