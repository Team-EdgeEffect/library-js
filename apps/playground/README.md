# Playground

- 이곳에 packages/\* 에 존재하는 패키지들에 대한 예제를 구성 합니다.

# How to run

- pnpm workspace 를 사용하므로 root 에서 pnpm install 을 진행하세요.

```bash
pnpm install --frozen-lockfile
```

# 제가 만든 패키지의 예제를 추가하고 싶어요

- 아래와 같이 추가 작업을 진행하세요.
- [view](./src/component/view) 폴더에 해당 패키지의 예제 관심사 폴더를 추가하고 컨테이너를 만들고 하위 작업을 진행하세요.
- 해당 컨테이너를 [home-container](<./src/component/view/(etc)/_home-container.tsx>), [router](./src/script/route/router.tsx) 에 추가 하세요.
  - 관심사에 대한 네비게이션 영역이 많은 경우 routes 파일을 분리하세요.
