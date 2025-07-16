import { ComponentType } from "react";
import { RouteObject } from "react-router";

import { ErrorHandler } from "@/component/view/_common/error-handler";

export const withChildrenRouteErrorElement = (
  routes: Array<RouteObject> | ReadonlyArray<RouteObject>
) => {
  return routes.map((route) => {
    if (route.errorElement) {
      return route;
    } else {
      return {
        ...route,
        errorElement: <ErrorHandler />,
      };
    }
  });
};

export const withRouteComponent = ({
  AppContent,
  routes,
}: {
  AppContent: ComponentType;
  routes: Array<RouteObject> | ReadonlyArray<RouteObject>;
}) => {
  return {
    Component: AppContent,
    children: withChildrenRouteErrorElement(routes),
  };
};
