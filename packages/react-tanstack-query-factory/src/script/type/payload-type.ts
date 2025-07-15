type DefaultDataType = Record<string, unknown> | unknown;

export type PayloadStruct<DataType = DefaultDataType> = {
  path: DataType;
  param: DataType;
  body: DataType;
};

export type Payload<Struct extends Partial<PayloadStruct>> = {
  [K in keyof PayloadStruct as K extends keyof Struct
    ? K // 값이 있으면 필수 속성 유지
    : never]: Struct[K]; // 값이 있으면 그대로 적용
} & {
  [K in keyof PayloadStruct as K extends keyof Struct
    ? never // 값이 있으면 제거
    : K]?: void; // 값이 없으면 옵셔널 처리
};
