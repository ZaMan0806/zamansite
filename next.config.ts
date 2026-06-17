import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // .mdx 파일을 페이지/임포트로 처리할 수 있게 확장자 등록
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // remark/rehype 플러그인이 필요하면 여기에 추가
});

export default withMDX(nextConfig);
