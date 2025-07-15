import { ReactNode } from "react";

import {
  ALERT_RESULT_OK,
  CONFIRM_RESULT_NEGATIVE,
  CONFIRM_RESULT_POSITIVE,
} from "../constant/dialog-constants";

// #region base
export type BaseDialogProps<Title> = {
  title: Title;
  cancelable?: boolean;
  description?: string;
};

export type BaseActionDialogProps<Title> = BaseDialogProps<Title> & {
  content?: ReactNode;
  message: string;
};
// #endregion

// #region confirm
export type ConfirmResult =
  | typeof CONFIRM_RESULT_POSITIVE
  | typeof CONFIRM_RESULT_NEGATIVE;

export interface ConfirmProps extends BaseActionDialogProps<string> {
  textYes?: string;
  textNo?: string;
}
// #endregion

// #region alert
export type AlertResult = typeof ALERT_RESULT_OK;

export interface AlertProps extends BaseActionDialogProps<string> {
  textOk?: string;
}

// #endregion

// #region toast
export interface ToastProps {
  message: ReactNode;
  duration?: number;
}
// #endregion
