import React, { ReactNode } from "react";

import { CreateContextProviderArgs } from "../type/context-factory-type";

type BaseContextProps = {
  children?: ReactNode;
};

type CreateContextArgs<
  ContextActions,
  ContextProps extends BaseContextProps,
> = {
  providerComponent: ({
    context,
  }: CreateContextProviderArgs<ContextActions>) => (
    props: ContextProps
  ) => React.JSX.Element;
};
export const createContext = <
  ContextActions,
  ContextProps extends BaseContextProps,
>({
  providerComponent,
}: CreateContextArgs<ContextActions, ContextProps>) => {
  const context = React.createContext<ContextActions>({} as ContextActions);

  return {
    Context: context,
    Provider: providerComponent({ context }),
    Consumer: context.Consumer,
    use: () => React.useContext(context) as ContextActions,
  };
};
