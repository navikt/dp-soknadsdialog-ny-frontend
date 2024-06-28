import { TextField } from "@navikt/ds-react";
import { ISpørsmal } from "~/models/getNesteSporsmal.server";

export function TekstSporsmal(props: ISpørsmal) {
  const { tekstnøkkel } = props;

  return <TextField label={tekstnøkkel} />;
}
