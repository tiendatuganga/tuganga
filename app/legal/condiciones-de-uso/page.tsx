import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { legalLastUpdated } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Condiciones de uso",
  description:
    "Reglas de uso de la web TU GANGA: propiedad intelectual, disponibilidad, enlaces externos y limitación de responsabilidad.",
  alternates: { canonical: "/legal/condiciones-de-uso" },
};

export default function CondicionesDeUsoPage() {
  return (
    <LegalPage
      title="Condiciones de uso"
      updatedAt={legalLastUpdated}
      intro="Estas condiciones regulan el uso de la web. TU GANGA funciona principalmente como catálogo de productos: estas reglas se interpretan desde ese modelo."
      toc={[
        { id: "aceptacion", label: "Aceptación y objeto" },
        { id: "uso-permitido", label: "Uso permitido" },
        { id: "propiedad-intelectual", label: "Propiedad intelectual" },
        { id: "naturaleza", label: "Naturaleza del catálogo" },
        { id: "disponibilidad", label: "Disponibilidad del servicio" },
        { id: "enlaces-externos", label: "Enlaces externos" },
        { id: "responsabilidad", label: "Responsabilidad" },
        { id: "modificaciones", label: "Modificaciones" },
      ]}
    >
      <LegalSection id="aceptacion" title="Aceptación y objeto">
        <p>
          El acceso y la navegación por esta web implican la aceptación de estas condiciones de uso, junto con el{" "}
          <a href="/legal/aviso-legal">aviso legal</a> y los demás documentos legales publicados. Si no estás de
          acuerdo, debes abstenerte de utilizar el sitio.
        </p>
      </LegalSection>

      <LegalSection id="uso-permitido" title="Uso permitido">
        <p>El usuario se compromete a hacer un uso adecuado de la web y a no emplearla para:</p>
        <ul>
          <li>Llevar a cabo actividades ilícitas o contrarias a la buena fe.</li>
          <li>Introducir virus u otros elementos que puedan dañar o alterar el sitio o los equipos de otros usuarios.</li>
          <li>Intentar acceder a zonas restringidas, a sistemas informáticos de TU GANGA o de terceros.</li>
          <li>Copiar, extraer o reutilizar de forma masiva los contenidos del catálogo sin autorización.</li>
        </ul>
      </LegalSection>

      <LegalSection id="propiedad-intelectual" title="Propiedad intelectual e industrial">
        <p>
          Los contenidos propios del sitio (marca, textos, estructura, diseño, selecciones y presentaciones del
          catálogo) pertenecen a TU GANGA o a quienes hayan autorizado su uso, y están protegidos por la normativa de
          propiedad intelectual e industrial.
        </p>
        <p>
          Está permitida la reproducción puntual de fragmentos con fines informativos o personales citando la fuente.
          Cualquier otra explotación (reproducción total, distribución, comunicación pública o transformación) exige
          autorización previa.
        </p>
        <p>
          Las fotografías, descripciones y demás materiales correspondientes a productos concretos pueden pertenecer a
          sus vendedores o a terceros; se muestran únicamente con fines identificativos del artículo.
        </p>
      </LegalSection>

      <LegalSection id="naturaleza" title="Naturaleza del catálogo">
        <p>
          TU GANGA no actúa como un vendedor directo de todos los productos mostrados. Su función principal es
          <strong> reunir y presentar oportunidades</strong>: cada ficha recoge información orientativa (precio,
          estado, fotografías) y ofrece un canal para continuar.
        </p>
        <p>
          La operación posterior se desarrolla fuera de esta web y queda sujeta a lo previsto en{" "}
          <a href="/legal/compras-externas">Enlaces y compras externas</a> y en{" "}
          <a href="/legal/como-funciona">Cómo funciona TU GANGA</a>.
        </p>
      </LegalSection>

      <LegalSection id="disponibilidad" title="Disponibilidad del servicio">
        <p>
          Se trabajará razonablemente para mantener la web disponible y actualizada, aunque no se garantiza una
          disponibilidad ininterrumpida. Puede haber interrupciones por mantenimiento, fallos técnicos o causas ajenas
          a TU GANGA.
        </p>
        <p>
          La información publicada puede cambiar: precios, estados y disponibilidad son orientativos y pueden quedar
          desfasados, especialmente tratándose en muchos casos de unidades únicas.
        </p>
      </LegalSection>

      <LegalSection id="enlaces-externos" title="Enlaces externos">
        <p>
          Las fichas pueden incluir enlaces a servicios de terceros (como Wallapop, Vinted o WhatsApp). Estos enlaces
          se facilitan para comodidad del usuario y no implican asociación, patrocinio ni respaldo de dichas
          plataformas hacia TU GANGA, ni a la inversa.
        </p>
        <p>
          TU GANGA no controla ni asume la responsabilidad por los contenidos, políticas o prácticas de sitios ajenos.
          Al abandonar esta web, se aplican las condiciones del servicio correspondiente.
        </p>
      </LegalSection>

      <LegalSection id="responsabilidad" title="Limitación de responsabilidad">
        <p>
          TU GANGA responde, con la diligencia exigible, por la corrección de la información que publique sobre sí
          mismo y por el buen funcionamiento general del sitio. Dentro de esa medida razonable, no responde por:
        </p>
        <ul>
          <li>
            Decisiones tomadas por el usuario a partir de la información del catálogo, cuya verificación final se
            produce en el canal elegido antes de cerrar cualquier operación.
          </li>
          <li>Operaciones realizadas en plataformas o canales externos, incluidos pagos, envíos y devoluciones.</li>
          <li>
            Daños derivados de interferencias, virus u otras alteraciones técnicas no imputables a TU GANGA.
          </li>
        </ul>
        <p>
          Nada en estas condiciones limita aquellas responsabilidades que no puedan excluirse legalmente.
        </p>
      </LegalSection>

      <LegalSection id="modificaciones" title="Modificaciones">
        <p>
          TU GANGA puede actualizar en cualquier momento estos textos, los contenidos del sitio y su propia estructura.
          Las modificaciones se publicarán en esta misma página con la fecha de última actualización, y serán
          aplicables desde su publicación. Se recomienda revisarlas periódicamente.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
