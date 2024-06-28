import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { ISpørsmal } from "~/models/getNesteSporsmal.server";

interface IProps {
  props: ISpørsmal;
}

export function PeriodeSporsmal({ props }: IProps) {
  const { tekstnøkkel } = props;

  const { inputProps } = useDatepicker({
    fromDate: new Date(),
  });

  return <DatePicker.Input {...inputProps} label={tekstnøkkel} />;
}
