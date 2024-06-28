import { Alert } from "@navikt/ds-react";
import { ISpørsmal, ISpørsmålGruppe } from "~/types/sporsmal";
import { BooleanSporsmal } from "../sporsmal/BooleanSporsmal";
import { DatoSporsmal } from "../sporsmal/DatoSporsmal";
import { LandSporsmal } from "../sporsmal/LandSporsmal";
import { PeriodeSporsmal } from "../sporsmal/PeriodeSporsmal";
import { TekstSporsmal } from "../sporsmal/TekstSporsmal";

export function SporsmalGruppe(props: ISpørsmålGruppe) {
  const { navn, nesteSpørsmål, besvarteSpørsmål } = props;

  function renderSporsmal(nesteSpørsmål: ISpørsmal) {
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
      <div>
        <p>Besvarte</p>
        {besvarteSpørsmål.map((spørsmål: ISpørsmal) => {
          return (
            <div key={spørsmål.id} className="my-10">
              {renderSporsmal(spørsmål)}
            </div>
          );
        })}
      </div>

      <div className="my-10">
        <p>Neste</p>
        {renderSporsmal(nesteSpørsmål)}
      </div>
    </div>
  );
}
