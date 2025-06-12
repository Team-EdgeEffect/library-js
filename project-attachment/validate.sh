#!/bin/bash
# 변경된 패키지에 validate 검사를 실행합니다.
# 해당 패키지에 다음 스크립트가 구현되어 있어야 합니다.
# - test
# - lint

set -e

echo "밸리데이션을 진행합니다..."
echo "대상이 될 패키지를 조회합니다..."
CHANGED_PACKAGES=$(bash ./project-attachment/changed-targets.sh 2>/dev/null)
if [ -z "$CHANGED_PACKAGES" ]; then
  echo "✅ 변경된 패키지가 없습니다. 파이프라인 작업을 건너 뜁니다."
  exit 0
fi

echo "다음 대상에 밸리데이션을 진행합니다..."
echo $CHANGED_PACKAGES

for PACKAGE_PATH in $CHANGED_PACKAGES; do
  PACKAGE_NAME=$(basename "$PACKAGE_PATH")
  echo "👉 $PACKAGE_NAME..."
  
  HAS_LINT=$(node -p "require('$PACKAGE_PATH/package.json').scripts?.lint ? 'yes' : 'no'")
  HAS_TEST=$(node -p "require('$PACKAGE_PATH/package.json').scripts?.test ? 'yes' : 'no'")
  if [ "$HAS_LINT" = "yes" ] && [ "$HAS_TEST" = "yes" ]; then
    pnpm --filter "$PACKAGE_NAME" run lint
    pnpm --filter "$PACKAGE_NAME" run test
  else
    echo "⛔️ $PACKAGE_NAME 패키지에 밸리데이션 필수 스크립트(lint, test)가 없습니다. 스크립트를 구성해주세요."
    exit 1
  fi
done

echo "✅ 밸리데이션 검사에 성공 했습니다."