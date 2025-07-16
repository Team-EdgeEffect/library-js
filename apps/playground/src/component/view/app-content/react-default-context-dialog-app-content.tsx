import { DialogContext } from "@edge-effect/react-abstract-dialog";
import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router";

import { useReactAbstractDialogProperty } from "@/component/hook/use-react-abstract-dialog-property";
import { Alert } from "@/component/view/react-abstract-dialog/shared/dialog/alert";
import { Confirm } from "@/component/view/react-abstract-dialog/shared/dialog/confirm";
import { Toast } from "@/component/view/react-abstract-dialog/shared/dialog/toast";
import { ReactDialogPropertySection } from "@/component/view/react-abstract-dialog/shared/react-abstract-dialog-property-section";
import { ToastSection } from "@/component/view/react-abstract-dialog/shared/toast-section";

export const ReactDefaultContextDialogAppContent = () => {
  const { dialogContextProviderProps, ...propertyProps } =
    useReactAbstractDialogProperty();

  return (
    <Fragment>
      <DialogContext.Provider
        Alert={Alert}
        Confirm={Confirm}
        Toast={Toast}
        ToastContainer={ToastSection}
        {...dialogContextProviderProps}>
        <Outlet />
      </DialogContext.Provider>
      <ul>
        <li>
          <ReactDialogPropertySection {...propertyProps} />
        </li>
      </ul>
    </Fragment>
  );
};
