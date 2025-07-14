import { useEffect, useRef } from "react";

import {
  Dialog,
  DialogContextProviderProps,
} from "../../script/type/dialog-context-type";
import {
  AlertProps,
  ConfirmProps,
  ToastProps,
} from "../../script/type/dialog-type";

type UseDialogContextScrollBlockingProps = Pick<
  DialogContextProviderProps<ConfirmProps, AlertProps, ToastProps>,
  "onInterceptScrollBlocking"
> & { dialogs: Array<Dialog> };

export const useDialogContextScrollBlocking = ({
  onInterceptScrollBlocking,
  dialogs,
}: UseDialogContextScrollBlockingProps) => {
  const beforeOverflow = useRef<string>("");

  // scroll blocking
  useEffect(() => {
    if (onInterceptScrollBlocking) {
      onInterceptScrollBlocking(
        dialogs.filter((dialog) => dialog.options?.dialogType !== "toast"),
        dialogs.filter((dialog) => dialog.options?.dialogType === "toast")
      );
    } else {
      const visibleDialogCount =
        dialogs.reduce((acc, dialog) => {
          return acc + (dialog.options?.dialogType !== "toast" ? 1 : 0);
        }, 0) ?? 0;

      if (visibleDialogCount > 0) {
        const currentOverflow = window.document.body.style.overflow;
        if (currentOverflow !== "hidden") {
          beforeOverflow.current = currentOverflow;
        }
        window.document.body.style.overflow = "hidden";
      } else {
        if (beforeOverflow.current) {
          window.document.body.style.overflow = beforeOverflow.current;
        } else {
          window.document.body.style.removeProperty("overflow");
        }
      }
    }
  }, [dialogs, onInterceptScrollBlocking]);

  return null;
};
