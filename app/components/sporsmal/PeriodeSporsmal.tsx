import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { ISpørsmal } from "~/models/getNesteSporsmal.server";

export function PeriodeSporsmal(props: ISpørsmal) {
  const { tekstnøkkel } = props;

  const { inputProps } = useDatepicker({
    fromDate: new Date(),
  });

  return <DatePicker.Input {...inputProps} label={tekstnøkkel} />;
}
