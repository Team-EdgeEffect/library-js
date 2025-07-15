import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

import { ApiRequestPayload } from "../../script/type/query-factory-base-type";
import {
  UseApiFactoryMutationActions,
  UseApiFactoryMutationProps,
} from "../../script/type/query-factory-mutation-type";

export const useApiFactoryMutation = <
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType,
>({
  options,
  onCreateKeys,
  onRequest,
  queryClient: initialQueryClient,
}: UseApiFactoryMutationProps<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType
>): UseApiFactoryMutationActions<
  PathType,
  ParamType,
  BodyType,
  ResponseType,
  ErrorType
> => {
  const defaultQueryClient = useQueryClient();
  const queryClient = initialQueryClient ?? defaultQueryClient;

  const mutation = useMutation<
    ResponseType,
    ErrorType,
    ApiRequestPayload<PathType, ParamType, BodyType>
  >({
    mutationFn: async (payload) => await onRequest(payload, queryClient),
    mutationKey: onCreateKeys(),
    ...options,
  });

  const queryKey = useMemo(() => onCreateKeys(), [onCreateKeys]);

  return {
    ...mutation,
    queryKey,
    invalidate: useCallback(
      async (payload) =>
        queryClient.invalidateQueries({ queryKey: onCreateKeys(payload) }),
      [onCreateKeys, queryClient]
    ),
    remove: useCallback(
      (payload) =>
        queryClient.removeQueries({ queryKey: onCreateKeys(payload) }),
      [onCreateKeys, queryClient]
    ),
  };
};
