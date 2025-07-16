import { AlertProps, ToastProps } from "@edge-effect/react-abstract-dialog";
import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router";

import { CustomDialogContext } from "@/component/context/custom-dialog-context";
import { useReactAbstractDialogProperty } from "@/component/hook/use-react-abstract-dialog-property";
import { Alert } from "@/component/view/react-abstract-dialog/shared/dialog/alert";
import {
  ExtendedConfirm,
  ExtendedConfirmProps,
} from "@/component/view/react-abstract-dialog/shared/dialog/extended-confirm";
import { Toast } from "@/component/view/react-abstract-dialog/shared/dialog/toast";
import { ReactDialogPropertySection } from "@/component/view/react-abstract-dialog/shared/react-abstract-dialog-property-section";
import { ToastSection } from "@/component/view/react-abstract-dialog/shared/toast-section";

export const ReactCustomContextDialogAppContent = () => {
  const { dialogContextProviderProps, ...propertyProps } =
    useReactAbstractDialogProperty<
      ExtendedConfirmProps,
      AlertProps,
      ToastProps
    >();

  return (
    <Fragment>
      <CustomDialogContext.Provider
        Alert={Alert}
        Confirm={ExtendedConfirm}
        Toast={Toast}
        ToastContainer={ToastSection}
        {...dialogContextProviderProps}>
        <Outlet />
      </CustomDialogContext.Provider>
      <ul>
        <li>
          <ReactDialogPropertySection {...propertyProps} />
        </li>
      </ul>
    </Fragment>
  );
};
