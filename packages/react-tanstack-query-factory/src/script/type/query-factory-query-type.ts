import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import {
  ApiFactoryHookActions,
  ApiFactoryHookArgs,
  ApiRequestPayload,
} from "./query-factory-base-type";

export type UseApiFactoryQueryProps<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType,
> = ApiFactoryHookArgs<PathType, ParamType, BodyType, ResponseType> & {
  payload: ApiRequestPayload<PathType, ParamType, BodyType>;
  options?: Partial<UseQueryOptions<ResponseType, ErrorType>>;
};

export type UseApiFactoryQueryActions<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType,
> = ReturnType<typeof useQuery<ResponseType, ErrorType>> &
  ApiFactoryHookActions<PathType, ParamType, BodyType>;

export type UseApiFactoryQuery<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType,
> = (
  props: UseApiFactoryQueryProps<
    PathType,
    ParamType,
    BodyType,
    ResponseType,
    ErrorType
  >
) => UseApiFactoryQueryActions<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType
>;
