import { ReactNode } from "react";

export const ToastSection = ({ children }: { children?: ReactNode }) => {
  return <div className="dialog-sample-toast-section">{children}</div>;
};
