import { Defuddle } from "defuddle/node";

import type { ConvertedPage, ConvertErrorKind } from "../types";

const FETCH_TIMEOUT_MS = 15_000;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

export class ConvertError extends Error {
  constructor(
    readonly kind: Exclude<ConvertErrorKind, "invalid">,
    readonly status?: number,
  ) {
    super(kind);
  }
}

async function fetchHtml(url: string): Promise<{ html: string; finalUrl: string }> {
  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        "user-agent": USER_AGENT,
        accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5",
        "accept-language": "ko,en;q=0.8",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
  } catch {
    throw new ConvertError("fetch");
  }
  if (!response.ok) throw new ConvertError("fetch", response.status);
  const type = response.headers.get("content-type") ?? "";
  if (!/html/i.test(type)) throw new ConvertError("fetch", response.status);
  try {
    return { html: await response.text(), finalUrl: response.url || url };
  } catch {
    throw new ConvertError("fetch");
  }
}

/** 페이지를 가져와 defuddle로 본문 Markdown, 제목, 저자를 뽑는다. */
export async function convertPage(url: string): Promise<ConvertedPage> {
  const { html, finalUrl } = await fetchHtml(url);
  let result;
  try {
    result = await Defuddle(html, finalUrl, { markdown: true });
  } catch {
    throw new ConvertError("empty");
  }
  const markdown = (result.content ?? "").trim();
  if (!markdown) throw new ConvertError("empty");
  return {
    url,
    title: (result.title ?? "").trim(),
    author: (result.author ?? "").trim(),
    published: (result.published ?? "").trim(),
    markdown,
  };
}
