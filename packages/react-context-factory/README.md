# @edge-effect/react-context-factory

[![npm version](https://img.shields.io/npm/v/@edge-effect/react-context-factory)](https://www.npmjs.com/package/@edge-effect/react-context-factory)

## 소개(Description)

전달된 제너릭 타입을 팩토리 패턴을 이용하여 **Context, Provider, Hook**을 한 번에 생성해, React에서 타입 세이프하고 재사용성 높은 context 패턴을 쉽게 구현할 수 있도록 돕는 유틸리티입니다.

복잡한 context boilerplate 및 데이터 타입을 빠르게 통합 해야 하는 경우 적합합니다.

## 설치(Installation)

```bash
npm install @edge-effect/react-context-factory
# 또는
yarn add @edge-effect/react-context-factory
# 또는
pnpm add @edge-effect/react-context-factory
```

## 사용법(Usage)

### 1. 컨텍스트 팩토리 구현 (제너릭 기반, providerComponent 패턴)

```tsx
import { createContextFactory } from "@edge-effect/react-context-factory";
import React, { useState, useMemo } from "react";

// User 타입 정의
type User = { name: string; age: number };

// 컨텍스트 팩토리로 Provider, Hook, Context 객체 생성
export const buildUserContext = () =>
  createContextFactory<
    { user: User; setUser: (u: User) => void },
    { children: React.ReactNode }
  >({
    providerComponent: ({ context }) => {
      const UserContextProvider = ({
        children,
      }: {
        children: React.ReactNode;
      }) => {
        const [user, setUser] = useState<User>({ name: "홍길동", age: 20 });
        const value = useMemo(() => ({ user, setUser }), [user]);
        return <context.Provider value={value}>{children}</context.Provider>;
      };
      return UserContextProvider;
    },
  });

// Context 객체, Provider, Hook 생성
export const UserContext = buildUserContext();
```

### 2. 후크 선언 및 커스터마이즈

```tsx
// 커스터마이즈를 위해 별도 후크로 래핑
export function useUser() {
  return UserContext.use();
}
```

### 3. 앱에서 Provider 제공

```tsx
function App() {
  return (
    <UserContext.Provider>
      <Profile />
    </UserContext.Provider>
  );
}
```

### 4. 하위 컴포넌트에서 후크로 값 사용 및 변경

```tsx
function Profile() {
  const { user, setUser } = useUser();
  return (
    <div>
      <div>이름: {user.name}</div>
      <div>나이: {user.age}</div>
      <button onClick={() => setUser({ ...user, age: user.age + 1 })}>
        나이 한 살 추가
      </button>
    </div>
  );
}
```

## 주요 API

| 함수/컴포넌트              | 설명                                                         |
| -------------------------- | ------------------------------------------------------------ |
| `createContextFactory(fn)` | 전달된 제너릭/초기값 기반으로 Provider와 Hook을 한 번에 생성 |

- 타입 안전성 보장, context value 자동 추론

## 변경 이력(Changelog)

- [CHANGELOG.md](./CHANGELOG.md) 참고

## 라이선스(License)

MIT

## 기여(Contributing)

- 이슈/PR 환영합니다!
