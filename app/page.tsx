import { UrlToMarkdown } from "@/features/url-to-markdown/components/url-to-markdown";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
      <UrlToMarkdown />
    </main>
  );
}
