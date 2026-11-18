export type ConvertedPage = {
  url: string;
  title: string;
  author: string;
  published: string;
  markdown: string;
};

export type ConvertErrorKind = "fetch" | "empty" | "invalid";

export type ConvertErrorBody = {
  error: ConvertErrorKind;
  status?: number;
};
