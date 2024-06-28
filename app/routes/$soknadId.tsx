import { LoaderFunctionArgs } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { SoknadHeader } from "~/components/soknad-header/SoknadHeader";
import { SporsmalGruppe } from "~/components/sporsmal-gruppe/SporsmalGruppe";
import { getNesteSporsmal } from "~/models/getNesteSporsmal.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  invariant(params.soknadId, "params.soknadId er påkrevd");

  const nesteSporsmal = await getNesteSporsmal(request, params.soknadId);

  if (nesteSporsmal.status === "error") {
    throw new Response("Error");
  }

  return typedjson({ sporsmalGruppe: nesteSporsmal.data });
}

export default function SoknadIdPage() {
  const { sporsmalGruppe } = useTypedLoaderData<typeof loader>();

  return (
    <main>
      <div className="dp-soknad-frontend">
        <SoknadHeader />
        <SporsmalGruppe {...sporsmalGruppe} />
      </div>
    </main>
  );
}
