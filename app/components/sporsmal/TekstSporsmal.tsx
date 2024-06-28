import { TextField } from "@navikt/ds-react";
import { ISpørsmal } from "~/models/getNesteSporsmal.server";

interface IProps {
  props: ISpørsmal;
}

export function TekstSporsmal({ props }: IProps) {
  const { tekstnøkkel, svar } = props;

  return <TextField label={tekstnøkkel} value={svar} />;
}
