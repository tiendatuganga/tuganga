import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { legalLastUpdated } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Enlaces y compras externas",
  description:
    "Las compras no se procesan en TU GANGA: se realizan en plataformas externas como Wallapop o Vinted, o mediante WhatsApp. Conoce qué condiciones aplican.",
  alternates: { canonical: "/legal/compras-externas" },
};

export default function ComprasExternasPage() {
  return (
    <LegalPage
      title="Enlaces y compras externas"
      updatedAt={legalLastUpdated}
      intro="Esta página explica qué ocurre exactamente cuando pulsas un botón de compra o contacto en TU GANGA. Es, probablemente, la más importante para entender el servicio."
      toc={[
        { id: "alcance", label: "Alcance de esta página" },
        { id: "transaccion-fuera", label: "La operación ocurre fuera" },
        { id: "condiciones-aplicables", label: "Qué condiciones aplican" },
        { id: "protecciones-propias", label: "Protecciones de cada plataforma" },
        { id: "canal-whatsapp", label: "Operaciones por WhatsApp" },
        { id: "recomendaciones", label: "Antes de completar la operación" },
        { id: "marcas", label: "Marcas de terceros" },
      ]}
    >
      <LegalSection id="alcance" title="Alcance de esta página">
        <p>
          Algunos productos de TU GANGA enlazan a servicios de terceros como <strong>Wallapop</strong>,{" "}
          <strong>Vinted</strong> o <strong>WhatsApp</strong>. Aquí se explica cómo funcionan esos enlaces y qué
          consecuencias tiene completar una operación fuera de esta web.
        </p>
      </LegalSection>

      <LegalSection id="transaccion-fuera" title="La operación ocurre fuera de TU GANGA">
        <p>Cuando una compra se realiza a través de una plataforma externa:</p>
        <ul>
          <li>La transacción no se procesa dentro de TU GANGA.</li>
          <li>TU GANGA no cobra, no gestiona pagos y no interviene en el envío ni en la entrega.</li>
          <li>
            El contrato, si lo hay, se forma entre el comprador y la plataforma y/o el vendedor correspondiente, nunca
            con TU GANGA como parte vendedora de ese artículo.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="condiciones-aplicables" title="Qué condiciones aplican">
        <p>
          Las condiciones de pago, envío, devoluciones, protección del comprador y funcionamiento general dependen de
          la plataforma externa utilizada y/o del vendedor correspondiente:
        </p>
        <ul>
          <li>
            En <strong>Wallapop</strong> y <strong>Vinted</strong>: sus propios términos de servicio, políticas de
            devolución y sistemas de protección al comprador.
          </li>
          <li>
            En operaciones cerradas directamente con un vendedor: las condiciones que ese vendedor comunique.
          </li>
        </ul>
        <p>
          El usuario debe revisar esas condiciones antes de completar cualquier operación. TU GANGA no puede modificar
          ni interpretar las reglas de servicios ajenos.
        </p>
      </LegalSection>

      <LegalSection id="protecciones-propias" title="Las protecciones son de cada plataforma">
        <p>
          Sistemas como la protección al comprador, los plazos de devolución o la custodia de pagos pertenecen a la
          plataforma que los ofrece. Son prestaciones de Wallapop o Vinted, <strong>no de TU GANGA</strong>.
        </p>
        <p>
          Por ello, TU GANGA no atribuye a sí mismo garantías, coberturas ni protecciones propias de terceros, y no
          presenta los enlaces como una forma de extender dichas protecciones a todo el catálogo.
        </p>
      </LegalSection>

      <LegalSection id="canal-whatsapp" title="Operaciones por WhatsApp">
        <p>
          Cuando el canal indicado es <strong>WhatsApp</strong>, la conversación se mantiene directamente con el
          vendedor. En este caso:
        </p>
        <ul>
          <li>
            Las condiciones concretas (precio final, estado, entrega, forma de pago) deben comunicarse claramente
            antes de cerrar cualquier operación.
          </li>
          <li>No existen por defecto plazos de protección ni devoluciones automáticas: lo acordado es lo pactado.</li>
          <li>
            Se recomienda dejar constancia escrita de lo acordado dentro de la propia conversación.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="recomendaciones" title="Antes de completar la operación">
        <ol>
          <li>Lee la ficha completa y las condiciones del canal al que te lleva el enlace.</li>
          <li>Confirma disponibilidad, estado real y detalles del artículo con el vendedor.</li>
          <li>Revisa las políticas de pago, envío y devolución aplicables en esa plataforma.</li>
          <li>Guarda los justificantes de la operación realizada.</li>
        </ol>
      </LegalSection>

      <LegalSection id="marcas" title="Marcas de terceros">
        <p>
          Wallapop, Vinted, WhatsApp y demás marcas citadas en este sitio pertenecen a sus respectivos titulares. Su
          aparición responde únicamente a la existencia de enlaces para continuar operaciones y no supone asociación,
          patrocinio ni respaldo entre TU GANGA y dichas plataformas, ni en ningún sentido.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
