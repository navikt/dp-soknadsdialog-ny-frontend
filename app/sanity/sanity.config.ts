import { getEnv } from "~/utils/env.utils";

export const sanityConfig = {
  dataset: getEnv("SANITY_DATASET") || "production",
  projectId: "rt6o382n",
  useCdn: true,
  token: "",
  apiVersion: "2021-06-06",
};
