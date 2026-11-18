import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BODY_CLASS = [
  "px-7 text-[15px] leading-7 wrap-anywhere",
  "[&>:first-child]:mt-0",
  "[&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:text-xl [&_h1]:font-bold",
  "[&_h2]:mt-7 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-bold",
  "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-bold",
  "[&_h4]:mt-5 [&_h4]:mb-2 [&_h4]:font-semibold",
  "[&_p]:mb-3.5 [&_a]:underline [&_a]:underline-offset-4",
  "[&_ul]:mb-3.5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-3.5 [&_ol]:list-decimal [&_ol]:pl-6",
  "[&_blockquote]:mb-3.5 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground",
  "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px]",
  "[&_pre]:mb-3.5 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:bg-muted [&_pre]:p-4",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
  "[&_img]:my-3 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl",
  "[&_table]:mb-3.5 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:text-sm",
  "[&_th]:border [&_th]:px-2.5 [&_th]:py-1.5 [&_th]:text-left [&_td]:border [&_td]:px-2.5 [&_td]:py-1.5",
  "[&_hr]:my-6",
].join(" ");

export function MarkdownBody({ markdown }: { markdown: string }) {
  return (
    <div className={BODY_CLASS}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
