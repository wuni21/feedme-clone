"use client";

import { ExternalLinkIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  buildLlmText,
  CUSTOM_PROMPT,
  LLM_TARGETS,
  PRESET_PROMPTS,
} from "../export";

export function SendToLlm({ markdownText }: { markdownText: string }) {
  const [choice, setChoice] = useState<string | null>(null);
  const [custom, setCustom] = useState("");

  const prompt = choice === CUSTOM_PROMPT ? custom.trim() : (choice ?? "");

  function select(values: string[]) {
    setChoice(values[0] ?? null);
    setCustom("");
  }

  async function send(target: keyof typeof LLM_TARGETS) {
    const { name, url } = LLM_TARGETS[target];
    try {
      await navigator.clipboard.writeText(buildLlmText(prompt, markdownText));
    } catch {
      toast.error("복사하지 못했습니다");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success(`${name}를 새 탭에서 열었습니다`, {
      description: `${prompt ? "프롬프트와 본문을" : "본문을"} 복사했어요. 입력창에 붙여넣기(Ctrl+V)만 하세요.`,
    });
  }

  return (
    <section className="grid gap-3 bg-muted px-7 py-5">
      <p className="text-sm font-bold">
        LLM으로 보내기{" "}
        <span className="font-normal text-muted-foreground">
          · 프롬프트는 선택 사항입니다
        </span>
      </p>
      <ToggleGroup
        aria-label="프롬프트"
        variant="outline"
        spacing={1.5}
        className="flex-wrap"
        value={choice ? [choice] : []}
        onValueChange={select}
      >
        {PRESET_PROMPTS.map((preset) => (
          <ToggleGroupItem key={preset} value={preset}>
            {preset}
          </ToggleGroupItem>
        ))}
        <ToggleGroupItem value={CUSTOM_PROMPT}>직접 입력</ToggleGroupItem>
      </ToggleGroup>
      {choice === CUSTOM_PROMPT && (
        <Input
          autoFocus
          aria-label="직접 입력한 프롬프트"
          placeholder="예: 핵심 주장 3가지와 근거를 표로 정리해줘"
          value={custom}
          onChange={(event) => setCustom(event.target.value)}
        />
      )}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
          {prompt
            ? `“${prompt}” + 본문 Markdown을 보냅니다`
            : "본문 Markdown만 보냅니다"}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={() => send("chatgpt")}>
            <ExternalLinkIcon data-icon="inline-start" />
            ChatGPT로 열기
          </Button>
          <Button onClick={() => send("claude")}>
            <ExternalLinkIcon data-icon="inline-start" />
            Claude로 열기
          </Button>
        </div>
      </div>
    </section>
  );
}
