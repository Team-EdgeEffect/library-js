import { lazy } from "react";
import { RouteObject } from "react-router";

import { RouteComponent } from "@/component/view/_common/route-component";
import { ReactCustomContextDialogAppContent } from "@/component/view/app-content/react-custom-context-dialog-app-content";
import { ReactDefaultContextDialogAppContent } from "@/component/view/app-content/react-default-context-dialog-app-content";
import { withRouteComponent } from "@/script/util/router-utils";

export const reactAbstractDialogRoutes: ReadonlyArray<RouteObject> = [
  {
    path: "/examples/react-abstract-dialog",
    element: (
      <RouteComponent
        key="/examples/react-abstract-dialog"
        Container={lazy(
          () =>
            import(
              "@/component/view/react-abstract-dialog/_react-abstract-dialog-container"
            )
        )}
      />
    ),
  },
  withRouteComponent({
    AppContent: ReactCustomContextDialogAppContent,
    routes: [
      {
        path: "/examples/react-abstract-dialog/custom",
        element: (
          <RouteComponent
            key="/examples/react-abstract-dialog/custom"
            Container={lazy(
              () =>
                import(
                  "@/component/view/react-abstract-dialog/_react-abstract-dialog-container-with-custom-context"
                )
            )}
          />
        ),
      },
    ],
  }),
  withRouteComponent({
    AppContent: ReactDefaultContextDialogAppContent,
    routes: [
      {
        path: "/examples/react-abstract-dialog/default",
        element: (
          <RouteComponent
            key="/examples/react-abstract-dialog/default"
            Container={lazy(
              () =>
                import(
                  "@/component/view/react-abstract-dialog/_react-abstract-dialog-container-with-default-context"
                )
            )}
          />
        ),
      },
      {
        path: "/examples/react-abstract-dialog/default/external-page",
        element: (
          <RouteComponent
            key="/examples/react-abstract-dialog/default/external-page"
            Container={lazy(
              () =>
                import(
                  "@/component/view/react-abstract-dialog/_dummy-external-page-container"
                )
            )}
          />
        ),
      },
    ],
  }),
];
