import { useEffect } from "react";

import { ReactDialogConsumeHistoryEvent } from "../../script/type/dialog-context-type";

type UseDialogContextHistoryConsumeEventProps = {
  onEvent: (event: ReactDialogConsumeHistoryEvent) => Promise<void> | void;
};

export const useDialogContextHistoryConsumeEvent = ({
  onEvent,
}: UseDialogContextHistoryConsumeEventProps) => {
  useEffect(() => {
    window.addEventListener("reactdialogconsumehistory", onEvent);
    return () => {
      window.removeEventListener("reactdialogconsumehistory", onEvent);
    };
  }, [onEvent]);
};
