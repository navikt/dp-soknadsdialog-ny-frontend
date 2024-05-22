const appTextsFields = `{
  textId,
  valueText
}`;

const infoPageFields = `{
  "slug": slug.current,
  body
}`;

const appTextsGroq = `* [_type=="apptekst" && __i18n_lang==$baseLang]{
  ...coalesce(* [_id==^._id + "__i18n_" + $lang][0]${appTextsFields}, ${appTextsFields})
  }`;

const infoPageTextGroq = `* [_type=="infopage"  && __i18n_lang==$baseLang]{
  ...coalesce(* [_id==^._id + "__i18n_" + $lang][0]${infoPageFields}, ${infoPageFields})
  }`;

export const allTextsQuery = `{
  "appTexts": ${appTextsGroq},
  "infoPage": ${infoPageTextGroq}
}`;
