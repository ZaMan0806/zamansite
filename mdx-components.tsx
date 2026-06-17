import type { MDXComponents } from "mdx/types";
import {
  Steps,
  Sequence,
  Pipeline,
  Callout,
  Compare,
  Aside,
} from "@/components/wiki/Flow";

// MDX 파일에서 import 없이 바로 쓸 수 있는 전역 컴포넌트.
// HTML 요소 스타일은 페이지 컨테이너의 `prose` 클래스가 처리.
const components: MDXComponents = {
  Steps,
  Sequence,
  Pipeline,
  Callout,
  Compare,
  Aside,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
