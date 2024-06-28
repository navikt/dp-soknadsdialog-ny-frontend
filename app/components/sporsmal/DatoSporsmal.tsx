import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { ISpørsmal } from "~/types/sporsmal";

export function DatoSporsmal(props: ISpørsmal) {
  const { tekstnøkkel } = props;

  const { inputProps } = useDatepicker({
    fromDate: new Date(),
  });

  return <DatePicker.Input {...inputProps} label={tekstnøkkel} />;
}
