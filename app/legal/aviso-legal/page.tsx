import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { legalInfo, legalLastUpdated } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Aviso legal",
  description:
    "Identificación del titular de TU GANGA y descripción de su finalidad: un catálogo de productos, sin venta directa.",
  alternates: { canonical: "/legal/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <LegalPage
      title="Aviso legal"
      updatedAt={legalLastUpdated}
      intro="TU GANGA es un escaparate de productos y oportunidades. Esta página identifica quién está detrás del sitio y con qué propósito."
      toc={[
        { id: "titularidad", label: "Titularidad del sitio" },
        { id: "objeto", label: "Objeto y finalidad" },
        { id: "naturaleza", label: "Naturaleza del servicio" },
        { id: "contacto", label: "Contacto" },
      ]}
    >
      <LegalSection id="titularidad" title="Titularidad del sitio">
        <p>
          Este sitio web, accesible bajo la marca <strong>{legalInfo.siteName}</strong>, es titularidad de:
        </p>
        <ul>
          <li>
            Titular: <span className="pending">{legalInfo.ownerName}</span>
          </li>
          <li>
            NIF / NIE / CIF: <span className="pending">{legalInfo.taxId}</span>
          </li>
          <li>
            Domicilio: <span className="pending">{legalInfo.address}</span>
          </li>
          <li>
            Correo electrónico: <span className="pending">{legalInfo.email}</span>
          </li>
        </ul>
        <p>
          Datos registrales, si resultaran aplicables:{" "}
          <span className="pending">{legalInfo.registryInfo}</span>.
        </p>
      </LegalSection>

      <LegalSection id="objeto" title="Objeto y finalidad">
        <p>
          El objeto de este aviso legal es regular el acceso y la utilización de la web, así como informar de su
          finalidad general: reunir y presentar oportunidades de producto para que cualquier persona pueda
          descubrirlas, consultar su ficha y continuar la operación mediante el canal indicado en cada caso.
        </p>
        <p>
          La utilización de la web atribuye la condición de usuario e implica la aceptación de este aviso y del resto
          de documentos publicados en la sección «Condiciones legales».
        </p>
      </LegalSection>

      <LegalSection id="naturaleza" title="Naturaleza del servicio">
        <p>
          TU GANGA opera principalmente como <strong>catálogo o escaparate</strong>. No incorpora funciones de compra
          tradicional:
        </p>
        <ul>
          <li>No existe carrito ni proceso de checkout dentro de la web.</li>
          <li>TU GANGA no procesa pagos.</li>
          <li>La compra, cuando procede, no se realiza en este sitio.</li>
        </ul>
        <p>
          Cada ficha puede indicar uno o varios canales para continuar (por ejemplo Wallapop, Vinted o WhatsApp).
          Las condiciones de esas operaciones se rigen por lo explicado en{" "}
          <a href="/legal/compras-externas">Enlaces y compras externas</a>.
        </p>
      </LegalSection>

      <LegalSection id="contacto" title="Contacto">
        <p>
          Para cualquier consulta relativa a este aviso legal o al funcionamiento del sitio, puedes escribir a{" "}
          <span className="pending">{legalInfo.email}</span>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
