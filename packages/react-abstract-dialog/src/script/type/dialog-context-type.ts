import { ComponentType, ReactNode } from "react";

import {
  DIALOG_TYPE_ALERT,
  DIALOG_TYPE_CONFIRM,
  DIALOG_TYPE_CUSTOM,
  DIALOG_TYPE_TOAST,
  REACT_DIALOG_CONSUME_HISTORY_EVENT_NAME,
} from "../constant/dialog-constants";
import {
  AlertProps,
  AlertResult,
  ConfirmProps,
  ConfirmResult,
  ToastProps,
} from "./dialog-type";

export type DialogUnique = string;

export type DialogType =
  | typeof DIALOG_TYPE_CONFIRM
  | typeof DIALOG_TYPE_ALERT
  | typeof DIALOG_TYPE_TOAST
  | typeof DIALOG_TYPE_CUSTOM;

export type DialogOptions = {
  ignoreHistory?: boolean; // default false
  unique?: DialogUnique; // unique 를 할당하면, 해당 unique 로 2개 이상(visible) 표시 되지 않도록 합니다.
  dialogType?: DialogType;
  onDismiss?: () => void;
};

export type Dialog<DialogResult = unknown> = {
  id: number;
  element: ReactNode;
  resultPromiseResolver?: (
    value?: DialogResult | PromiseLike<DialogResult> | undefined
  ) => void;
  options?: DialogOptions;
};

export type RequestShowDialogInfo<DialogResult> = {
  dialog: Dialog<DialogResult>;
  promise: Promise<DialogResult | undefined>;
};

export type TargetChecker = (dialog: Dialog) => boolean; // return true skip

export type NavigateOptions = {
  keepVisibleDialog?: boolean; // default false if withHistory
};

export type HideDialogOptions = {
  /**
   * - 프로미스를 자동으로 resolve(undefined)할지에 대한 값입니다.
   * - 이미 프로미스를 resolve 했다면 자동으로 무시됩니다.
   * - 기본값은 true 입니다.
   */
  withConsumeResolve?: boolean;
  triggerConsumeEvent?: boolean; // default true
};

export type DialogContentContainerProps = { children: ReactNode };
export type DialogContentContainerComponentType =
  ComponentType<DialogContentContainerProps>;

export type DialogContextProviderProps<
  ConfirmPropType extends ConfirmProps,
  AlertPropType extends AlertProps,
  ToastPropType extends ToastProps,
> = {
  withHistory?: boolean;
  historySearchParamKey?: string;
  visibleMultipleDialog?: boolean; // default true
  DialogContainer?: DialogContentContainerComponentType;
  ToastContainer?: DialogContentContainerComponentType;
  Confirm?: ComponentType<ConfirmPropType>;
  Alert?: ComponentType<AlertPropType>;
  Toast?: ComponentType<ToastPropType>;
  onInterceptScrollBlocking?: (
    visibleDialogs: Array<Dialog>,
    visibleToasts: Array<Dialog>
  ) => void;
  children?: ReactNode;
};

export type DialogContextProviderActions<
  ConfirmPropType extends ConfirmProps,
  AlertPropType extends AlertProps,
  ToastPropType extends ToastProps,
> = {
  showDialog: <DialogResult>(
    element: ReactNode,
    options?: DialogOptions
  ) => RequestShowDialogInfo<DialogResult | undefined>;
  hideDialog: (id: number, options?: HideDialogOptions) => Promise<void>;
  hideDialogAll: (
    targetChecker?: TargetChecker,
    options?: HideDialogOptions
  ) => Promise<void>;
  confirm: (
    args: ConfirmPropType,
    options?: DialogOptions
  ) => Promise<ConfirmResult | undefined>;
  alert: (
    args: AlertPropType,
    options?: DialogOptions
  ) => Promise<AlertResult | undefined>;
  toast: (args: ToastPropType, options?: DialogOptions) => void;
  findDialogById: <DialogResult = unknown>(
    id: number
  ) => Dialog<DialogResult> | undefined;
};

export type ReactDialogConsumeHistoryEventPayload =
  | {
      triggerType: "hideDialog";
      consumeSize: number;
      consumePromiseResolver?: (value: void | PromiseLike<void>) => void;
    }
  | {
      triggerType: "popstate";
      prevDialogId?: number;
    };

export class ReactDialogConsumeHistoryEvent extends CustomEvent<ReactDialogConsumeHistoryEventPayload> {
  constructor(
    eventInitDict?: CustomEventInit<ReactDialogConsumeHistoryEventPayload>
  ) {
    super(REACT_DIALOG_CONSUME_HISTORY_EVENT_NAME, eventInitDict);
  }
}
