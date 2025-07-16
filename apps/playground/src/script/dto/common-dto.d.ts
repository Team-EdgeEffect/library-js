import { AxiosError } from "axios";

export namespace CommonDto {
  type CustomAxiosError<T = unknown> = AxiosError<T>;
  interface CommonResponse<T> {
    code: number;
    message: string;
    data: T;
  }
}
