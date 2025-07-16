import {
  AlertProps,
  ConfirmProps,
  DialogContextProviderProps,
  ToastProps,
} from "@edge-effect/react-abstract-dialog";
import { useMemo, useState } from "react";

type PropertyInfoKeyType<
  ConfirmPropType extends ConfirmProps,
  AlertPropType extends AlertProps,
  ToastPropType extends ToastProps,
> = keyof Pick<
  DialogContextProviderProps<ConfirmPropType, AlertPropType, ToastPropType>,
  "visibleMultipleDialog" | "withHistory" | "historySearchParamKey"
>;

type ReactAbstractDialogPropertyInfo<
  ConfirmPropType extends ConfirmProps,
  AlertPropType extends AlertProps,
  ToastPropType extends ToastProps,
> = Record<
  PropertyInfoKeyType<ConfirmPropType, AlertPropType, ToastPropType>,
  {
    displayName: string;
    description: string;
  } & (
    | {
        type: "boolean";
        value: boolean;
      }
    | {
        type: "string";
        value: string;
      }
  )
>;

export type UseReactAbstractDialogPropertyActions<
  ConfirmPropType extends ConfirmProps,
  AlertPropType extends AlertProps,
  ToastPropType extends ToastProps,
> = {
  propertyInfo: ReactAbstractDialogPropertyInfo<
    ConfirmPropType,
    AlertPropType,
    ToastPropType
  >;
  setPropertyInfo: React.Dispatch<
    React.SetStateAction<
      ReactAbstractDialogPropertyInfo<
        ConfirmPropType,
        AlertPropType,
        ToastPropType
      >
    >
  >;
  properties: Array<
    {
      name: PropertyInfoKeyType<ConfirmPropType, AlertPropType, ToastPropType>;
    } & ReactAbstractDialogPropertyInfo<
      ConfirmPropType,
      AlertPropType,
      ToastPropType
    >[PropertyInfoKeyType<ConfirmPropType, AlertPropType, ToastPropType>]
  >;
  dialogContextProviderProps: DialogContextProviderProps<
    ConfirmPropType,
    AlertPropType,
    ToastPropType
  >;
};

export const useReactAbstractDialogProperty = <
  ConfirmPropType extends ConfirmProps,
  AlertPropType extends AlertProps,
  ToastPropType extends ToastProps,
>(): UseReactAbstractDialogPropertyActions<
  ConfirmPropType,
  AlertPropType,
  ToastPropType
> => {
  const [propertyInfo, setPropertyInfo] = useState<
    ReactAbstractDialogPropertyInfo<
      ConfirmPropType,
      AlertPropType,
      ToastPropType
    >
  >({
    visibleMultipleDialog: {
      displayName: "멀티 다이얼로그 표시 활성화",
      description:
        "활성화 하면 여러개의 다이얼로그를 동시에 표시 할 때 중첩해서 표시하거나, 하나만 표시 합니다.",
      type: "boolean",
      value: true,
    },
    withHistory: {
      displayName: "히스토리 활성화",
      description:
        "활성화 하면 브라우저 스택을 이용해서 뒤로가기/앞으로가기시 다이얼로그 visibility 가 제어 됩니다.",
      type: "boolean",
      value: false,
    },
    historySearchParamKey: {
      displayName: "써치 파라미터 키",
      description:
        "히스토리를 활성화한 경우 해당 값으로 쿼리 스트링 키 값을 구성 합니다.",
      type: "string",
      value: "",
    },
  });

  const properties = useMemo(
    () =>
      Object.entries(propertyInfo).map(([key, value]) => ({
        name: key as PropertyInfoKeyType<
          ConfirmPropType,
          AlertPropType,
          ToastPropType
        >,
        ...value,
      })),
    [propertyInfo]
  );

  const dialogContextProviderProps = useMemo(
    (): DialogContextProviderProps<
      ConfirmPropType,
      AlertPropType,
      ToastPropType
    > => ({
      visibleMultipleDialog: Boolean(propertyInfo.visibleMultipleDialog.value),
      withHistory: Boolean(propertyInfo.withHistory.value),
      historySearchParamKey:
        propertyInfo.historySearchParamKey.value.toString().length > 0
          ? propertyInfo.historySearchParamKey.value.toString()
          : undefined,
    }),
    [
      propertyInfo.historySearchParamKey.value,
      propertyInfo.visibleMultipleDialog.value,
      propertyInfo.withHistory.value,
    ]
  );

  return {
    propertyInfo,
    setPropertyInfo,
    properties,
    dialogContextProviderProps,
  };
};
