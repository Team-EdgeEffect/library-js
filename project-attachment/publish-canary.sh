#!/bin/bash
# 특정 패키지 하나를 canary 배포합니다.

set -e

PACKAGE_NAME="$1"

if [ -z "$PACKAGE_NAME" ]; then
  echo "⛔️ 패키지 이름(PACKAGE_NAME)을 인자로 전달 해주세요."
  echo "예) pnpm publish-canary my-test-package"
  exit 1
fi

pnpm --filter "$PACKAGE_NAME" run build
lerna publish --canary --force-publish "$PACKAGE_NAME" --preid canary --yes

echo "✅ canary 배포에 성공 했습니다."