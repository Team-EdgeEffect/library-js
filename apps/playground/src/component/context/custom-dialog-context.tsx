import {
  AlertProps,
  buildDialogContext,
  ToastProps,
} from "@edge-effect/react-abstract-dialog";

import { ExtendedConfirmProps } from "@/component/view/react-abstract-dialog/shared/dialog/extended-confirm";

export const CustomDialogContext = buildDialogContext<
  ExtendedConfirmProps,
  AlertProps,
  ToastProps
>();
