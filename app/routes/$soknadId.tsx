import { LoaderFunctionArgs, json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { SoknadHeader } from "~/components/soknad-header/SoknadHeader";
import { SporsmalGruppeNy } from "~/components/sporsmal-gruppe/SporsmalGruppeNy";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { ISpørsmålGruppe, getNesteSporsmal } from "~/models/getNesteSporsmal.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  invariant(params.soknadId, "params.soknadId er påkrevd");

  const nesteSporsmal = await getNesteSporsmal(request, params.soknadId);

  if (nesteSporsmal.status === "error") {
    throw new Response("Error");
  }

  const sporsmalGruppe: ISpørsmålGruppe = nesteSporsmal.data;
  return json({ sporsmalGruppe });
}

export default function SoknadIdPage() {
  const { sporsmalGruppe } = useTypedRouteLoaderData("routes/$soknadId");

  return (
    <main>
      <div className="dp-soknad-frontend">
        <SoknadHeader />
        <SporsmalGruppeNy {...(sporsmalGruppe as ISpørsmålGruppe)} />
      </div>
    </main>
  );
}
