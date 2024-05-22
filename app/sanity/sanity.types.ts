import { TypedObject } from "@portabletext/types";

export interface ISanityAppText {
  textId: string;
  valueText: string;
}

export interface ISanityInfoside {
  slug: string;
  body: TypedObject | TypedObject[];
}

export interface ISanity {
  appTexts: ISanityAppText[];
  infoPage: ISanityInfoside[];
}
