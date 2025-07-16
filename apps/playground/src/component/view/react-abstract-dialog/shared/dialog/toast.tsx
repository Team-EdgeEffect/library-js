import {
  TOAST_DURATION_SHORT,
  ToastProps,
  useDialogActionContext,
} from "@edge-effect/react-abstract-dialog";
import { useEffect } from "react";

export const Toast = ({
  message,
  duration = TOAST_DURATION_SHORT,
}: ToastProps) => {
  const { hideAfter } = useDialogActionContext();

  useEffect(() => {
    hideAfter(duration);
  }, [duration, hideAfter]);

  return (
    <div className="dialog-sample-toast-wrap">
      <h3 className="dialog-sample-dialog-message paper">{message}</h3>
    </div>
  );
};
