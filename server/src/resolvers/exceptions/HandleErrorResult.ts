import { FieldError } from '../../types/mutations/FieldError';
import { QueryFailedError } from 'typeorm';

export type CustomError = {
  code: string,
  detail: string,
  message?: string,
}

type Error<T> = T extends CustomError ? CustomError & Partial<QueryFailedError> : QueryFailedError

export class HandleErrorResponse<T> extends QueryFailedError {

  driverError: CustomError;
  getFieldError: FieldError = {
    message: this.message,
    name: this.name,
    code: this.driverError.code
  }

  public setErrors: QueryFailedError & Record<"driverError", CustomError> = {
    driverError: { code: "404", detail: "test", message: "khong tim thấy" },
    name: "handleError",
    message: "khong tim thay",
    parameters: [],
    query: "Select ..."
  }

  constructor(error: Error<T>) {
    super(error.query || "", error.parameters ?? [], error.driverError ?? error)
    if (this.driverError.code === "23505") this.unique()
    if (this.driverError.code === "404") this.notfound()
  }

  unique() {
    let name: string = this.driverError.detail as string
    const number = name.indexOf("\"") + 1
    name = this.driverError.detail.substring(number, this.driverError.detail.indexOf("\"", number))
    this.getFieldError = {
      message: `trùng ${name}`,
      name,
      code: this.driverError.code
    }
  }

  notfound() {
    this.getFieldError = {
      message: `khong tim thay ${this.driverError.detail}`,
      name: this.name,
      code: this.driverError.code
    }
  }

}