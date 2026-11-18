"use client";

import { CheckIcon, CopyIcon, DownloadIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildFileName, buildMarkdownText } from "../export";
import type { ConvertedPage } from "../types";
import { MarkdownBody } from "./markdown-body";
import { SendToLlm } from "./send-to-llm";

export function ResultCard({ page }: { page: ConvertedPage }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const markdownText = buildMarkdownText(page);
  const meta = [page.author, formatDate(page.published)]
    .filter(Boolean)
    .join(" · ");

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdownText);
    } catch {
      toast.error("복사하지 못했습니다");
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  function download() {
    const fileName = buildFileName(page.title);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob([markdownText], { type: "text/markdown;charset=utf-8" }),
    );
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
    toast.success("파일을 저장했습니다", { description: fileName });
  }

  return (
    <Card className="gap-0 py-0">
      <header className="flex flex-col gap-4 px-7 pt-7 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="mb-1.5 text-2xl leading-snug font-bold tracking-tight">
            {page.title || "제목 없음"}
          </h2>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
            {meta && <span>{meta}</span>}
            <a
              href={page.url}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 wrap-anywhere"
            >
              {page.url.replace(/^https?:\/\//, "")}
            </a>
          </div>
        </div>
        <div className="flex shrink-0 gap-2 max-sm:[&>*]:flex-1">
          <Button variant="outline" onClick={copy}>
            {copied ? (
              <CheckIcon data-icon="inline-start" />
            ) : (
              <CopyIcon data-icon="inline-start" />
            )}
            {copied ? "복사됨" : "복사하기"}
          </Button>
          <Button variant="outline" onClick={download}>
            <DownloadIcon data-icon="inline-start" />
            .md 다운로드
          </Button>
        </div>
      </header>
      <SendToLlm markdownText={markdownText} />
      <div className="py-7">
        <MarkdownBody markdown={page.markdown} />
      </div>
    </Card>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "long" }).format(date);
}
