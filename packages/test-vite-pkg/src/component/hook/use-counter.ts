import { useState } from "react";

export const useCounter = (defaultValue: number) => {
  const countState = useState<number>(defaultValue);

  return countState;
};
