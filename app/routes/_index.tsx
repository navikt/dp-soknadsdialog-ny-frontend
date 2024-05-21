import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Section } from "~/components/section/Section";
import { SectionContent } from "~/components/section/SectionContent";
import { getSession } from "~/models/getSession.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);

  return json({
    session,
  });
}

export default function Index() {
  return (
    <main>
      <div className="dp-soknadsdialog-ny-frontend">
        <Section>
          <SectionContent>Ny frontend for søknadsdialog</SectionContent>
        </Section>
      </div>
    </main>
  );
}
