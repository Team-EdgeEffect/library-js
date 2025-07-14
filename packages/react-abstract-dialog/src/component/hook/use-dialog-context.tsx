import { DialogContext } from "../context/dialog-context-provider";

export function useDialogContext() {
  const c = DialogContext.use();
  return c;
}
