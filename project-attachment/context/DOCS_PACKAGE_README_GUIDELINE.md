# 패키지(라이브러리) README 작성 가이드라인

## 가이드라인 참고사항

- 실제 기능을 기반으로 설명 해야 합니다.
- 가능하다면 표 등을 통해 속성에 대한 설명을 가이드 합니다.

## 항목별 가이드라인

- 항목을 아래와 같이 참고해서 구성 합니다.

### 1. 패키지명 및 배지

```
# @edge-effect/common-cli
[![npm version](https://img.shields.io/npm/v/@edge-effect/common-cli)](https://www.npmjs.com/package/@edge-effect/common-cli)
```

### 2. 소개(Description)

- 패키지의 목적, 주요 기능, 어떤 문제를 해결하는지 간단히 설명

### 3. 설치(Installation)

- 설치에서 종속성에 추가 또는 npx 등으로 실행하는 과정에 대해 설명 합니다.

```
npm install @edge-effect/common-cli
# 또는
yarn add @edge-effect/common-cli
# 또는
pnpm add @edge-effect/common-cli
```

### 4. 사용법(Usage)

- 기본 사용 예제 코드
- CLI라면 명령어 예시, 라이브러리라면 import 예시

```
import { something } from '@edge-effect/common-cli';

something();
```

### 5. 주요 API/옵션 설명

- 함수, 옵션, CLI 명령어 등 주요 기능별 사용법/설명

### 6. 변경 이력(Changelog)

- CHANGELOG.md 링크 또는 주요 변경점 요약

### 7. 라이선스(License)

- 예: MIT

### 8. 기여(Contributing)

- 기여 방법, 이슈/PR 안내 등

---

## 예시 템플릿

```
# @edge-effect/common-cli
[![npm version](https://img.shields.io/npm/v/@edge-effect/common-cli)](https://www.npmjs.com/package/@edge-effect/common-cli)
[![GitHub package](https://img.shields.io/badge/github-packages-available-brightgreen)](https://github.com/Team-EdgeEffect/library-js/pkgs/npm/@edge-effect%2Fcommon-cli)

## 소개
간단한 CLI 도구로, edge-effect 프로젝트의 개발 생산성을 높여줍니다.

## 설치
```

npm install @edge-effect/common-cli

```

## 사용법
```

npx @edge-effect/common-cli --help

```

## 주요 기능
- 프로젝트 템플릿 생성
- 자동 빌드/배포 스크립트

## 변경 이력
- [CHANGELOG.md](./CHANGELOG.md) 참고

## 라이선스
MIT

## 기여
이슈/PR 환영합니다!
```
