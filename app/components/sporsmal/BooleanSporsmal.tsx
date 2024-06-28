import { Radio, RadioGroup } from "@navikt/ds-react";
import { ISpørsmal } from "~/types/sporsmal";

export function BooleanSporsmal(props: ISpørsmal) {
  const { tekstnøkkel, svar } = props;

  const handleChange = (val: string) => console.log(val);

  return (
    <RadioGroup legend={tekstnøkkel} onChange={handleChange} defaultValue={svar}>
      <Radio value="10">Ja</Radio>
      <Radio value="40">Nei</Radio>
    </RadioGroup>
  );
}
