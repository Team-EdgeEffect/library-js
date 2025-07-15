import { useApiFactoryMutation } from "../../component/hook/use-api-factory-mutation";
import { useApiFactoryQuery } from "../../component/hook/use-api-factory-query";
import {
  CreateApiHookArgs,
  CreateApiHookReturn,
} from "../type/query-factory-base-type";

export const createApiHook = <
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType = Error,
>(
  args: CreateApiHookArgs<
    PathType,
    ParamType,
    BodyType,
    ResponseType,
    ErrorType
  >
): CreateApiHookReturn<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType
> => {
  const {
    queryOptions,
    mutationOptions,
    onCreateKeys,
    onRequest,
    ...apiFactoryHookArgs
  } = args;
  return {
    useQuery: (payload, options) =>
      useApiFactoryQuery({
        payload,
        options: { ...queryOptions, ...options },
        onCreateKeys,
        onRequest,
        ...apiFactoryHookArgs,
      }),
    useMutation: (options) =>
      useApiFactoryMutation({
        options: { ...mutationOptions, ...options },
        onCreateKeys,
        onRequest,
        ...apiFactoryHookArgs,
      }),
    getQueryKey: (payload) => onCreateKeys(payload),
    request: async (payload) => await onRequest(payload, undefined),
  };
};
