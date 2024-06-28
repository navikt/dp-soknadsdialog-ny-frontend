import { Select } from "@navikt/ds-react";
import { ISpørsmal } from "~/types/sporsmal";

export function LandSporsmal(props: ISpørsmal) {
  const { tekstnøkkel } = props;

  return (
    <Select label={tekstnøkkel}>
      <option value="">Velg land</option>
      <option value="norge">Norge</option>
      <option value="sverige">Sverige</option>
      <option value="danmark">Danmark</option>
    </Select>
  );
}
