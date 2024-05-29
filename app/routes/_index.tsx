import { Button, ConfirmationPanel } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import { useState } from "react";
import { ReadMore } from "~/components/sanity/readmore/ReadMore";
import { Timeline } from "~/components/sanity/timeline/Timeline";
import { Section } from "~/components/section/Section";
import { SectionContent } from "~/components/section/SectionContent";
import { SoknadHeader } from "~/components/soknad-header/SoknadHeader";
import { useSanity } from "~/hooks/useSanity";
import { createSoknad } from "~/models/createSoknad.server";
import { createUuid } from "~/models/createUuid.server";
import { getSession } from "~/models/getSession.server";
import { getEnv } from "~/utils/env.utils";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const confirmationPanel = formData.get("confirmationPanel");

  if (!confirmationPanel) {
    return json({ confirmed: false });
  }

  const uuidResponse = await createUuid(request);

  if (uuidResponse.status === "error") {
    return json({ error: uuidResponse.error, confirmed: true });
  }

  const soknadResponse = await createSoknad(request, uuidResponse.data);

  if (soknadResponse.status === "error") {
    return json({ error: soknadResponse.error, confirmed: true });
  }

  return redirect(`${getEnv("DP_SOKNADSDIALOG_URL")}/soknad/${uuidResponse.data}`);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);

  return json({
    session,
  });
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const { getInfoPageText, getAppText } = useSanity();
  const [consentGiven, setConsentGiven] = useState(false);
  const [showConsentValidation, setShowConsentValidation] = useState(false);
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

            <Form method="post">
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
              <Button variant="primary" size="medium" type="submit">
                {getAppText("start-soknad.knapp.start")}
              </Button>
            </Form>
          </SectionContent>
        </Section>
      </div>
    </main>
  );
}
