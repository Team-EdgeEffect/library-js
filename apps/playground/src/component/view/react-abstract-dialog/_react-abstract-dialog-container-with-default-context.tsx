import "@/resource/css/dialog-sample-style.css";

import { useDialogContext } from "@edge-effect/react-abstract-dialog";
import { Link } from "react-router";

import {
  ChooseFruitsDialog,
  ChooseFruitsDialogResult,
} from "@/component/view/react-abstract-dialog/shared/dialog/choose-fruits-dialog";

let testCount: number = 0;

/**
 * 컨텍스트 주입이 선행 되어야 합니다. [이곳](../../app-content/react-default-context-dialog-app-content.tsx) 에서 해당 컨테이너에 주입된 컨텍스트를 확인하세요.
 */
const ReactDialogDefaultContextContainer = () => {
  const { alert, confirm, toast, showDialog } = useDialogContext();

  return (
    <>
      <h1>
        <Link to="https://github.com/Team-EdgeEffect/library-js/tree/main/packages/react-abstract-dialog">
          @edge-effect/react-abstract-dialog
        </Link>
      </h1>
      <ul>
        <li>
          <h2>Basic dialogs</h2>
          <div className="action-section">
            <button
              onClick={async () => {
                const result = await alert({
                  title: "잠깐만요!",
                  message: "내용을 다시 확인해 주세요.",
                });
                console.info("Alert result", result);
              }}>
              alert
            </button>
            <button
              onClick={async () => {
                const result = await confirm({
                  title: "확인해주세요.",
                  message: "정말로 제출 할까요?",
                });
                console.info("Confirm result", result);
              }}>
              confirm
            </button>
            <button
              onClick={async () => {
                const result = await confirm(
                  {
                    title: "확인해주세요.",
                    message: "정말로 제출 할까요?",
                  },
                  { ignoreHistory: true }
                );
                console.info("Confirm result", result);
              }}>
              confirm (ignore history)
            </button>
            <button
              onClick={() => {
                testCount++;
                toast({
                  message: `한번 더 누르시면 3초 뒤 종료됩니다. (${testCount})`,
                });
              }}>
              toast
            </button>
            <button
              onClick={() => {
                testCount++;
                toast(
                  {
                    message: `한번 더 누르시면 ${testCount}초 뒤 종료됩니다. (${testCount})`,
                  },
                  { unique: "test-unique" }
                );
              }}>
              toast (unique)
            </button>
          </div>
        </li>
        <li>
          <h2>Custom</h2>
          <div className="action-section">
            <button
              onClick={async () => {
                const { dialog, promise } =
                  showDialog<ChooseFruitsDialogResult>(<ChooseFruitsDialog />);
                console.info("Requested show dialog", dialog);
                const result = await promise;
                console.info("Custom dialog result", result);
              }}>
              Custom dialog
            </button>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ReactDialogDefaultContextContainer;
