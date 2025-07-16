import { Payload } from "@edge-effect/react-tanstack-query-factory";

export type GetProduct = Payload<{
  path: { productId?: string };
}>;

export type GetSearch = Payload<{
  param: { p: string };
}>;
