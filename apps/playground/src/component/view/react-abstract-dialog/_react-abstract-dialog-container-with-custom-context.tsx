import "@/resource/css/dialog-sample-style.css";

import { Link } from "react-router";

import { useCustomDialogContext } from "@/component/hook/use-custom-dialog-context";

let testCount: number = 0;

/**
 * - 컨텍스트 주입이 선행 되어야 합니다. [이곳](../../app-content/react-custom-context-dialog-app-content.tsx) 에서 해당 컨테이너에 주입된 컨텍스트를 확인하세요.
 * - 이 예시에서는 custom-dialog-context 에 의해 confirm 만 customize 되어 있습니다.
 * - 후크 또한 custom-dialog-context 에 의해 생성된 후크를 사용 해야 합니다.
 */
const ReactDialogCustomContextContainer = () => {
  const { alert, confirm, toast } = useCustomDialogContext();

  return (
    <>
      <h1>
        <Link to="https://github.com/Team-EdgeEffect/library-js/tree/main/packages/react-abstract-dialog">
          @edge-effect/react-abstract-dialog (custom)
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
                  subTitle: "Custom property 입니다.",
                  message: "정말로 제출 할까요?",
                });
                console.info("Confirm result", result);
              }}>
              confirm
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
      </ul>
    </>
  );
};

export default ReactDialogCustomContextContainer;
