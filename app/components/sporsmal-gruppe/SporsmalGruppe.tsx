import { Alert } from "@navikt/ds-react";
import { BooleanSporsmal } from "../sporsmal/BooleanSporsmal";
import { DatoSporsmal } from "../sporsmal/DatoSporsmal";
import { LandSporsmal } from "../sporsmal/LandSporsmal";
import { PeriodeSporsmal } from "../sporsmal/PeriodeSporsmal";
import { TekstSporsmal } from "../sporsmal/TekstSporsmal";
import { ISpørsmal, ISpørsmålGruppe } from "~/types/sporsmal";

export function SporsmalGruppe(props: ISpørsmålGruppe) {
  const { navn, nesteSpørsmål, besvarteSpørsmål } = props;

  function renderBesvarteSpørsmal(spørsmal: ISpørsmal) {
    switch (spørsmal.type) {
      case "TEKST":
        return <TekstSporsmal {...spørsmal} />;
      case "BOOLEAN":
        return <BooleanSporsmal {...spørsmal} />;
      case "LAND":
        return <LandSporsmal {...spørsmal} />;
      case "DATO":
        return <DatoSporsmal {...spørsmal} />;
      case "PERIODE":
        return <PeriodeSporsmal {...spørsmal} />;
      default:
        return (
          <Alert variant="error">
            Error - Brukes til å informere brukeren om at noe kritisk har skjedd.
          </Alert>
        );
    }
  }

  function renderNesteSpørsmal() {
    if (!nesteSpørsmål) return null;

    switch (nesteSpørsmål.type) {
      case "TEKST":
        return <TekstSporsmal {...nesteSpørsmål} />;
      case "BOOLEAN":
        return <BooleanSporsmal {...nesteSpørsmål} />;
      case "LAND":
        return <LandSporsmal {...nesteSpørsmål} />;
      case "DATO":
        return <DatoSporsmal {...nesteSpørsmål} />;
      case "PERIODE":
        return <PeriodeSporsmal {...nesteSpørsmål} />;
      default:
        return (
          <Alert variant="error">
            Error - Brukes til å informere brukeren om at noe kritisk har skjedd.
          </Alert>
        );
    }
  }

  return (
    <div>
      <h2>{navn}</h2>
      {besvarteSpørsmål.map((spørsmål: ISpørsmal) => {
        return (
          <div key={spørsmål.id} className="my-10">
            {renderBesvarteSpørsmal(spørsmål)}
          </div>
        );
      })}
      <div className="my-10">{renderNesteSpørsmal()}</div>
    </div>
  );
}
