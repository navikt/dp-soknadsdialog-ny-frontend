import navStyles from "@navikt/ds-css/dist/index.css?url";
import { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { createClient } from "@sanity/client";
import parse from "html-react-parser";
import { typedjson, useTypedRouteLoaderData } from "remix-typedjson";
import { getDecoratorHTML } from "./decorator/decorator.server";
import { useInjectDecoratorScript } from "./hooks/useInjectDecoratorScript";
import indexStyle from "./index.css?url";
import { getSession } from "./models/getSession.server";
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

export async function loader({ request }: LoaderFunctionArgs) {
  const decoratorFragments = await getDecoratorHTML();

  const sanityTexts = await sanityClient.fetch<ISanity>(allTextsQuery, {
    baseLang: "nb",
    lang: "nb",
  });

  const session = await getSession(request);

  return typedjson({
    decoratorFragments,
    sanityTexts,
    session,
    env: {},
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { decoratorFragments, env } = useTypedRouteLoaderData("root");

  useInjectDecoratorScript(decoratorFragments.DECORATOR_SCRIPTS);

  return (
    <html lang="nb">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        {parse(decoratorFragments.DECORATOR_STYLES, { trim: true })}
        <Links />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        {parse(decoratorFragments.DECORATOR_HEADER, { trim: true })}
        {children}
        {parse(decoratorFragments.DECORATOR_FOOTER, { trim: true })}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
