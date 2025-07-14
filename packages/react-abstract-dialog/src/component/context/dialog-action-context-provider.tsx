import { createContext } from "@edge-effect/react-context-factory";
import { ReactNode, useCallback, useMemo, useRef } from "react";

import {
  Dialog,
  DialogContextProviderActions,
} from "../../script/type/dialog-context-type";
import {
  AlertProps,
  ConfirmProps,
  ToastProps,
} from "../../script/type/dialog-type";

interface DialogActionContextProviderProps {
  id: number;
  children?: ReactNode;
  visible: boolean;
  dialogContextHandler: Pick<
    DialogContextProviderActions<ConfirmProps, AlertProps, ToastProps>,
    "hideDialog" | "findDialogById"
  >;
}

export interface DialogActionContextProviderActions<DialogResult> {
  dialog: Dialog<DialogResult> | undefined;
  hide: (result?: DialogResult) => Promise<void>;
  hideAfter: (afterMilliseconds: number, result?: DialogResult) => void;
}

export const buildDialogActionContext = <DialogResult = unknown,>() =>
  createContext<
    DialogActionContextProviderActions<DialogResult>,
    DialogActionContextProviderProps
  >({
    providerComponent: ({ context }) => {
      const DialogActionContextProvider = ({
        id,
        visible,
        children,
        dialogContextHandler: { hideDialog, findDialogById },
      }: DialogActionContextProviderProps) => {
        const hideWorkerId = useRef<ReturnType<typeof setTimeout>>(undefined);

        const currentDialog = useMemo(() => {
          const found = findDialogById<DialogResult>(id);
          if (found === undefined)
            throw new Error("현재 다이얼로그를 찾을 수 없습니다.");
          return found;
        }, [findDialogById, id]);

        const hide = useCallback(
          async (result?: DialogResult) => {
            const promise = currentDialog.resultPromiseResolver;
            await hideDialog(id, { withConsumeResolve: false });
            promise?.(result);
          },
          [currentDialog, hideDialog, id]
        );

        const hideAfter = useCallback(
          (afterMilliseconds: number, result?: DialogResult) => {
            if (hideWorkerId.current) {
              clearTimeout(hideWorkerId.current);
            }

            hideWorkerId.current = setTimeout(() => {
              currentDialog.resultPromiseResolver?.(result);
              hideDialog(id);
              hideWorkerId.current = undefined;
            }, afterMilliseconds);
          },
          [currentDialog, hideDialog, id]
        );

        return (
          <context.Provider
            value={{
              dialog: currentDialog,
              hide,
              hideAfter,
            }}>
            <section style={{ ...(!visible && { visibility: "hidden" }) }}>
              {children}
            </section>
          </context.Provider>
        );
      };

      return DialogActionContextProvider;
    },
  });

export const DialogActionContext = buildDialogActionContext();
