import { DatePicker } from "@navikt/ds-react";

export function DatoSporsmal() {
  return (
    <DatePicker.Standalone
      onSelect={console.log}
      dropdownCaption
      fromDate={new Date("1 Oct 2020")}
      toDate={new Date("1 Oct 2024")}
    />
  );
}
