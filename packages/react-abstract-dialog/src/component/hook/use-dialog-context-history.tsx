import { useCallback, useEffect } from "react";

import {
  Dialog,
  DialogContextProviderProps,
  ReactDialogConsumeHistoryEvent,
  ReactDialogConsumeHistoryEventPayload,
} from "../../script/type/dialog-context-type";
import {
  AlertProps,
  ConfirmProps,
  ToastProps,
} from "../../script/type/dialog-type";
import { useDialogContextHistoryConsumeEvent } from "./use-dialog-context-history-consume-event";

let consumePromiseResolver:
  | ((value: void | PromiseLike<void>) => void)
  | undefined;

type UseDialogContextHistoryProps = Required<
  Pick<
    DialogContextProviderProps<ConfirmProps, AlertProps, ToastProps>,
    "withHistory" | "historySearchParamKey"
  >
> & {
  dialogs: Array<Dialog>;
};

type UseDialogContextHistoryActions = {
  fireHistoryConsumeEvent: (
    detail: ReactDialogConsumeHistoryEventPayload
  ) => void;
  addHistory: <DialogResult>(dialog: Dialog<DialogResult>) => void;
};

export const useDialogContextHistory = ({
  withHistory,
  historySearchParamKey,
  dialogs,
}: UseDialogContextHistoryProps): UseDialogContextHistoryActions => {
  const fireHistoryConsumeEvent = useCallback(
    (detail: ReactDialogConsumeHistoryEventPayload) => {
      window.dispatchEvent(new ReactDialogConsumeHistoryEvent({ detail }));
    },
    []
  );

  const addHistory = useCallback(
    <DialogResult,>(dialog: Dialog<DialogResult>) => {
      const url = new URL(window.location.href);
      url.searchParams.set(historySearchParamKey, dialog.id.toString());
      window.history.pushState({}, "", url);
    },
    [historySearchParamKey]
  );

  // history - consume event for hideDialog
  useDialogContextHistoryConsumeEvent({
    onEvent: useCallback((event) => {
      if (event.detail.triggerType === "hideDialog") {
        consumePromiseResolver = event.detail.consumePromiseResolver;
        window.history.go(-event.detail.consumeSize);
      }
    }, []),
  });

  // history - popstate
  useEffect(() => {
    if (withHistory) {
      const onPopState = () => {
        if (consumePromiseResolver !== undefined) {
          consumePromiseResolver();
          consumePromiseResolver = undefined;
          return;
        }

        fireHistoryConsumeEvent({
          triggerType: "popstate",
          prevDialogId: dialogs.at(dialogs.length - 1)?.id,
        });
      };

      window.addEventListener("popstate", onPopState);
      return () => {
        window.removeEventListener("popstate", onPopState);
      };
    }
  }, [dialogs, fireHistoryConsumeEvent, withHistory]);

  return { fireHistoryConsumeEvent, addHistory };
};
