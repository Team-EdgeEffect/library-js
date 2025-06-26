# 1차 정리된 내용

## 워크플로우 구분

### 밸리데이션

- PR 생성
  - test 및 lint 실행 해야함. 루트 패키지의 validate-targets 이용.

### 배포

- 푸쉬 기반
  - main
  - 빌드는 루트 패키지의 build-targets 이용
  - 배포는 루트 패키지의 publish 이용
    - 버전의 경우 conventional commit 의 fix, feat, feat! 을 이용(major, minor, patch)
  - lerna 기반으로 publish

### 릴리즈노트

- 태그 푸쉬
  - 모든 태그에 대해서 릴리즈 노트 연결

## 배포 여정

- main 에 PR 생성 > test
- PR merged > 푸쉬 기반 워크플로우 동작
- 이후 릴리즈노트 워크플로우 동작
- canary 배포의 경우 local 에서 진행

## 기타

- 파이프라인 캐시
- 루트, 패키지별
  - node_modules
  - turbo
- 패키지는 packages/a, packages/b 형태로 배치될것임
- 모든 패키지는 lint, test 스크립트를 구현함 (type-check 는 검토)
  - 최초에 test 스크립트는 빌드로 대체함
- 가능하다면 변경이된 패키지들만 PR에 의한 밸리데이션 체크 및 푸쉬에 의한 배포대상들만 해당되면 좋을듯 함.

## 후속

- 이후 메뉴얼 워크플로 생성
