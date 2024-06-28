import { Select } from "@navikt/ds-react";
import { ISpørsmal } from "~/models/getNesteSporsmal.server";

interface IProps {
  props: ISpørsmal;
}

export function LandSporsmal({ props }: IProps) {
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
