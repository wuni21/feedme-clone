import { parseHttpUrl } from "@/features/url-to-markdown/url";
import {
  ConvertError,
  convertPage,
} from "@/features/url-to-markdown/server/convert-page";
import type { ConvertErrorBody } from "@/features/url-to-markdown/types";

function errorResponse(body: ConvertErrorBody, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = (await request.json())?.url;
  } catch {
    return errorResponse({ error: "invalid" }, 400);
  }
  const url = typeof input === "string" ? parseHttpUrl(input) : null;
  if (!url) return errorResponse({ error: "invalid" }, 400);

  try {
    return Response.json(await convertPage(url));
  } catch (error) {
    if (error instanceof ConvertError) {
      return errorResponse({ error: error.kind, status: error.status }, 422);
    }
    return errorResponse({ error: "fetch" }, 502);
  }
}
