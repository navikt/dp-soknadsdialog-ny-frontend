import { Alert } from "@navikt/ds-react";
import { useSearchParams } from "@remix-run/react";
import { Section } from "~/components/section/Section";
import { SectionContent } from "~/components/section/SectionContent";
import { SoknadHeader } from "~/components/soknad-header/SoknadHeader";

export default function Uuid() {
  const [searchParams] = useSearchParams();

  return (
    <main>
      <div className="dp-soknadsdialog-ny-frontend">
        <Section>
          <SoknadHeader />
          <SectionContent>
            <Alert variant="success" className="mt-10">
              Søknad id: {searchParams}
            </Alert>
          </SectionContent>
        </Section>
      </div>
    </main>
  );
}
