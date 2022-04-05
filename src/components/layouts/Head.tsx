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

  return (
    <NextHead>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />
    </NextHead>
  );
};

export default Head;
