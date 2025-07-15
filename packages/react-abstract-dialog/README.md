# @edge-effect/react-abstract-dialog

[![npm version](https://img.shields.io/npm/v/@edge-effect/react-abstract-dialog)](https://www.npmjs.com/package/@edge-effect/react-abstract-dialog)

## 소개

React 환경에서 다이얼로그(confirm, alert, toast, custom dialog)를 Promise 기반으로 관리할 수 있는 컨텍스트 라이브러리입니다. 복잡한 상태 관리 없이 동기적으로 다이얼로그를 제어할 수 있습니다.

## 설치

```bash
npm install @edge-effect/react-abstract-dialog
# 또는
yarn add @edge-effect/react-abstract-dialog
# 또는
pnpm add @edge-effect/react-abstract-dialog
```

## 사용법

### 1. Provider 설정

```tsx
import { DialogContextProvider } from "@edge-effect/react-abstract-dialog";

<DialogContextProvider>{/* App 컴포넌트들 */}</DialogContextProvider>;
```

### 2. 다이얼로그 컴포넌트 전달

```tsx
import Confirm from "./component/popup/confirm";
import Alert from "./component/popup/alert";
import Toast from "./component/popup/toast";

<DialogContextProvider Confirm={Confirm} Alert={Alert} Toast={Toast}>
  {/* App 컴포넌트들 */}
</DialogContextProvider>;
```

### 3. 다이얼로그 사용

```tsx
import { useDialogContext } from "@edge-effect/react-abstract-dialog";

const MyComponent = () => {
  const { confirm, alert, toast, showDialog } = useDialogContext();

  const handleConfirm = async () => {
    const result = await confirm({
      title: "확인",
      message: "정말 삭제하시겠습니까?",
      textYes: "삭제",
      textNo: "취소",
    });
    if (result === "positive") {
      // 사용자가 '삭제' 선택
    }
  };

  const handleAlert = async () => {
    await alert({
      title: "알림",
      message: "처리가 완료되었습니다.",
      textOk: "확인",
    });
  };

  const handleToast = () => {
    toast({
      message: "토스트 메시지입니다.",
      duration: 3000,
    });
  };

  return (
    <div>
      <button onClick={handleConfirm}>확인 다이얼로그</button>
      <button onClick={handleAlert}>알림 다이얼로그</button>
      <button onClick={handleToast}>토스트</button>
    </div>
  );
};
```

### 4. 커스텀 다이얼로그

```tsx
import { useDialogActionContext } from "@edge-effect/react-abstract-dialog";

const MyCustomDialog = ({ choices }) => {
  const { hide } = useDialogActionContext();

  return (
    <div className="custom-dialog">
      <h2>선택해주세요</h2>
      {choices.map((choice) => (
        <button key={choice.id} onClick={() => hide(choice)}>
          {choice.name}
        </button>
      ))}
      <button onClick={() => hide()}>취소</button>
    </div>
  );
};

// 사용
const { showDialog } = useDialogContext();
const result = await showDialog(<MyCustomDialog choices={choices} />);
```

## 주요 API

### DialogContextProvider Props

| Prop                        | 타입                          | 기본값                          | 설명                           |
| --------------------------- | ----------------------------- | ------------------------------- | ------------------------------ |
| `withHistory`               | `boolean`                     | `false`                         | 브라우저 히스토리 연동         |
| `historySearchParamKey`     | `string`                      | `"dialog"`                      | 히스토리 URL 파라미터 키       |
| `visibleMultipleDialog`     | `boolean`                     | `true`                          | 여러 다이얼로그 동시 표시 여부 |
| `DialogContainer`           | `ComponentType`               | `DefaultDialogContentContainer` | 다이얼로그 컨테이너 컴포넌트   |
| `ToastContainer`            | `ComponentType`               | `DefaultDialogContentContainer` | 토스트 컨테이너 컴포넌트       |
| `Confirm`                   | `ComponentType<ConfirmProps>` | -                               | 확인 다이얼로그 컴포넌트       |
| `Alert`                     | `ComponentType<AlertProps>`   | -                               | 알림 다이얼로그 컴포넌트       |
| `Toast`                     | `ComponentType<ToastProps>`   | -                               | 토스트 컴포넌트                |
| `onInterceptScrollBlocking` | `function`                    | -                               | 스크롤 차단 인터셉트 함수      |

### useDialogContext 반환값

| 메서드                              | 반환 타입                                        | 설명                   |
| ----------------------------------- | ------------------------------------------------ | ---------------------- |
| `confirm(props, options?)`          | `Promise<"positive" \| "negative" \| undefined>` | 확인 다이얼로그 표시   |
| `alert(props, options?)`            | `Promise<"ok" \| undefined>`                     | 알림 다이얼로그 표시   |
| `toast(props, options?)`            | `void`                                           | 토스트 표시            |
| `showDialog(element, options?)`     | `Promise<{ dialog, promise }>`                   | 커스텀 다이얼로그 표시 |
| `hideDialog(id, options?)`          | `Promise<void>`                                  | 특정 다이얼로그 숨김   |
| `hideDialogAll(checker?, options?)` | `Promise<void>`                                  | 모든 다이얼로그 숨김   |
| `findDialogById(id)`                | `Dialog \| undefined`                            | ID로 다이얼로그 찾기   |

### useDialogActionContext 반환값

| 메서드                   | 설명                               |
| ------------------------ | ---------------------------------- |
| `hide(result?)`          | 다이얼로그 숨김 (결과값 전달 가능) |
| `hideAfter(duration)`    | 지정 시간 후 다이얼로그 숨김       |
| `doNavigate(navigateFn)` | 히스토리 정리 후 네비게이션        |

### 타입 정의

```tsx
// ConfirmProps
interface ConfirmProps {
  title: string;
  message: string;
  content?: ReactNode;
  textYes?: string;
  textNo?: string;
  cancelable?: boolean;
  description?: string;
}

// AlertProps
interface AlertProps {
  title: string;
  message: string;
  content?: ReactNode;
  textOk?: string;
  cancelable?: boolean;
  description?: string;
}

// ToastProps
interface ToastProps {
  message: ReactNode;
  duration?: number;
}

// DialogOptions
interface DialogOptions {
  ignoreHistory?: boolean;
  unique?: string;
  dialogType?: "confirm" | "alert" | "toast" | "custom";
  onDismiss?: () => void;
}
```

## 변경 이력

- [CHANGELOG.md](./CHANGELOG.md) 참고

## 라이선스

MIT

## 기여

이슈/PR 환영합니다!
