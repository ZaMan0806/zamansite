# 위키 시각화 컴포넌트 가이드

`content/wiki/*.mdx` 글에서 흐름·구조를 시각화하는 컴포넌트 모음.
실제 구현은 `Flow.tsx`, 전역 등록은 루트 `mdx-components.tsx`에 있다.
MDX 안에서는 import 없이 바로 태그로 쓴다.

## 디자인 원칙 (글을 새로 쓸 때 따를 것)

- **다크 톤 고정**: 배경 `#0a0a0a`, 텍스트는 `white/xx` 투명도. 새 색을 들이지 말 것.
- **토글·아코디언 금지**: 모든 내용은 펼친 상태로 보여준다. `Steps`의 `detail`도 항상 표시된다.
- **흐름만 나열하지 말 것**: 컴포넌트 사이사이에 산문 설명을 충분히 넣는다. "왜 이런가"를 풀어주는 문단이 컴포넌트만큼 중요하다.
- **각 절 끝에 정리 문단**: 그 절이 무슨 목적이었는지 한 단락으로 회수하고 다음 절로 넘긴다.
- **글 끝에 `## 한 장 요약`**: `Steps`로 전체를 한눈에 압축한다 (`detail` 없이 `title`+`desc`만).
- **메타데이터 필수**: 각 mdx 최상단에 `export const metadata = { title, date, description, tags }`. `tags`는 배열이며 `/wiki?tag=...` 필터·집계(`lib/wiki.ts`)에 쓰인다.

## MDX 작성 시 주의 (실제로 깨졌던 것들)

- **한글 + JSX 태그 줄바꿈**: 한글 텍스트와 `<code>`/`<strong>` 사이에서 줄바꿈하면 MDX가 공백을 먹는다. 줄 끝에 `{" "}` 를 넣어 공백을 보존한다.
- **JSX(컴포넌트 prop) 안의 코드**는 `<code>...</code>` 태그로 쓴다. 마크다운 백틱은 prop 문자열 안에서 안 먹는다.
- **본문(산문) 안의 코드**는 백틱 `` `like this` `` 으로 쓴다 — `globals.css`가 칩 스타일로 렌더.
- **코드 블록**은 ```` ```js ```` 처럼 언어를 명시한다. `rehype-pretty-code`(Shiki, `github-dark-default`)가 빌드 타임에 하이라이트하고, 우상단에 언어 뱃지가 붙는다.
- **HTML 엔티티**: prop 안에서 `<`, `>` 는 `&lt;`, `&gt;` 로 (예: `Bearer &lt;JWT&gt;`).
- 글을 추가/수정하면 **반드시 `npm run build`로 검증**한다. metadata 파싱 에러(acorn)는 줄 번호가 밀리며 엉뚱한 곳을 가리킬 수 있으니 의심 줄 주변 한글 오타(`)있,` 같은 IME 실수)도 확인.

---

## 컴포넌트 레퍼런스

### `<Steps>` — 번호 매겨진 세로 타임라인
각 단계를 위→아래로. 흐름의 "순서"를 보여줄 때.

```jsx
<Steps
  steps={[
    {
      title: "단계 제목",
      desc: "한 줄 요약 (선택)",
      detail: (                      // 항상 펼쳐진 보조 박스 (선택)
        <p className="m-0">
          긴 설명. <code>코드</code> 와 <strong>강조</strong> 가능.
        </p>
      ),
    },
  ]}
/>
```
- `title` 필수, `desc`/`detail` 선택. `detail`은 `ReactNode`라 `<p className="m-0">`로 감싸 쓴다.
- `## 한 장 요약`에서는 `detail` 없이 `title`+`desc`만으로 압축.

### `<Sequence>` — 클라이언트↔서버 메시지 교환
요청/응답이 오가는 순서. `from`이 화살표 방향을 정한다.

```jsx
<Sequence
  left="Browser"
  right="API Server"
  messages={[
    { from: "left",  label: "GET /users/42", note: "보조 설명 (선택)" },
    { from: "right", label: "200 OK + JSON" },
  ]}
/>
```
- `left`/`right` 기본값 `"Client"`/`"Server"`. `from`: `"left"`(→) | `"right"`(←). `label`은 평문 문자열(JSX 불가).

### `<Pipeline>` — 가로 단계 박스 (A → B → C)
한 줄짜리 단계 개요. 글 도입부나 절 시작에 "전체 그림" 띄울 때.

```jsx
<Pipeline
  stages={[
    { label: "요청 생성", sub: "프론트" },   // sub 선택 (모노스페이스 작은 글씨)
    { label: "네트워크", sub: "DNS/TCP" },
  ]}
/>
```

### `<Compare>` — 두 항목 나란히 비교
세션 vs JWT, localStorage vs 쿠키처럼 양자 대비. 2열 그리드.

```jsx
<Compare
  items={[
    { title: "방식 A", points: ["요점 1", "요점 2"] },
    { title: "방식 B", points: ["요점 1", "요점 2"] },
  ]}
/>
```
- `points`는 평문 문자열 배열(JSX 불가).

### `<Callout>` — 강조/팁/주의/심화 박스
색으로 종류를 구분. 본문 흐름 중 따로 떼어 강조할 내용.

```jsx
<Callout type="warn" title="제목 (선택)">
  <p className="m-0">내용. 여러 문단이면 <p>를 더 둔다.</p>
</Callout>
```
- `type`: `info`(파랑/참고) | `tip`(초록/팁) | `warn`(노랑/주의) | `deep`(보라/심화). 기본 `info`.
- children은 JSX. 문단은 `<p className="m-0">`로.

### `<Aside>` — 작은 부연/용어 메모
본문 흐름을 끊지 않는 회색 각주. 용어 정의에 특히.

```jsx
<Aside term="ETag">
  설명 문장. <code>코드</code> 가능.
</Aside>
```
- `term`(선택)은 모노스페이스 라벨로 앞에 붙는다. children은 JSX.

---

## 새 글 체크리스트

1. `content/wiki/<slug>.mdx` 생성, 최상단 `metadata`(title/date/description/tags).
2. 도입 문단 → `<Pipeline>` 전체 그림 → 절별 전개(`##`).
3. 각 절: 산문 설명 + 컴포넌트 + 마무리 문단.
4. 글 끝 `## 한 장 요약`을 `<Steps>`로.
5. `npm run build`로 검증 (SSG로 `/wiki/<slug>` 잡히는지 확인).
