import { Button, ConfirmationPanel } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, redirect, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { ReadMore } from "~/components/sanity/readmore/ReadMore";
import { Timeline } from "~/components/sanity/timeline/Timeline";
import { SoknadHeader } from "~/components/soknad-header/SoknadHeader";
import { useSanity } from "~/hooks/useSanity";
import { useSetFocus } from "~/hooks/useSetFocus";
import { dpSoknadCreateSoknad } from "~/models/dp-soknad/dpSoknadCreateSoknad.server";
import { startSoknad } from "~/models/startSoknad.server";
import { getSession } from "~/models/getSession.server";
import { getEnv } from "~/utils/env.utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);

  return json({
    session,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const confirmationPanel = formData.get("confirmationPanel");

  if (!confirmationPanel) {
    return json({ confirmed: false });
  }

  const startSoknadResponse = await startSoknad(request);

  if (startSoknadResponse.status === "error") {
    return json({ error: startSoknadResponse.error, confirmed: true });
  }

  const dpSoknadCreateSoknadResponse = await dpSoknadCreateSoknad(
    request,
    startSoknadResponse.data
  );

  if (dpSoknadCreateSoknadResponse.status === "error") {
    return json({ error: dpSoknadCreateSoknadResponse.error, confirmed: true });
  }

  return redirect(`${getEnv("DP_SOKNADSDIALOG_URL")}/soknad/${startSoknadResponse.data}`);
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const [consentGiven, setConsentGiven] = useState(false);
  const missingConsentRef = useRef<HTMLInputElement>(null);
  const { setFocus } = useSetFocus();
  const navigation = useNavigation();
  const { getInfoPageText, getAppText } = useSanity();
  const startSideText = getInfoPageText("startside");

  useEffect(() => {
    if (actionData && !actionData.confirmed) {
      setFocus(missingConsentRef);
    }
  }, [actionData, setFocus]);

  return (
    <main>
      <div className="dp-soknad-frontend">
        <SoknadHeader />
        {startSideText?.body && (
          <PortableText
            value={startSideText.body}
            components={{ types: { timeline: Timeline, readMore: ReadMore } }}
          />
        )}
        <Form method="post">
          <ConfirmationPanel
            ref={missingConsentRef}
            name="confirmationPanel"
            className="mb-10"
            checked={consentGiven}
            label={getAppText("start-soknad.checkbox.samtykke-riktige-opplysninger.label")}
            onChange={() => {
              setConsentGiven(!consentGiven);
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
            loading={navigation.state === "submitting"}
          >
            {getAppText("start-soknad.knapp.start")}
          </Button>
        </Form>
      </div>
    </main>
  );
}
