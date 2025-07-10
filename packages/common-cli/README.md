# @edge-effect/common-cli

[![npm version](https://img.shields.io/npm/v/@edge-effect/common-cli)](https://www.npmjs.com/package/@edge-effect/common-cli)
[![GitHub package](https://img.shields.io/badge/github-packages-available-brightgreen)](https://github.com/Team-EdgeEffect/library-js/pkgs/npm/@edge-effect%2Fcommon-cli)

## 소개(Description)

edge-effect 프로젝트의 **패키지/앱 템플릿 생성**을 위한 CLI 도구입니다.

- 새로운 라이브러리(`lib`) 또는 React 앱(`react`) 템플릿을 손쉽게 생성할 수 있습니다.
- 생성된 템플릿에는 타입스크립트, SWC, 기본 빌드/테스트/배포 스크립트가 포함됩니다.
- (참고) 빌드/배포 자동화, 기타 기능은 추후 추가될 수 있습니다.

## 설치 및 실행(Installation & Usage)

```bash
npx @edge-effect/common-cli create-package --help
```

또는

```bash
npm install -g @edge-effect/common-cli
common-cli create-package --help
```

## 사용 예시(Usage)

```bash
npx @edge-effect/common-cli create-package --type lib --project-name my-lib --project-description "설명" --yes
```

- 자세한 옵션은 아래 표와 `--help` 참고

## 주요 명령어 및 옵션(API/Options)

### create-package

| 옵션(Short/Long)               | 파라미터                 | 필수 | 기본값                                                         | 설명                                   |
| ------------------------------ | ------------------------ | ---- | -------------------------------------------------------------- | -------------------------------------- |
| `-t, --type`                   | `<type>`                 | ✅   | 없음                                                           | 패키지 타입 선택 (`lib`, `react`)      |
| `-d, --dest-dir`               | `<dest-dir>`             |      | 현재 경로                                                      | 패키지 생성 루트(워크스페이스) 경로    |
| `--pa, --post-action`          | `<post-action>`          |      | 없음                                                           | 생성 후 실행할 액션(호출 위치 기준)    |
| `--pta, --post-target-action`  | `<post-target-action>`   |      | 없음                                                           | 생성 후 실행할 액션(outputDir 기준)    |
| `--pn, --project-name`         | `<project-name>`         | ✅   | 없음                                                           | 프로젝트 이름(폴더명, kebab-case 추천) |
| `--pd, --project-description`  | `<project-description>`  | ✅   | 없음                                                           | 프로젝트 설명                          |
| `--pgu, --project-git-url`     | `<project-git-url>`      |      | `https://github.com/Team-EdgeEffect/library-js`                | 프로젝트 Git 주소                      |
| `--pkg-n, --package-name`      | `<package-name>`         |      | `{project-name}` 또는 `@{project-organization}/{project-name}` | 패키지(모듈)명                         |
| `--po, --project-organization` | `<project-organization>` |      | 없음                                                           | 프로젝트 조직 이름                     |
| `--an, --author-name`          | `<author-name>`          |      | `dark1451`                                                     | author 이름                            |
| `--ae, --author-email`         | `<author-email>`         |      | `dark1451@gmail.com`                                           | author 이메일                          |
| `--au, --author-url`           | `<author-url>`           |      | `https://github.com/dark1451`                                  | author URL                             |
| `--ts, --tsconfig`             | `<tsconfig>`             |      | 없음                                                           | 사용할 tsconfig.json 경로              |
| `--ts-type, --tsconfig-type`   | `<tsconfig-type>`        |      | 없음                                                           | type 빌드용 tsconfig.json 경로         |
| `--swc-cjs`                    | `<swc-cjs>`              |      | 없음                                                           | swc cjs 빌드용 파일 경로               |
| `--swc-esm`                    | `<swc-esm>`              |      | 없음                                                           | swc esm 빌드용 파일 경로               |
| `--cp, --can-publish`          |                          |      | `false`                                                        | 배포 가능한 패키지 여부                |
| `--wi, --without-install`      |                          |      | `false`                                                        | 기본 종속성 설치 생략                  |
| `-y, --yes`                    |                          |      | `false`                                                        | 모든 대화형 입력에 기본값 사용         |

- 기타 옵션 및 상세 설명은 `--help` 옵션으로 확인할 수 있습니다.

## 변경 이력(Changelog)

- [CHANGELOG.md](./CHANGELOG.md) 참고

## 라이선스(License)

MIT

## 기여(Contributing)

- 이슈/PR 환영합니다!
- 코드 컨벤션, 기여 가이드 등은 [CONTRIBUTING.md](./CONTRIBUTING.md) 참고(존재 시)

```

```
