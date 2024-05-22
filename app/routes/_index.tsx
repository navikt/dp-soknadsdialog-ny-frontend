import { PortableText } from "@portabletext/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Section } from "~/components/section/Section";
import { SectionContent } from "~/components/section/SectionContent";
import { Timeline } from "~/components/sanity/timeline/Timeline";
import { useSanity } from "~/hooks/useSanity";
import { getSession } from "~/models/getSession.server";
import { ReadMore } from "~/components/sanity/readmore/ReadMore";
import { Button, ConfirmationPanel } from "@navikt/ds-react";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);

  return json({
    session,
  });
}

export default function Index() {
  const { getInfoPageText, getAppText } = useSanity();
  const startSideText = getInfoPageText("startside");

  return (
    <main>
      <div className="dp-soknadsdialog-ny-frontend">
        <Section>
          <SectionContent>
            {startSideText?.body && (
              <PortableText
                value={startSideText.body}
                components={{ types: { timeline: Timeline, readMore: ReadMore } }}
              />
            )}
            <ConfirmationPanel
              label={getAppText("start-soknad.checkbox.samtykke-riktige-opplysninger.label")}
            />
            <Button variant="primary" size="medium">
              {getAppText("start-soknad.knapp.start")}
            </Button>
          </SectionContent>
        </Section>
      </div>
    </main>
  );
}
