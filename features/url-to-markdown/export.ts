import type { ConvertedPage } from "./types";

export const PRESET_PROMPTS = [
  "요약해줘",
  "한국어로 번역해줘",
  "쉽게 설명해줘",
] as const;

export const CUSTOM_PROMPT = "__custom";

export const LLM_TARGETS = {
  chatgpt: { name: "ChatGPT", url: "https://chatgpt.com/" },
  claude: { name: "Claude", url: "https://claude.ai/new" },
} as const;

/** 복사·다운로드에 쓰는 내용: `# 제목`, 빈 줄, 본문. */
export function buildMarkdownText(page: Pick<ConvertedPage, "title" | "markdown">) {
  const body = page.markdown;
  return page.title ? `# ${page.title}\n\n${body}` : body;
}

/** LLM으로 보낼 내용: 프롬프트가 있으면 [프롬프트, 빈 줄, 복사 내용]. */
export function buildLlmText(prompt: string, markdownText: string) {
  return prompt ? `${prompt}\n\n${markdownText}` : markdownText;
}

export function buildFileName(title: string) {
  const name = title
    .replace(/[\/:*?"<>|\u0000-\u001f]/g, "")
    .trim()
    .slice(0, 80)
    .trim();
  return `${name || "untitled"}.md`;
}
