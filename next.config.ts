import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // .mdx 파일을 페이지/임포트로 처리할 수 있게 확장자 등록
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // Turbopack은 플러그인을 문자열 이름 + 직렬화 가능한 옵션으로만 받는다.
    // rehype-pretty-code는 Shiki 테마를 문자열로 지정할 수 있어 호환된다.
    rehypePlugins: [
      ["rehype-pretty-code", { theme: "github-dark-default", keepBackground: false }],
    ],
  },
});

export default withMDX(nextConfig);
