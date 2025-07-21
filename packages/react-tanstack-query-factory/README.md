# @edge-effect/react-tanstack-query-factory

[![npm version](https://img.shields.io/npm/v/@edge-effect/react-tanstack-query-factory)](https://www.npmjs.com/package/@edge-effect/react-tanstack-query-factory)

## 소개(Description)

TanStack Query(v5)를 기반으로 **Query와 Mutation을 한 번에 생성**하여 타입 세이프하고 재사용성 높은 API 훅을 쉽게 구현할 수 있도록 돕는 팩토리 유틸리티입니다.

또한 팩토리로 생성한 request 구현부를 언제든 호출 할 수 있습니다.

## 설치(Installation)

```bash
npm install @edge-effect/react-tanstack-query-factory
# 또는
yarn add @edge-effect/react-tanstack-query-factory
# 또는
pnpm add @edge-effect/react-tanstack-query-factory
```

## 사용법(Usage)

### 1. API 팩토리 생성

```tsx
import { createApi, Payload } from "@edge-effect/react-tanstack-query-factory";
import axios from "axios";

// API 요청 타입 정의
type GetProduct = Payload<{
  path: { productId: string };
}>;

type GetSearch = Payload<{
  param: { q: string };
}>;

// 제품 조회 API 생성
export const getProduct = createApi<
  GetProduct["path"], // path 타입
  GetProduct["param"], // param 타입 (undefined)
  GetProduct["body"], // body 타입 (undefined)
  { description: string } // 응답 타입
>({
  onCreateKeys: (payload) => ["getProduct", payload],
  onRequest: async ({ path }) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/${path.productId}`
    );
    return data;
  },
});

// 검색 API 훅 생성
export const getSearch = createApi<
  GetSearch["path"], // path 타입 (undefined)
  GetSearch["param"], // param 타입
  GetSearch["body"], // body 타입 (undefined)
  { products: Array<{ id: number; title: string }> }
>({
  onCreateKeys: (payload) => ["getSearch", payload],
  onRequest: async ({ param }) => {
    const { data } = await axios.get("https://dummyjson.com/products/search", {
      params: param,
    });
    return data;
  },
});
```

### 2. 컴포넌트에서 Query 사용

```tsx
import { getProduct } from "./api/product-apis";

const ProductDetail = () => {
  // Query 사용
  const { data, isFetching, error } = getProduct.useQuery({
    path: { productId: "1" },
  });

  if (isFetching) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      <h2>제품 상세</h2>
      <p>{data?.description}</p>
    </div>
  );
};
```

### 3. 컴포넌트에서 Mutation 사용

```tsx
import { getProduct } from "./api/product-apis";

const ProductActions = () => {
  // Mutation 사용
  const { mutateAsync, isLoading } = getProduct.useMutation();

  const handleRefresh = async () => {
    try {
      const result = await mutateAsync({ path: { productId: "1" } });
      console.log("요청 완료:", result.description);
    } catch (error) {
      console.error("요청 실패:", error);
    }
  };

  return (
    <button onClick={handleRefresh} disabled={isLoading}>
      {isLoading ? "요청 중..." : undefined}
    </button>
  );
};
```

### 4. 직접 API 호출

```tsx
import { getProduct } from "./api/product-apis";

const DirectApiCall = () => {
  const handleDirectCall = async () => {
    try {
      const result = await getProduct.request({ path: { productId: "1" } });
      console.log("직접 호출 결과:", result.description);
    } catch (error) {
      console.error("직접 호출 실패:", error);
    }
  };

  return <button onClick={handleDirectCall}>직접 API 호출</button>;
};
```

### 5. 쿼리 무효화 및 제거

```tsx
import { getProduct } from "./api/product-apis";
import { useQueryClient } from "@tanstack/react-query";

const CacheManagement = () => {
  const queryClient = useQueryClient();

  // 데이터 렌더링을 위한 쿼리
  const { data, isFetching, invalidate } = getProduct.useQuery({
    path: { productId: "1" },
  });

  // 사용된 페이로드 기반으로 쿼리 관리
  const handleInvalidate = async () => {
    await invalidate();
  };

  // getQueryKey 를 기반으로 동적 쿼리 관리
  const handleInvalidateWithKey = async () => {
    const queryKey = getProduct.getQueryKey({ path: { productId: "1" } });
    await queryClient.invalidateQueries({ queryKey });
  };

  return (
    <div>
      <h3>제품 정보</h3>
      {isFetching ? (
        <p>로딩 중...</p>
      ) : (
        <div>
          <p>제품 설명: {data?.description}</p>
          <p>제품 ID: {data?.id}</p>
          <p>제품명: {data?.title}</p>
        </div>
      )}

      <h3>쿼리 상태</h3>
      <button onClick={handleInvalidate}>쿼리 무효화</button>
      <button onClick={handleInvalidateWithKey}>키로 쿼리 무효화</button>
    </div>
  );
};
```

## 주요 API

### `createApi<PathType, ParamType, BodyType, ResponseType, ErrorType>(args)`

Query와 Mutation을 한 번에 생성하는 팩토리 함수입니다.

#### 매개변수

| 매개변수       | 설명                        |
| -------------- | --------------------------- |
| `PathType`     | URL 경로 파라미터 타입      |
| `ParamType`    | 쿼리 파라미터 타입          |
| `BodyType`     | 요청 본문 타입              |
| `ResponseType` | 응답 데이터 타입            |
| `ErrorType`    | 에러 타입 (기본값: `Error`) |

#### 반환값

| 속성                                                    | 설명                              |
| ------------------------------------------------------- | --------------------------------- |
| `useQuery(payload: { path?, param?, body? }, options?)` | TanStack Query의 `useQuery` 훅    |
| `useMutation(options?)`                                 | TanStack Query의 `useMutation` 훅 |
| `getQueryKey(payload?: { path?, param?, body? })`       | 쿼리 키 생성 함수                 |
| `request(payload: { path?, param?, body? })`            | 직접 API 호출 함수                |

### `Payload<Struct>`

API 요청 페이로드의 타입을 정의하는 유틸리티 타입입니다.

해당 타입이 없더라도 API 요청을 생성 할 수 있습니다.

```tsx
type MyApi = Payload<{
  path: { id: string };
  param: { page: number };
  body: { name: string };
}>;
```

## 고급 사용법

### 1. 기본 옵션 설정

```tsx
export const getProduct = createApi<
  GetProduct["path"],
  GetProduct["param"],
  GetProduct["body"],
  { description: string }
>({
  onCreateKeys: (payload) => ["getProduct", payload],
  onRequest: async ({ path }) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/${path.productId}`
    );
    return data;
  },
  // 기본 Query 옵션
  queryOptions: {
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 10 * 60 * 1000, // 10분
  },
  // 기본 Mutation 옵션
  mutationOptions: {
    onSuccess: (data) => {
      console.log("Mutation 성공:", data);
    },
    onError: (error) => {
      console.error("Mutation 실패:", error);
    },
  },
});
```

### 2. 커스텀 QueryClient 사용

```tsx
import { QueryClient } from "@tanstack/react-query";

const customQueryClient = new QueryClient();

export const getProduct = createApi<
  GetProduct["path"],
  GetProduct["param"],
  GetProduct["body"],
  { description: string }
>({
  queryClient: customQueryClient,
  onCreateKeys: (payload) => ["getProduct", payload],
  onRequest: async ({ path }) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/${path.productId}`
    );
    return data;
  },
});
```

## 변경 이력(Changelog)

- [CHANGELOG.md](./CHANGELOG.md) 참고

## 라이선스(License)

MIT

## 기여(Contributing)

- 이슈/PR 환영합니다!
