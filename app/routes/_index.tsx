import { PortableText } from "@portabletext/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Section } from "~/components/section/Section";
import { SectionContent } from "~/components/section/SectionContent";
import { Timeline } from "~/components/sanity/timeline/Timeline";
import { useSanity } from "~/hooks/useSanity";
import { getSession } from "~/models/getSession.server";
import { ReadMore } from "~/components/sanity/readmore/ReadMore";
import { Button, ConfirmationPanel } from "@navikt/ds-react";
import { SoknadHeader } from "~/components/soknad-header/SoknadHeader";
import { useRef, useState } from "react";
import { useSetFocus } from "~/hooks/useSetFocus";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);

  return json({
    session,
  });
}

export default function Index() {
  const { getInfoPageText, getAppText } = useSanity();
  const [consentGiven, setConsentGiven] = useState(false);
  const { setFocus } = useSetFocus();
  const [showConsentValidation, setShowConsentValidation] = useState(false);
  const missingConsentRef = useRef<HTMLInputElement>(null);
  const startSideText = getInfoPageText("startside");

  async function startSoknad() {
    if (!consentGiven) {
      setShowConsentValidation(true);

      if (showConsentValidation) {
        setFocus(missingConsentRef);
      }

      return;
    }
  }

  return (
    <main>
      <div className="dp-soknadsdialog-ny-frontend">
        <Section>
          <SoknadHeader />
          <SectionContent>
            {startSideText?.body && (
              <PortableText
                value={startSideText.body}
                components={{ types: { timeline: Timeline, readMore: ReadMore } }}
              />
            )}
            <ConfirmationPanel
              className="mb-10"
              checked={consentGiven}
              label={getAppText("start-soknad.checkbox.samtykke-riktige-opplysninger.label")}
              onChange={() => {
                setConsentGiven(!consentGiven);
                setShowConsentValidation(!showConsentValidation);
              }}
              error={
                showConsentValidation && !consentGiven
                  ? getAppText("start-soknad.checkbox.samtykke-innhenting-data.validering-tekst")
                  : undefined
              }
              ref={missingConsentRef}
            />
            <Button variant="primary" size="medium" onClick={startSoknad}>
              {getAppText("start-soknad.knapp.start")}
            </Button>
          </SectionContent>
        </Section>
      </div>
    </main>
  );
}
