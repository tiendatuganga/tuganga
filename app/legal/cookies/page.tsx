import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsPanel";
import { legalLastUpdated } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Qué cookies y almacenamiento utiliza TU GANGA: hoy, solo técnicas imprescindibles. Sin analítica ni marketing. Configura tus preferencias.",
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de cookies"
      updatedAt={legalLastUpdated}
      intro="Antes de escribir esta política hemos auditado qué utiliza realmente la web. Resultado: hoy TU GANGA no carga analítica, ni píxeles de marketing, ni scripts de terceros."
      toc={[
        { id: "que-son", label: "Qué son" },
        { id: "uso-actual", label: "Qué usa TU GANGA hoy" },
        { id: "categorias", label: "Categorías" },
        { id: "configuracion", label: "Configuración" },
        { id: "terceros", label: "Servicios de terceros" },
        { id: "actualizacion", label: "Actualización" },
      ]}
    >
      <LegalSection id="que-son" title="Qué son las cookies y el almacenamiento local">
        <p>
          Las cookies son pequeños archivos que un sitio guarda en tu dispositivo. Cumplen funciones parecidas las
          llamadas APIs de almacenamiento local del navegador (como localStorage), que permiten recordar información
          sin enviarla a ningún servidor.
        </p>
      </LegalSection>

      <LegalSection id="uso-actual" title="Qué utiliza TU GANGA hoy">
        <p>Tras auditar el sitio, el inventario real es este:</p>
        <ul>
          <li>
            <strong>Almacenamiento técnico local</strong> para funciones básicas: guardar tu lista de favoritos y tus
            preferencias de cookies. Es imprescindible para el funcionamiento del sitio y no requiere consentimiento.
          </li>
          <li>
            <strong>No</strong> existen cookies de analítica.
          </li>
          <li>
            <strong>No</strong> existen cookies de marketing ni píxeles publicitarios.
          </li>
          <li>
            <strong>No</strong> se cargan scripts de terceros: las fuentes están alojadas en el propio sitio.
          </li>
        </ul>
        <p>
          Por este motivo la web no muestra un banner de consentimiento: no hay nada que requiera tu permiso. Cuando
          abandones TU GANGA mediante un enlace externo, se aplican las políticas del destino (ver{" "}
          <a href="/legal/compras-externas">Enlaces y compras externas</a>).
        </p>
      </LegalSection>

      <LegalSection id="categorias" title="Categorías previstas">
        <p>La configuración distingue tres categorías, coherentes con este inventario:</p>
        <ul>
          <li>
            <strong>Técnicas y necesarias</strong>: siempre activas. Hacen posible la navegación y funciones básicas.
          </li>
          <li>
            <strong>Analítica</strong>: categoría preparada pero actualmente sin uso. Si algún día se añade (por
            ejemplo, estadísticas agregadas), solo se activará con tu consentimiento y aparecerá aquí descrita.
          </li>
          <li>
            <strong>Marketing</strong>: ídem; hoy no existe ningún elemento de esta categoría.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="configuracion" title="Cómo configurar tus preferencias">
        <p>
          Puedes consultar y ajustar tus preferencias en cualquier momento:
        </p>
        <p>
          <CookieSettingsButton className="inline-flex h-11 items-center justify-center rounded-full bg-tg-primary px-7 text-sm font-semibold text-white transition-colors hover:bg-tg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tg-primary">
            Abrir configuración de cookies
          </CookieSettingsButton>
        </p>
        <p>
          También encontrarás el enlace «Configuración de cookies» en el pie de página. Como no utilizamos cookies no
          esenciales, guardar preferencias hoy solo registra tu elección de cara al futuro.
        </p>
      </LegalSection>

      <LegalSection id="terceros" title="Servicios de terceros">
        <p>
          Los sitios externos a los que enlazan las fichas (Wallapop, Vinted, WhatsApp u otros) pueden utilizar sus
          propias cookies bajo sus políticas, ajenas a TU GANGA. Esta política cubre únicamente lo que ocurre dentro de
          este sitio.
        </p>
      </LegalSection>

      <LegalSection id="actualizacion" title="Actualización de esta política">
        <p>
          Si en el futuro se incorporan servicios que instalen cookies (analítica, píxeles, vídeos incrustados…), esta
          política se actualizará, el panel de configuración mostrará las nuevas categorías activas y se recabará el
          consentimiento antes de su instalación. Ver también la{" "}
          <Link href="/legal/privacidad">política de privacidad</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
