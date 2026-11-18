import { expect, test } from "vitest";

import { buildFileName, buildLlmText, buildMarkdownText } from "./export";
import { parseHttpUrl } from "./url";

test("http(s)로 시작하는 URL만 받아들인다", () => {
  expect(parseHttpUrl(" https://example.com/a ")).toBe("https://example.com/a");
  expect(parseHttpUrl("example.com")).toBeNull();
  expect(parseHttpUrl("ftp://example.com")).toBeNull();
  expect(parseHttpUrl("https://")).toBeNull();
});

test("복사 내용은 제목, 빈 줄, 본문 순서다", () => {
  expect(buildMarkdownText({ title: "제목", markdown: "본문" })).toBe("# 제목\n\n본문");
});

test("프롬프트가 있을 때만 프롬프트와 빈 줄을 앞에 붙인다", () => {
  expect(buildLlmText("요약해줘", "# 제목\n\n본문")).toBe("요약해줘\n\n# 제목\n\n본문");
  expect(buildLlmText("", "# 제목\n\n본문")).toBe("# 제목\n\n본문");
});

test("파일 이름에서 쓸 수 없는 문자를 빼고, 제목이 없으면 untitled를 쓴다", () => {
  expect(buildFileName('a/b:c*"d')).toBe("abcd.md");
  expect(buildFileName("")).toBe("untitled.md");
  expect(buildFileName("???")).toBe("untitled.md");
});
