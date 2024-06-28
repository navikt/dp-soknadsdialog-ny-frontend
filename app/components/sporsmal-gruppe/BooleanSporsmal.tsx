import { Radio, RadioGroup } from "@navikt/ds-react";
import { ISpørsmal } from "~/models/getNesteSporsmal.server";

interface IProps {
  props: ISpørsmal;
}

export function BooleanSporsmal({ props }: IProps) {
  const { tekstnøkkel, svar, gyldigeSvar } = props;

  const handleChange = (val: string) => console.log(val);

  return (
    <RadioGroup legend={tekstnøkkel} onChange={handleChange} defaultValue={svar}>
      <Radio value="10">Ja</Radio>
      <Radio value="40">Nei</Radio>
    </RadioGroup>
  );
}
