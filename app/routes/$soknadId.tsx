import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { SoknadHeader } from "~/components/soknad-header/SoknadHeader";
import { SporsmalGruppe } from "~/components/sporsmal-gruppe/SporsmalGruppe";
import { ISpørsmålGruppe, getNesteSporsmal } from "~/models/getNesteSporsmal.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  invariant(params.soknadId, "params.soknadId er påkrevd");

  const nesteSporsmal = await getNesteSporsmal(request, params.soknadId);

  if (nesteSporsmal.status === "error") {
    throw new Response("Error");
  }

  return json({ sporsmalGruppe: nesteSporsmal.data });
}

export default function SoknadIdPage() {
  const { sporsmalGruppe } = useLoaderData<typeof loader>();

  console.log(`🔥 sporsmalGruppe :`, sporsmalGruppe);

  return (
    <main>
      <div className="dp-soknad-frontend">
        <SoknadHeader />
        <SporsmalGruppe props={sporsmalGruppe as ISpørsmålGruppe} />
      </div>
    </main>
  );
}
