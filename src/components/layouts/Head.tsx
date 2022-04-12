import React, { VFC } from "react";
import NextHead from "next/head";
import { useRouter } from "next/router";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/constants";

export interface HeadProps {
  title?: string;
  siteName?: string;
  description?: string;
  baseUrl?: string;
}

const Head: VFC<HeadProps> = ({
  description = DEFAULT_DESCRIPTION,
  siteName = SITE_NAME,
  title = SITE_NAME,
  baseUrl,
}) => {
  const { pathname } = useRouter();
  const url = `${baseUrl}${pathname}`;

  const titleWithSitename = composeTitle({ siteName, title });

  return (
    <NextHead>
      <title>{titleWithSitename}</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/favicon-16x16.png"
      />
      <link rel="manifest" href="/assets/site.webmanifest" />

      <meta name="title" content={titleWithSitename} />
      <meta name="description" content={description} />

      <meta property="og:title" content={titleWithSitename} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta
        name="twitter:title"
        content={titleWithSitename}
        key="twitter:title"
      />
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />
    </NextHead>
  );
};

function composeTitle({
  siteName,
  title,
}: {
  siteName: string;
  title?: string;
}) {
  if (!title) {
    return siteName;
  }

  if (title && title.includes(siteName)) {
    return title;
  }

  return `${title} | ${siteName}`;
}

export default Head;
