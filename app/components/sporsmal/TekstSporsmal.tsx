import { TextField } from "@navikt/ds-react";
import { ISpørsmal } from "~/types/sporsmal";

export function TekstSporsmal(props: ISpørsmal) {
  const { tekstnøkkel } = props;

  return <TextField label={tekstnøkkel} />;
}
