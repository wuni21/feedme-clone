export const INVALID_URL_MESSAGE =
  "http:// 또는 https://로 시작하는 올바른 URL을 입력하세요.";

/** http(s) URL이면 정규화된 문자열을, 아니면 null을 돌려준다. */
export function parseHttpUrl(input: string): string | null {
  const value = input.trim();
  if (!/^https?:\/\//i.test(value)) return null;
  try {
    const url = new URL(value);
    return url.hostname ? url.toString() : null;
  } catch {
    return null;
  }
}
