import { Heading } from "@navikt/ds-react";
import { useSanity } from "~/hooks/useSanity";
import { HeaderIcon } from "../icons/HeaderIcon";
import styles from "./SoknadHeader.module.css";

interface IProps {
  titleTextKey?: string;
}

export function SoknadHeader(props: IProps) {
  const { getAppText } = useSanity();
  return (
    <div className={styles.soknadHeader}>
      <div className={styles.headerContent}>
        <div className={styles.icon}>
          <HeaderIcon />
        </div>
        <Heading size="xlarge" level={"1"} id="header-icon">
          {getAppText(props.titleTextKey ? props.titleTextKey : "soknad.header.tittel")}
        </Heading>
      </div>
    </div>
  );
}
