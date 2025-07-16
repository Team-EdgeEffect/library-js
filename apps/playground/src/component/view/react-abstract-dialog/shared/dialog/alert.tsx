import {
  AlertProps,
  AlertResult,
  useDialogActionContext,
} from "@edge-effect/react-abstract-dialog";

export const Alert = ({ title, message, textOk }: AlertProps) => {
  const { hide } = useDialogActionContext<AlertResult>();
  return (
    <div className="dialog-sample-wrap">
      <div className="dialog-sample-dimmed" onClick={() => hide()} />
      <div className="dialog-sample-content paper">
        <div className="dialog-sample-dialog">
          <h2 className="dialog-sample-dialog-title">{title}</h2>
          <h3 className="dialog-sample-dialog-message">{message}</h3>
        </div>
        <div className="dialog-sample-dialog-actions">
          <button onClick={() => hide(true)}>{textOk || "확인"}</button>
        </div>
      </div>
    </div>
  );
};
