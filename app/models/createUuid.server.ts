import { getDPSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { INetworkResponse } from "./networkResponse";

export async function createUuid(request: Request): Promise<INetworkResponse<string>> {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/start-soknad`;

  const onBehalfOfToken = await getDPSoknadOrkestratorOboToken(request);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });

  if (!response.ok) {
    return {
      status: "error",
      error: {
        statusCode: response.status,
        statusText: "Feil ved oppretting av ny søknad",
      },
    };
  }

  const data: string = await response.json();

  console.log(`🔥 soknad uuid `, data);

  return { status: "success", data };
}
