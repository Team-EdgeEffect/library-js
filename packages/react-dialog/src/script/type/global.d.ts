import { REACT_DIALOG_CONSUME_HISTORY_EVENT_NAME } from "../constant/dialog-constants";
import { ReactDialogConsumeHistoryEvent } from "./dialog-context-type";

export {};

declare global {
  interface WindowEventMap {
    [REACT_DIALOG_CONSUME_HISTORY_EVENT_NAME]: ReactDialogConsumeHistoryEvent;
  }
}
