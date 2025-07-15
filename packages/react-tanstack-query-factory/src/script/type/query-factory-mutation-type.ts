import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import {
  ApiFactoryHookActions,
  ApiFactoryHookArgs,
  ApiRequestPayload,
} from "./query-factory-base-type";

export type UseApiFactoryMutationProps<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType,
> = ApiFactoryHookArgs<PathType, ParamType, BodyType, ResponseType> & {
  options?: Partial<
    UseMutationOptions<
      ResponseType,
      ErrorType,
      ApiRequestPayload<PathType, ParamType, BodyType>
    >
  >;
};

export type UseApiFactoryMutationActions<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType,
> = ReturnType<
  typeof useMutation<
    ResponseType,
    ErrorType,
    ApiRequestPayload<PathType, ParamType, BodyType>
  >
> &
  ApiFactoryHookActions<PathType, ParamType, BodyType>;

export type UseApiFactoryMutation<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType,
> = (
  props: UseApiFactoryMutationProps<
    PathType,
    ParamType,
    BodyType,
    ResponseType,
    ErrorType
  >
) => UseApiFactoryMutationActions<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType
>;
