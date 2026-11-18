import { expect, test } from "@playwright/test";

test("빈 화면에서는 변환하기 버튼이 눌리지 않고, 잘못된 URL은 안내 문구를 보여 준다", async ({
  page,
}) => {
  await page.goto("/");

  const convert = page.getByRole("button", { name: "변환하기" });
  await expect(convert).toBeDisabled();

  await page.getByLabel("페이지 URL").fill("example.com");
  await convert.click();
  await expect(
    page.getByText("http:// 또는 https://로 시작하는 올바른 URL을 입력하세요."),
  ).toBeVisible();
});
