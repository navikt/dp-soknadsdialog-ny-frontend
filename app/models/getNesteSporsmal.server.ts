import { getDPSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { INetworkResponse } from "./networkResponse";

export interface ISpørsmal {
  id: string;
  tekstnøkkel: string;
  type: SpørsmålTypes;
  svar: any;
  gyldigeSvar: any;
}

export type SpørsmålTypes = "LAND" | "PERIODE" | "DATO" | "TEKST" | "BOOLEAN";

export interface ISpørsmålGruppe {
  id: string;
  navn: string;
  nesteSpørsmål: ISpørsmal;
  besvarteSpørsmål: ISpørsmal[];
}

export async function getNesteSporsmal(
  request: Request,
  soknadId: string
): Promise<INetworkResponse<ISpørsmålGruppe>> {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/${soknadId}/neste`;

  const onBehalfOfToken = await getDPSoknadOrkestratorOboToken(request);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });

  if (!response.ok) {
    return {
      status: "error",
      error: {
        statusCode: response.status,
        statusText: "Feil ved henting av neste spørsmål",
      },
    };
  }

  const data = await response.json();

  return { status: "success", data };
}
