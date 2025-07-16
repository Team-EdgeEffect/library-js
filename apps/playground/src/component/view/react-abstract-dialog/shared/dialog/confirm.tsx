import {
  ConfirmProps,
  ConfirmResult,
  useDialogActionContext,
} from "@edge-effect/react-abstract-dialog";

export const Confirm = ({ title, message, textYes, textNo }: ConfirmProps) => {
  const { hide } = useDialogActionContext<ConfirmResult>();

  return (
    <div className="dialog-sample-wrap">
      <div className="dialog-sample-dimmed" onClick={() => hide()} />
      <div className="dialog-sample-content paper">
        <div className="dialog-sample-dialog">
          <h2 className="dialog-sample-dialog-title">{title}</h2>
          <h3 className="dialog-sample-dialog-message">{message}</h3>
        </div>
        <div className="dialog-sample-dialog-actions">
          <button onClick={() => hide(false)}>{textNo || "아니오"}</button>
          <button onClick={() => hide(true)}>{textYes || "네"}</button>
        </div>
      </div>
    </div>
  );
};
