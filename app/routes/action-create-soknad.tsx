import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { createSoknad } from "~/models/createSoknad.server";
import { createUuid } from "~/models/createUuid.server";
import { getEnv } from "~/utils/env.utils";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const confirmationPanel = formData.get("confirmationPanel");

  if (!confirmationPanel) {
    return json({ confirmed: false });
  }

  const uuidResponse = await createUuid(request);

  if (uuidResponse.status === "error") {
    return json({ error: uuidResponse.error, confirmed: true });
  }

  const soknadResponse = await createSoknad(request, uuidResponse.data);

  if (soknadResponse.status === "error") {
    return json({ error: soknadResponse.error, confirmed: true });
  }

  return redirect(`${getEnv("DP_SOKNADSDIALOG_URL")}/soknad/${uuidResponse.data}`);
}
