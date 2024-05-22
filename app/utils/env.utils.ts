declare global {
  interface Window {
    env: IEnv;
  }
}

interface IEnv {
  USE_MSW: string;
  NAIS_CLUSTER_NAME: string;
  IS_LOCALHOST: string;
  DP_SOKNADSDIALOG_URL: string;
  DP_SOKNAD_ORKESTRATOR_URL: string;
  DP_SOKNAD_ORKESTRATOR_TOKEN: string;
}

export function getEnv(value: keyof IEnv) {
  const env = typeof window !== "undefined" ? window.env : process.env;

  return env[value] || "";
}
