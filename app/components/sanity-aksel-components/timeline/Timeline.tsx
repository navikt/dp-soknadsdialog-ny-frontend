import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { TypedObject } from "@portabletext/types";
import { Applicant } from "~/components/icons/Applicant";
import { Bag } from "~/components/icons/Bag";
import { DirectionSign } from "~/components/icons/DirectionSign";
import styles from "./Timeline.module.css";

interface ITimelineItem {
  iconName: string;
  title: string;
  body: TypedObject | TypedObject[];
  _key: string;
}

export function Timeline(props: PortableTextComponentProps<{ elements: ITimelineItem[] }>) {
  return <>{props.value.elements.map(TimelineItem)}</>;
}

function TimelineItem(props: ITimelineItem) {
  function renderSVG() {
    switch (props.iconName) {
      case "Applicant":
        return <Applicant />;
      case "DirectionSign":
        return <DirectionSign />;
      case "Bag":
        return <Bag />;
      default:
        return <Applicant />;
    }
  }

  return (
    <div key={props._key} className={styles.timelineItem}>
      <div className={styles.iconWrapper} aria-hidden>
        <span className={styles.icon}>{renderSVG()}</span>
      </div>
      <dl>
        <dt className={styles.timeLineItemTitle}>{props.title}</dt>
        <dd>
          <PortableText value={props.body} />
        </dd>
      </dl>
    </div>
  );
}
