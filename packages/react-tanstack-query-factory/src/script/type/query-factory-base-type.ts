import {
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

import { UseApiFactoryMutationActions } from "./query-factory-mutation-type";
import { UseApiFactoryQueryActions } from "./query-factory-query-type";

export type ApiFactoryHookArgs<PathType, ParamType, BodyType, ResponseType> = {
  queryClient?: QueryClient;
  onRequest: (
    payload: ApiRequestPayload<PathType, ParamType, BodyType>,
    queryClient: QueryClient | undefined
  ) => Promise<ResponseType> | ResponseType;
  onCreateKeys: (
    payload?: Partial<ApiRequestPayload<PathType, ParamType, BodyType>>
  ) => Array<unknown>;
};

export type CreateApiHookReturn<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType,
> = {
  useQuery: (
    payload: ApiRequestPayload<PathType, ParamType, BodyType>,
    options?: Partial<UseQueryOptions<ResponseType, ErrorType>>
  ) => UseApiFactoryQueryActions<
    PathType,
    ParamType,
    BodyType,
    ResponseType,
    ErrorType
  >;
  useMutation: (
    options?: Partial<
      UseMutationOptions<
        ResponseType,
        ErrorType,
        ApiRequestPayload<PathType, ParamType, BodyType>
      >
    >
  ) => UseApiFactoryMutationActions<
    PathType,
    ParamType,
    BodyType,
    ResponseType,
    ErrorType
  >;
  getQueryKey: (
    payload?:
      | Partial<ApiRequestPayload<PathType, ParamType, BodyType>>
      | undefined
  ) => Array<unknown>;
  request: (
    payload: ApiRequestPayload<PathType, ParamType, BodyType>
  ) => Promise<ResponseType> | ResponseType;
};

export type CreateApiHookArgs<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType,
> = {
  queryOptions?: Partial<
    UseQueryOptions<ResponseType, ErrorType, ResponseType>
  >;
  mutationOptions?: UseMutationOptions<
    ResponseType,
    ErrorType,
    ApiRequestPayload<PathType, ParamType, BodyType>
  >;
} & ApiFactoryHookArgs<PathType, ParamType, BodyType, ResponseType>;

export type ApiRequestPayload<PathType, ParamType, BodyType> =
  (PathType extends undefined ? { path?: PathType } : { path: PathType }) &
    (ParamType extends undefined
      ? { param?: ParamType }
      : { param: ParamType }) &
    (BodyType extends undefined ? { body?: BodyType } : { body: BodyType });

export type ApiFactoryHookActions<PathType, ParamType, BodyType> = {
  queryKey: Array<unknown>;
  invalidate: (
    payload?: ApiRequestPayload<PathType, ParamType, BodyType> | undefined
  ) => Promise<void>;
  remove: (
    payload?: ApiRequestPayload<PathType, ParamType, BodyType> | undefined
  ) => void;
};
