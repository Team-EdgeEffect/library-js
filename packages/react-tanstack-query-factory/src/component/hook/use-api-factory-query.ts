import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

import {
  UseApiFactoryQueryActions,
  UseApiFactoryQueryProps,
} from "../../script/type/query-factory-query-type";

export const useApiFactoryQuery = <
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType,
>({
  payload,
  options,
  onCreateKeys,
  onRequest,
  queryClient: initialQueryClient,
}: UseApiFactoryQueryProps<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType
>): UseApiFactoryQueryActions<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType
> => {
  const queryClient = useQueryClient(initialQueryClient);

  const query = useQuery<ResponseType, ErrorType>(
    {
      ...options,
      queryKey: onCreateKeys(payload),
      queryFn: async () => await onRequest({ ...payload }, queryClient),
    },
    queryClient
  );

  const queryKey = useMemo(
    () => onCreateKeys(payload),
    [onCreateKeys, payload]
  );

  return {
    ...query,
    queryKey,
    invalidate: useCallback(
      async (invalidatePayload) =>
        queryClient.invalidateQueries({
          queryKey: onCreateKeys(invalidatePayload ?? payload),
        }),
      [onCreateKeys, payload, queryClient]
    ),
    remove: useCallback(
      (removePayload) =>
        queryClient.removeQueries({
          queryKey: onCreateKeys(removePayload ?? payload),
        }),
      [onCreateKeys, payload, queryClient]
    ),
  };
};
