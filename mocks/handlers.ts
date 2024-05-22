import { HttpResponse, bypass, http } from "msw";
import { getEnv } from "~/utils/env.utils";
import { arbeidssoekerPerioderResponse } from "./responses/arbeidssoekerPerioderResponse";

export const handlers = [
  http.get(`${getEnv("PAW_ARBEIDSSOEKERREGISTERET_URL")}/api/v1/arbeidssoekerperioder`, () => {
    return HttpResponse.json(arbeidssoekerPerioderResponse);
  }),

  // Bypassing mocks, use actual data instead
  http.get("https://rt6o382n.apicdn.sanity.io/*", async ({ request }) => {
    const bypassResponse = await fetch(bypass(request));
    const response = await bypassResponse.json();

    return HttpResponse.json(response);
  }),
];
