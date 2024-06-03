import { Heading } from "@navikt/ds-react";
import { useSanity } from "~/hooks/useSanity";
import { HeaderIcon } from "../icons/HeaderIcon";
import styles from "./SoknadHeader.module.css";

export function SoknadHeader() {
  const { getAppText } = useSanity();
  return (
    <div className={styles.soknadHeader}>
      <div className={styles.headerContent}>
        <div className={styles.icon}>
          <HeaderIcon />
        </div>
        <Heading size="xlarge" level={"1"} id="header-icon">
          {getAppText("soknad.header.tittel")}
        </Heading>
      </div>
    </div>
  );
}
