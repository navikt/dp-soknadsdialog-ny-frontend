import { ISanityAppText, ISanityInfoside } from "~/sanity/sanity.types";
import { useTypedRouteLoaderData } from "./useTypedRouteLoaderData";

export function useSanity() {
  const { sanityTexts } = useTypedRouteLoaderData("root");

  function getAppText(textId: string): string {
    return (
      sanityTexts?.appTexts.find((appTexts: ISanityAppText) => appTexts.textId === textId)
        ?.valueText || textId
    );
  }

  function getInfoPageText(slug: string): ISanityInfoside | undefined {
    return sanityTexts?.infoPage.find((side) => {
      return side.slug === slug;
    });
  }

  return {
    getAppText,
    getInfoPageText,
  };
}
