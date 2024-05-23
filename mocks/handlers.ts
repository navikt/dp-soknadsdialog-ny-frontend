import { HttpResponse, bypass, http } from "msw";
import { getEnv } from "~/utils/env.utils";

export const handlers = [
  http.post(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/start-soknad`, () => {
    return HttpResponse.json("a8326661-353e-4e4c-afe9-868ce349e086");
  }),

  // Bypassing mocks, use actual data instead
  http.get("https://rt6o382n.apicdn.sanity.io/*", async ({ request }) => {
    const bypassResponse = await fetch(bypass(request));
    const response = await bypassResponse.json();

    return HttpResponse.json(response);
  }),
];
