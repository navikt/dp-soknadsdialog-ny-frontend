import { Button, ConfirmationPanel } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { ReadMore } from "~/components/sanity/readmore/ReadMore";
import { Timeline } from "~/components/sanity/timeline/Timeline";
import { Section } from "~/components/section/Section";
import { SectionContent } from "~/components/section/SectionContent";
import { SoknadHeader } from "~/components/soknad-header/SoknadHeader";
import { useSanity } from "~/hooks/useSanity";
import { getSession } from "~/models/getSession.server";
import { action } from "./action-create-soknad";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);

  return json({
    session,
  });
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const [consentGiven, setConsentGiven] = useState(false);
  const [showConsentValidation, setShowConsentValidation] = useState(false);

  const navigations = useNavigation();

  const { getInfoPageText, getAppText } = useSanity();
  const startSideText = getInfoPageText("startside");

  return (
    <main>
      <div className="dp-soknad-frontend">
        <Section>
          <SoknadHeader />
          <SectionContent>
            {startSideText?.body && (
              <PortableText
                value={startSideText.body}
                components={{ types: { timeline: Timeline, readMore: ReadMore } }}
              />
            )}

            <Form method="post" action="/action-create-soknad" navigate={false}>
              <ConfirmationPanel
                name="confirmationPanel"
                className="mb-10"
                checked={consentGiven}
                label={getAppText("start-soknad.checkbox.samtykke-riktige-opplysninger.label")}
                onChange={() => {
                  setConsentGiven(!consentGiven);
                  setShowConsentValidation(!showConsentValidation);
                }}
                error={
                  !consentGiven && actionData && !actionData.confirmed
                    ? getAppText("start-soknad.checkbox.samtykke-innhenting-data.validering-tekst")
                    : undefined
                }
              />
              <Button
                variant="primary"
                size="medium"
                type="submit"
                loading={Boolean(navigations.formAction)}
              >
                {getAppText("start-soknad.knapp.start")}
              </Button>
            </Form>
          </SectionContent>
        </Section>
      </div>
    </main>
  );
}
