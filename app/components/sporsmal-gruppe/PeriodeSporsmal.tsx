import { DatePicker } from "@navikt/ds-react";

export function PeriodeSporsmal() {
  return <DatePicker.Standalone mode="range" onSelect={console.log} />;
}
