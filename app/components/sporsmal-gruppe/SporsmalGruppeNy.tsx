import { ISpørsmal, ISpørsmålGruppe } from "~/models/getNesteSporsmal.server";
import { BooleanSporsmal } from "./BooleanSporsmal";
import { LandSporsmal } from "./LandSporsmal";
import { DatoSporsmal } from "./DatoSporsmal";
import { TekstSporsmal } from "./TekstSporsmal";
import { PeriodeSporsmal } from "./PeriodeSporsmal";

export function SporsmalGruppeNy({ navn, nesteSpørsmål, besvarteSpørsmål }: ISpørsmålGruppe) {
  function renderBesvarteSpørsmal(spørsmal: ISpørsmal) {
    switch (spørsmal.type) {
      case "TEKST":
        return <TekstSporsmal />;
      case "BOOLEAN":
        return <BooleanSporsmal />;
      case "LAND":
        return <LandSporsmal />;
      case "DATO":
        return <DatoSporsmal />;
      case "PERIODE":
        return <PeriodeSporsmal />;
      default:
        return <>Klarte ikke render komponent</>;
    }
  }

  function renderNesteSpørsmal() {
    if (!nesteSpørsmål.type) return null;

    switch (nesteSpørsmål.type) {
      case "TEKST":
        return <TekstSporsmal />;
      case "BOOLEAN":
        return <BooleanSporsmal />;
      case "LAND":
        return <LandSporsmal />;
      case "DATO":
        return <DatoSporsmal />;
      case "PERIODE":
        return <PeriodeSporsmal />;
      default:
        return <>Klarte ikke render komponent</>;
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
