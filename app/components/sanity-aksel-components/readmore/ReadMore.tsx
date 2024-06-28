import { ReadMore as NAVReadMore } from "@navikt/ds-react";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { TypedObject } from "@portabletext/types";

export interface IReadMoreProps {
  title: string;
  size?: "small" | "medium";
  defaultOpen?: boolean;
  body: TypedObject | TypedObject[];
}

export function ReadMore(props: PortableTextComponentProps<IReadMoreProps>) {
  const { body, title, size = "medium", defaultOpen = false } = props.value;

  return (
    <NAVReadMore header={title} defaultOpen={defaultOpen} size={size}>
      <PortableText value={body} />
    </NAVReadMore>
  );
}
