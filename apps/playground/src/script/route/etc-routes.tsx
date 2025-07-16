import { lazy } from "react";
import { RouteObject } from "react-router";

import { RouteComponent } from "@/component/view/_common/route-component";

export const etcRoutes: ReadonlyArray<RouteObject> = [
  {
    path: "/",
    element: (
      <RouteComponent
        key="/"
        Container={lazy(() => import("@/component/view/(etc)/_home-container"))}
      />
    ),
  },
  // react-tanstack-query-factory
  {
    path: "/examples/react-tanstack-query-factory",
    element: (
      <RouteComponent
        key="/examples/react-tanstack-query-factory"
        Container={lazy(
          () =>
            import(
              "@/component/view/react-tanstack-query-factory/_react-tanstack-query-factory-container"
            )
        )}
      />
    ),
  },
];
