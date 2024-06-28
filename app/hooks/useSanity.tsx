import { useTypedRouteLoaderData } from "remix-typedjson";
import { ISanityAppText, ISanityInfoside } from "~/sanity/sanity.types";

export function useSanity() {
  const { sanityTexts } = useTypedRouteLoaderData("root");

  function getAppText(textId: string): string {
    return (
      sanityTexts?.appTexts.find((appTexts: ISanityAppText) => appTexts.textId === textId)
        ?.valueText || textId
    );
  }

  function getInfoPageText(slug: string): ISanityInfoside | undefined {
    return sanityTexts?.infoPage.find((side: ISanityInfoside) => {
      return side.slug === slug;
    });
  }

  return {
    getAppText,
    getInfoPageText,
  };
}
