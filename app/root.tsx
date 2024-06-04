import navStyles from "@navikt/ds-css/dist/index.css?url";
import { LinksFunction, MetaFunction, json } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { createClient } from "@sanity/client";
// import parse from "html-react-parser";
// import { getDecoratorHTML } from "./decorator/decorator.server";
// import { useInjectDecoratorScript } from "./hooks/useInjectDecoratorScript";
import { useTypedRouteLoaderData } from "./hooks/useTypedRouteLoaderData";
import indexStyle from "./index.css?url";
import { sanityConfig } from "./sanity/sanity.config";
import { allTextsQuery } from "./sanity/sanity.query";
import { ISanity } from "./sanity/sanity.types";

export const sanityClient = createClient(sanityConfig);

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: navStyles },
  { rel: "stylesheet", href: indexStyle },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "favicon-16x16.png",
  },
  {
    rel: "icon",
    type: "image/x-icon",
    href: "favicon.ico",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Søknad om dagpenger - Start søknad" },
    {
      property: "og:title",
      content: "Søknad om dagpenger - Start søknad",
    },
  ];
};

export async function loader() {
  // const decoratorFragments = await getDecoratorHTML();

  // if (!decoratorFragments) throw json({ error: "Kunne ikke hente dekoratør" }, { status: 500 });

  const sanityTexts = await sanityClient.fetch<ISanity>(allTextsQuery, {
    baseLang: "nb",
    lang: "nb",
  });

  return json({
    // decoratorFragments,
    sanityTexts,
    env: {},
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { env } = useTypedRouteLoaderData("root");

  // useInjectDecoratorScript(decoratorFragments.DECORATOR_SCRIPTS);

  return (
    <html lang="nb">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* {parse(decoratorFragments.DECORATOR_STYLES, { trim: true })} */}
        <Meta />
        <Links />
      </head>
      <body>
        {/* {parse(decoratorFragments.DECORATOR_HEADER, { trim: true })} */}
        {children}
        <ScrollRestoration />
        {/* {parse(decoratorFragments.DECORATOR_FOOTER, { trim: true })} */}
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
