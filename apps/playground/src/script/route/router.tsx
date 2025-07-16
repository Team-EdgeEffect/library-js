import { createBrowserRouter, RouteObject } from "react-router";

import { AppContent } from "@/component/app-content";
import ErrorContainer from "@/component/view/_common/error-container";
import NotFoundContainer from "@/component/view/_common/not-found-container";
import { etcRoutes } from "@/script/route/etc-routes";
import { reactAbstractDialogRoutes } from "@/script/route/react-abstract-dialog-routes";
import { withRouteComponent } from "@/script/util/router-utils";

let routes: Array<RouteObject> = [
  {
    path: "*",
    element: <NotFoundContainer />,
  },
  {
    path: "/error",
    element: <ErrorContainer />,
  },
];
routes = routes.concat(etcRoutes);
routes = routes.concat(reactAbstractDialogRoutes);

export const router = createBrowserRouter([
  withRouteComponent({ AppContent, routes }),
]);
