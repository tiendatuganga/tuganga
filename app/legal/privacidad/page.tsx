import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { LEGAL_PENDING, legalInfo, legalLastUpdated } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo trata TU GANGA los datos personales: newsletter, contacto por WhatsApp y derechos conforme a la normativa española y europea.",
  alternates: { canonical: "/legal/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      updatedAt={legalLastUpdated}
      intro="Esta política explica qué datos personales puede tratar TU GANGA, con qué finalidad y qué derechos tienes. Está redactada conforme al contexto español y europeo (RGPD y LOPDGDD)."
      toc={[
        { id: "responsable", label: "Responsable del tratamiento" },
        { id: "datos-tratados", label: "Datos que tratamos" },
        { id: "finalidades-bases", label: "Finalidades y base jurídica" },
        { id: "conservacion", label: "Conservación" },
        { id: "destinatarios", label: "Destinatarios y transferencias" },
        { id: "derechos", label: "Tus derechos" },
        { id: "ejercicio", label: "Cómo ejercerlos" },
        { id: "newsletter", label: "Newsletter" },
      ]}
    >
      <LegalSection id="responsable" title="Responsable del tratamiento">
        <ul>
          <li>
            Responsable: <span className="pending">{legalInfo.ownerName}</span>
          </li>
          <li>
            NIF / NIE / CIF: <span className="pending">{legalInfo.taxId}</span>
          </li>
          <li>
            Domicilio: <span className="pending">{legalInfo.address}</span>
          </li>
          <li>
            Correo electrónico de contacto: <span className="pending">{legalInfo.email}</span>
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="datos-tratados" title="Datos que tratamos">
        <p>Según las funcionalidades que utilices, TU GANGA puede tratar:</p>
        <ul>
          <li>
            <strong>Newsletter</strong>: tu dirección de correo electrónico, si te suscribes voluntariamente.
          </li>
          <li>
            <strong>WhatsApp</strong>: si nos escribes o continúas una conversación iniciada desde un producto,
            tratamos lo que tú mismo envíes en esa conversación. La conversación transcurre en WhatsApp, servicio de un
            tercero con su propia política de privacidad.
          </li>
          <li>
            <strong>Almacenamiento local técnico</strong>: tu lista de favoritos y tus preferencias de cookies se
            guardan únicamente en tu navegador. No se envían a ningún servidor ni se asocian a tu identidad.
          </li>
          <li>Otras funcionalidades futuras que pudieran añadirse se describirán aquí antes de activarse.</li>
        </ul>
        <p>
          TU GANGA no solicita datos especialmente protegidos y no crea perfiles comerciales sobre los visitantes.
        </p>
      </LegalSection>

      <LegalSection id="finalidades-bases" title="Finalidades y base jurídica">
        <ul>
          <li>
            <strong>Envío de la newsletter</strong> — Finalidad: remitirte promociones y novedades del catálogo. Base
            jurídica: tu consentimiento explícito (art. 6.1.a RGPD), otorgado marcando la casilla del formulario.
          </li>
          <li>
            <strong>Atención de consultas por WhatsApp</strong> — Finalidad: responder a las dudas que plantees sobre
            un producto. Base jurídica: medidas precontractuales solicitadas por ti o tu consentimiento al iniciar la
            conversación.
          </li>
          <li>
            <strong>Funciones básicas del sitio</strong> — Finalidad: recordar favoritos y preferencias en tu propio
            navegador. Se trata de almacenamiento estrictamente técnico, necesario para prestar el servicio que
            solicitas al usar la web.
          </li>
        </ul>
        <p>No se toman decisiones automatizadas ni se elaboran perfiles a partir de estos datos.</p>
      </LegalSection>

      <LegalSection id="conservacion" title="Conservación">
        <ul>
          <li>
            <strong>Newsletter</strong>: hasta que retires el consentimiento mediante la baja disponible en cada envío
            o nos lo comuniques.
          </li>
          <li>
            <strong>Conversaciones de WhatsApp</strong>: durante el tiempo necesario para atender tu consulta.
          </li>
          <li>
            <strong>Favoritos y preferencias locales</strong>: permanecen en tu navegador hasta que los borres tú
            mismo desde el sitio o tu navegador.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="destinatarios" title="Destinatarios y transferencias">
        <p>
          Con carácter general, TU GANGA no cede datos personales a terceros. Cuando existan proveedores que traten
          datos por cuenta del responsable (por ejemplo, el gestor de la newsletter cuando se incorpore uno real), se
          identificarán aquí mediante contrato de encargo de tratamiento:
        </p>
        <p>
          <span className="pending">{LEGAL_PENDING} — proveedores aún sin definir</span>.
        </p>
        <p>
          Si sales hacia plataformas externas (Wallapop, Vinted) o abres WhatsApp, los datos que facilites allí los
          trata esa plataforma o el vendedor según sus propias políticas, no TU GANGA.
        </p>
      </LegalSection>

      <LegalSection id="derechos" title="Tus derechos">
        <p>Puedes ejercer, respecto de tus datos personales, los derechos de:</p>
        <ul>
          <li>Acceso: saber qué datos tuyos tratamos.</li>
          <li>Rectificación: corregirlos si son inexactos.</li>
          <li>Supresión: solicitar su eliminación.</li>
          <li>Oposición: oponerte a determinados tratamientos.</li>
          <li>Limitación del tratamiento.</li>
          <li>Portabilidad de los datos que nos hayas facilitado.</li>
          <li>Retirar en cualquier momento el consentimiento otorgado.</li>
        </ul>
      </LegalSection>

      <LegalSection id="ejercicio" title="Cómo ejercerlos">
        <p>
          Escribe a <span className="pending">{legalInfo.email}</span> indicando el derecho que deseas ejercer;
          podremos pedirte información adicional para verificar tu identidad cuando resulte necesario.
        </p>
        <p>
          Si consideras que no se ha atendido correctamente tu solicitud, puedes reclamar ante la{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noreferrer noopener">
            Agencia Española de Protección de Datos
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="newsletter" title="Newsletter">
        <p>Sobre el formulario de newsletter y promociones:</p>
        <ul>
          <li>La suscripción requiere marcar expresamente la casilla de aceptación; nunca va preseleccionada.</li>
          <li>
            Junto al formulario se informa de quién trata tus datos y se enlaza esta{" "}
            <Link href="/legal/privacidad">política de privacidad</Link>.
          </li>
          <li>Cada envío incluirá la forma de darte de baja, efectiva de forma inmediata.</li>
          <li>Tus datos solo se utilizarán para enviarte estas comunicaciones propias.</li>
        </ul>
      </LegalSection>
    </LegalPage>
  );
}
