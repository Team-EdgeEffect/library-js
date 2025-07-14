import { DialogContentContainerProps } from "../../script/type/dialog-context-type";

type DefaultDialogContentContainerProps = {
  className?: string;
} & DialogContentContainerProps;

const DefaultDialogContentContainer = ({
  className,
  children,
}: DefaultDialogContentContainerProps) => {
  return (
    <div className={["react-dialog-content-container", className].join("")}>
      {children}
    </div>
  );
};

export default DefaultDialogContentContainer;
