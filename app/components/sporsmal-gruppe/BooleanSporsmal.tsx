import { Radio, RadioGroup } from "@navikt/ds-react";

export function BooleanSporsmal() {
  const handleChange = (val: string) => console.log(val);

  return (
    <RadioGroup legend="Velg din aldersgruppe." onChange={handleChange}>
      <Radio value="10">10-20 år</Radio>
      <Radio value="20">21-45 år</Radio>
      <Radio value="40">46-80 år</Radio>
    </RadioGroup>
  );
}
