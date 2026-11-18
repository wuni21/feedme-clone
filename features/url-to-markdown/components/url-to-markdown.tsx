"use client";

import { CircleAlertIcon, FileTextIcon, Loader2Icon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { ConvertedPage, ConvertErrorBody } from "../types";
import { INVALID_URL_MESSAGE, parseHttpUrl } from "../url";
import { ResultCard } from "./result-card";
import { ThemeToggle } from "./theme-toggle";

type View =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "result"; page: ConvertedPage }
  | { kind: "error"; title: string; description: string };

const FETCH_FAILED_TITLE = "페이지를 가져오지 못했습니다";

async function requestConversion(url: string): Promise<View> {
  let response: Response;
  try {
    response = await fetch("/api/convert", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url }),
    });
  } catch {
    return {
      kind: "error",
      title: FETCH_FAILED_TITLE,
      description: "서버에 연결하지 못했습니다. 잠시 후 다시 시도하세요.",
    };
  }
  if (response.ok) {
    return { kind: "result", page: (await response.json()) as ConvertedPage };
  }
  const body = (await response.json().catch(() => null)) as ConvertErrorBody | null;
  if (body?.error === "empty") {
    return {
      kind: "error",
      title: "본문을 찾지 못했습니다",
      description:
        "이 페이지에서 추출할 본문이 없습니다. 로그인이 필요하거나 스크립트로만 그려지는 페이지일 수 있습니다.",
    };
  }
  const status = body?.status ? `(HTTP ${body.status})` : "";
  return {
    kind: "error",
    title: FETCH_FAILED_TITLE,
    description: `사이트가 응답하지 않거나 접근을 막았습니다${status}. 주소를 확인하거나 잠시 후 다시 시도하세요.`,
  };
}

export function UrlToMarkdown() {
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [view, setView] = useState<View>({ kind: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);
  // 지우기 뒤에 늦게 도착한 응답이 화면을 되살리지 않도록 요청 번호를 둔다.
  const requestId = useRef(0);
  const loading = view.kind === "loading";

  async function convert(event: React.FormEvent) {
    event.preventDefault();
    if (loading) return;
    const url = parseHttpUrl(value);
    if (!url) {
      setInvalid(true);
      return;
    }
    const id = ++requestId.current;
    setView({ kind: "loading" });
    const next = await requestConversion(url);
    if (id === requestId.current) setView(next);
  }

  function clear() {
    requestId.current++;
    setValue("");
    setInvalid(false);
    setView({ kind: "idle" });
    inputRef.current?.focus();
  }

  return (
    <>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[17px] font-bold">
          <span
            aria-hidden
            className="grid size-6 place-items-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground"
          >
            md
          </span>
          FeedMe
        </div>
        <ThemeToggle />
      </header>

      <div>
        <h1 className="mb-1 text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
          웹 페이지를 LLM에 바로 넘기세요
        </h1>
        <p className="text-base text-muted-foreground">
          URL을 붙여넣으면 본문만 Markdown으로 뽑아 드립니다.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={convert} noValidate>
          <Field data-invalid={invalid}>
            <FieldLabel htmlFor="url" className="sr-only">
              페이지 URL
            </FieldLabel>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <Input
                  id="url"
                  ref={inputRef}
                  type="url"
                  inputMode="url"
                  autoComplete="off"
                  placeholder="https://example.com/article"
                  className="pr-12"
                  aria-invalid={invalid}
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value);
                    setInvalid(false);
                  }}
                />
                {value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="지우기"
                    title="지우기"
                    className="absolute top-1/2 right-1.5 -translate-y-1/2"
                    onClick={clear}
                  >
                    <XIcon />
                  </Button>
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                className="px-6 max-sm:w-full"
                disabled={loading || value.trim() === ""}
              >
                {loading ? (
                  <>
                    <Loader2Icon data-icon="inline-start" className="animate-spin" />
                    변환 중
                  </>
                ) : (
                  "변환하기"
                )}
              </Button>
            </div>
            {invalid && <FieldError>{INVALID_URL_MESSAGE}</FieldError>}
          </Field>
        </form>
      </Card>

      {view.kind === "idle" && (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileTextIcon />
            </EmptyMedia>
            <EmptyTitle>아직 변환한 페이지가 없습니다</EmptyTitle>
            <EmptyDescription>
              블로그 글, 문서, 뉴스 기사처럼 본문이 있는 페이지에서 잘 동작합니다.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      {view.kind === "loading" && <ResultSkeleton />}
      {view.kind === "error" && (
        <Alert variant="destructive">
          <CircleAlertIcon />
          <AlertTitle>{view.title}</AlertTitle>
          <AlertDescription>{view.description}</AlertDescription>
        </Alert>
      )}
      {view.kind === "result" && <ResultCard page={view.page} />}
    </>
  );
}

function ResultSkeleton() {
  return (
    <Card aria-busy="true" aria-label="변환 중" className="gap-0 py-0">
      <div className="grid gap-2.5 px-7 pt-7 pb-6">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-2/5" />
      </div>
      <CardContent className="grid gap-2.5 px-7 pb-7">
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="mt-3 h-5 w-1/3" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}
