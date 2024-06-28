import { Alert } from "@navikt/ds-react";
import { ISpørsmal, ISpørsmålGruppe } from "~/models/getNesteSporsmal.server";
import { BooleanSporsmal } from "../sporsmal/BooleanSporsmal";
import { DatoSporsmal } from "../sporsmal/DatoSporsmal";
import { LandSporsmal } from "../sporsmal/LandSporsmal";
import { PeriodeSporsmal } from "../sporsmal/PeriodeSporsmal";
import { TekstSporsmal } from "../sporsmal/TekstSporsmal";

interface IProps {
  props: ISpørsmålGruppe;
}

export function SporsmalGruppe({ props }: IProps) {
  const { navn, nesteSpørsmål, besvarteSpørsmål } = props;

  function renderBesvarteSpørsmal(spørsmal: ISpørsmal) {
    switch (spørsmal.type) {
      case "TEKST":
        return <TekstSporsmal props={spørsmal} />;
      case "BOOLEAN":
        return <BooleanSporsmal props={spørsmal} />;
      case "LAND":
        return <LandSporsmal props={spørsmal} />;
      case "DATO":
        return <DatoSporsmal props={spørsmal} />;
      case "PERIODE":
        return <PeriodeSporsmal props={spørsmal} />;
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
        return <TekstSporsmal props={nesteSpørsmål} />;
      case "BOOLEAN":
        return <BooleanSporsmal props={nesteSpørsmål} />;
      case "LAND":
        return <LandSporsmal props={nesteSpørsmål} />;
      case "DATO":
        return <DatoSporsmal props={nesteSpørsmål} />;
      case "PERIODE":
        return <PeriodeSporsmal props={nesteSpørsmål} />;
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
      {besvarteSpørsmål.map((spørsmål) => {
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
