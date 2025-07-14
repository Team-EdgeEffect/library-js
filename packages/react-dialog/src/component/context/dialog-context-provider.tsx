import { createContext } from "@edge-effect/react-context-factory";
import {
  Fragment,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  DIALOG_TYPE_ALERT,
  DIALOG_TYPE_CONFIRM,
  DIALOG_TYPE_TOAST,
} from "../../script/constant/dialog-constants";
import {
  Dialog,
  DialogContextProviderActions,
  DialogContextProviderProps,
  DialogOptions,
  DialogUnique,
  HideDialogOptions,
  RequestShowDialogInfo,
  TargetChecker,
} from "../../script/type/dialog-context-type";
import {
  AlertProps,
  AlertResult,
  ConfirmProps,
  ConfirmResult,
  ToastProps,
} from "../../script/type/dialog-type";
import DefaultDialogContentContainer from "../_common/default-dialog-content-container";
import { useDialogContextHistory } from "../hook/use-dialog-context-history";
import { useDialogContextHistoryConsumeEvent } from "../hook/use-dialog-context-history-consume-event";
import { useDialogContextScrollBlocking } from "../hook/use-dialog-context-scroll-blocking";
import { DialogActionContext } from "./dialog-action-context-provider";

export const buildDialogContext = <
  ConfirmPropType extends ConfirmProps,
  AlertPropType extends AlertProps,
  ToastPropType extends ToastProps,
>() =>
  createContext<
    DialogContextProviderActions<ConfirmPropType, AlertPropType, ToastPropType>,
    DialogContextProviderProps<ConfirmPropType, AlertPropType, ToastPropType>
  >({
    providerComponent: ({ context }) => {
      let lastDialogId = 0;

      const DialogContextProvider = ({
        withHistory = false,
        historySearchParamKey = "dialog",
        visibleMultipleDialog = true,
        DialogContainer = DefaultDialogContentContainer,
        ToastContainer = DefaultDialogContentContainer,
        Alert,
        Confirm,
        Toast,
        onInterceptScrollBlocking,
        children,
      }: DialogContextProviderProps<
        ConfirmPropType,
        AlertPropType,
        ToastPropType
      >) => {
        const [dialogs, setDialogs] = useState<Array<Dialog<unknown>>>([]);
        const dialogSnapshots = useRef<Array<Dialog<unknown>>>(dialogs);
        const dialogIdInfo = useRef<Record<DialogUnique, Dialog["id"]>>({});

        const { fireHistoryConsumeEvent, addHistory } = useDialogContextHistory(
          {
            dialogs,
            withHistory,
            historySearchParamKey,
          }
        );
        useDialogContextScrollBlocking({ dialogs, onInterceptScrollBlocking });

        const showDialog = useCallback(
          <DialogResult,>(
            element: ReactNode,
            options?: DialogOptions
          ): RequestShowDialogInfo<DialogResult> => {
            const foundIdByUnique =
              options?.unique !== undefined
                ? dialogIdInfo.current[options.unique]
                : undefined;
            const dialog: Dialog<DialogResult> = {
              id: foundIdByUnique ?? ++lastDialogId,
              element,
              options,
            };

            // set id info
            if (
              options?.unique !== undefined &&
              !dialogIdInfo.current[options.unique]
            )
              dialogIdInfo.current[options.unique] = dialog.id;

            const promise = new Promise<DialogResult | undefined>((resolve) => {
              dialog.resultPromiseResolver = resolve;

              const unknownDialog = dialog as Dialog<unknown>;
              if (foundIdByUnique !== undefined) {
                setDialogs((prevDialogs) => {
                  const newDialogs = prevDialogs.map((prevDialog) => {
                    if (prevDialog.id === foundIdByUnique) return unknownDialog;
                    else return prevDialog;
                  });

                  dialogSnapshots.current = newDialogs;
                  return newDialogs;
                });
              } else {
                setDialogs((prevDialogs) => {
                  const newDialogs = [...prevDialogs, unknownDialog];

                  dialogSnapshots.current = newDialogs;
                  return newDialogs;
                });
              }

              if (
                withHistory &&
                !(options?.ignoreHistory ?? false) &&
                dialog.options?.dialogType !== "toast"
              )
                addHistory(dialog);
            });

            return { dialog, promise };
          },
          [addHistory, withHistory]
        );

        /**
         * - 숨김 대상을 분리합니다.
         * - 코드 통합을 위한 함수 입니다.
         */
        const getHideDialogTargetInfo = useCallback(
          ({
            hideDialogIds,
            dialogs,
          }: {
            hideDialogIds: Array<Dialog["id"]>;
            dialogs: Array<Dialog>;
          }): {
            keeps: Array<Dialog>;
            hides: Array<Dialog>;
          } => {
            const keeps: Array<Dialog> = [];
            const hides: Array<Dialog> = [];

            for (const dialog of dialogs) {
              if (hideDialogIds.includes(dialog.id)) hides.push(dialog);
              else keeps.push(dialog);
            }

            return { keeps, hides };
          },
          []
        );

        /**
         * - 다이얼로그를 숨기기 전 생명주기 함수를 호출합니다.
         * - toast 는 생명주기 함수에서 history 부분은 무시됩니다.
         */
        const preHideDialog = useCallback(
          ({
            dialogs,
            options,
            withConsumeResolve = true,
            promiseResolver,
          }: {
            dialogs: Array<Dialog>;
            options?: HideDialogOptions;
            withConsumeResolve?: boolean;
            promiseResolver: (value: void | PromiseLike<void>) => void;
          }) => {
            let consumeSize: number = 0;
            dialogs.forEach((dialog) => {
              if (withConsumeResolve) dialog.resultPromiseResolver?.();
              dialog.options?.onDismiss?.();

              if (
                dialog.options?.dialogType !== "toast" &&
                withHistory &&
                (options?.triggerConsumeEvent ?? true)
              )
                consumeSize += 1;
            });

            if (consumeSize > 0)
              fireHistoryConsumeEvent({
                triggerType: "hideDialog",
                consumeSize,
                consumePromiseResolver: promiseResolver,
              });
            else promiseResolver();
          },
          [fireHistoryConsumeEvent, withHistory]
        );

        const hideDialog = useCallback(
          async (id: number, options?: HideDialogOptions): Promise<void> => {
            return new Promise<void>((resolve) => {
              setDialogs((prevDialogs) => {
                const { keeps, hides } = getHideDialogTargetInfo({
                  hideDialogIds: [id],
                  dialogs: prevDialogs,
                });

                preHideDialog({
                  dialogs: hides,
                  options,
                  promiseResolver: resolve,
                  withConsumeResolve: options?.withConsumeResolve,
                });

                dialogSnapshots.current = keeps;
                return keeps;
              });
            });
          },
          [getHideDialogTargetInfo, preHideDialog]
        );

        /**
         * - 숨겨야 할 다이얼로그가 하나라도 있는 경우 상태를 업데이트 해서 렌더를 유발합니다.
         */
        const hideDialogAll = useCallback(
          async (
            targetChecker?: TargetChecker,
            options?: HideDialogOptions
          ): Promise<void> => {
            return new Promise<void>((resolve) => {
              setDialogs((prevDialogs) => {
                const { keeps, hides } = getHideDialogTargetInfo({
                  hideDialogIds: (targetChecker
                    ? prevDialogs.filter((prevDialog) =>
                        targetChecker(prevDialog)
                      )
                    : prevDialogs
                  ).map((prevDialog) => prevDialog.id),
                  dialogs: prevDialogs,
                });

                // hide all 에서 promise 를 resolve 시켜줘야 합니다.
                preHideDialog({
                  dialogs: hides,
                  options,
                  withConsumeResolve: false,
                  promiseResolver: resolve,
                });

                dialogSnapshots.current = keeps;
                return keeps;
              });
            });
          },
          [getHideDialogTargetInfo, preHideDialog]
        );

        const findDialogById = useCallback(
          <DialogResult = unknown,>(
            id: number
          ): Dialog<DialogResult> | undefined =>
            dialogSnapshots.current.find((dialog) => dialog.id === id) as
              | Dialog<DialogResult>
              | undefined,
          []
        );

        const confirm = useCallback(
          async (
            args: ConfirmPropType,
            dialogOptions?: DialogOptions
          ): Promise<ConfirmResult | undefined> => {
            if (Confirm === undefined)
              throw new Error("Confirm component is not set.");
            const { promise } = showDialog<ConfirmResult>(
              <Confirm {...args} />,
              {
                ...dialogOptions,
                dialogType: DIALOG_TYPE_CONFIRM,
              }
            );
            return await promise;
          },
          [Confirm, showDialog]
        );

        const alert = useCallback(
          async (
            args: AlertPropType,
            dialogOptions?: DialogOptions
          ): Promise<AlertResult | undefined> => {
            if (Alert === undefined)
              throw new Error("Alert component is not set.");
            const { promise } = showDialog<AlertResult>(<Alert {...args} />, {
              ...dialogOptions,
              dialogType: DIALOG_TYPE_ALERT,
            });
            return await promise;
          },
          [Alert, showDialog]
        );

        const toast = useCallback(
          (args: ToastPropType, dialogOptions?: DialogOptions): void => {
            if (Toast === undefined)
              throw new Error("Alert component is not set.");
            showDialog(<Toast {...args} />, {
              ...dialogOptions,
              dialogType: DIALOG_TYPE_TOAST,
            });
          },
          [Toast, showDialog]
        );

        const dialogContents = useMemo(() => {
          const visibleDialogs: Array<Dialog> = dialogs.filter(
            (dialog) => dialog.options?.dialogType !== DIALOG_TYPE_TOAST
          );
          const visibleDialogSize = visibleDialogs.length;
          return visibleDialogs.map((dialog, index) => {
            return (
              <Fragment key={dialog.id}>
                <DialogActionContext.Provider
                  dialogContextHandler={{ hideDialog, findDialogById }}
                  id={dialog.id}
                  visible={
                    visibleMultipleDialog
                      ? true
                      : index === visibleDialogSize - 1
                  }>
                  {dialog.element}
                </DialogActionContext.Provider>
              </Fragment>
            );
          });
        }, [dialogs, findDialogById, hideDialog, visibleMultipleDialog]);

        const toastContents = useMemo(() => {
          return dialogs
            ?.filter(
              (dialog) => dialog.options?.dialogType === DIALOG_TYPE_TOAST
            )
            .map((dialog) => {
              return (
                <Fragment key={dialog.id}>
                  <DialogActionContext.Provider
                    dialogContextHandler={{ hideDialog, findDialogById }}
                    id={dialog.id}
                    visible>
                    {dialog.element}
                  </DialogActionContext.Provider>
                </Fragment>
              );
            });
        }, [dialogs, findDialogById, hideDialog]);

        // history - consume event for popstate
        useDialogContextHistoryConsumeEvent({
          onEvent: useCallback(
            async (event) => {
              if (
                event.detail.triggerType === "popstate" &&
                event.detail.prevDialogId !== undefined
              ) {
                const foundDialog = findDialogById(event.detail.prevDialogId);
                if (foundDialog) {
                  foundDialog.resultPromiseResolver?.();
                  await hideDialog(event.detail.prevDialogId, {
                    triggerConsumeEvent: false,
                  });
                }
              }
            },
            [findDialogById, hideDialog]
          ),
        });

        return (
          <context.Provider
            value={{
              showDialog,
              hideDialog,
              hideDialogAll,
              confirm,
              alert,
              toast,
              findDialogById,
            }}>
            {children}
            {(dialogContents?.length ?? 0) > 0 ? (
              <DialogContainer>{dialogContents}</DialogContainer>
            ) : undefined}
            {(toastContents?.length ?? 0) > 0 ? (
              <ToastContainer>{toastContents}</ToastContainer>
            ) : undefined}
          </context.Provider>
        );
      };

      return DialogContextProvider;
    },
  });

export const DialogContext = buildDialogContext();
