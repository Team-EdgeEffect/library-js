import {
  useDialogActionContext,
  useDialogContext,
} from "@edge-effect/react-abstract-dialog";
import { useMemo, useState } from "react";

// define fruit type
export const FRUIT = {
  Apple: "사과",
  Cherry: "체리",
  Blueberry: "블루베리",
  Melon: "멜론",
} as const;
export type FruitType = keyof typeof FRUIT;
export type FruitValueType = (typeof FRUIT)[keyof typeof FRUIT];

// define result type
export type ChooseFruitsDialogResult = Array<FruitType>;

export const ChooseFruitsDialog = () => {
  const { confirm, hideDialogAll } = useDialogContext();

  const { hide } = useDialogActionContext<ChooseFruitsDialogResult>();

  const [chooses, setChooses] = useState<Array<FruitType>>([]);

  const fruits = useMemo(
    () =>
      Object.entries(FRUIT).map(([key, value]) => ({
        name: key,
        displayName: value,
      })),
    []
  );

  return (
    <div className="dialog-sample-wrap">
      <div className="dialog-sample-dimmed" onClick={() => hide()} />
      <div className="dialog-sample-content paper">
        <div className="dialog-sample-dialog">
          <h2 className="dialog-sample-dialog-title">Choose fruits</h2>
          <h3 className="dialog-sample-dialog-message">
            Choose your favorite fruit.
          </h3>
          <ul>
            {fruits.map((fruit) => {
              const inputUnique = `checkbox-fruit-${fruit.name}`;
              return (
                <li key={fruit.name}>
                  <input
                    id={inputUnique}
                    type="checkbox"
                    value={fruit.name}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setChooses((prevChooses) => [
                          ...prevChooses,
                          e.target.value as FruitType,
                        ]);
                      } else {
                        setChooses((prevChooses) =>
                          prevChooses.filter(
                            (choose) => choose !== e.target.value
                          )
                        );
                      }
                    }}
                  />
                  <label htmlFor={inputUnique}>{fruit.displayName}</label>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="dialog-sample-dialog-actions">
          <button onClick={() => hide(chooses)}>확인</button>
          <button
            onClick={async () => {
              if (
                await confirm({
                  title: "잠시만요!",
                  message: "진짜로 그렇게 하시겠어요?",
                })
              )
                hide(chooses);
            }}>
            한번더 확인
          </button>
          <button
            onClick={async () => {
              await hideDialogAll();
              window.location.href =
                "/examples/react-abstract-dialog/default/external-page";
            }}>
            외부 페이지 이동
          </button>
        </div>
      </div>
    </div>
  );
};
