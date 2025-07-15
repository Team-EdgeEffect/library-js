import { useEffect } from "react";

import {
  DialogActionContext,
  DialogActionContextProviderActions,
} from "../context/dialog-action-context-provider";

interface UseDialogActionContextConfig {
  hideDuration?: number;
}

export function useDialogActionContext<DialogResult = void>(
  config?: UseDialogActionContextConfig
) {
  const c = DialogActionContext.use();

  useEffect(() => {
    if (config?.hideDuration !== undefined) {
      if (config?.hideDuration > 0) {
        c.hideAfter(config?.hideDuration);
      } else {
        c.hide();
      }
    }
  }, [c, config?.hideDuration]);

  return c as DialogActionContextProviderActions<DialogResult>;
}
