const PORT = process.env.PORT || 3000;

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://webmaster-tools.yurikoshiishi.com"
    : `http://localhost:${PORT}`;

export const SITE_NAME = "Webmaster Tools";

export const DEFAULT_DESCRIPTION = "A collection of tools to help webmasters";
