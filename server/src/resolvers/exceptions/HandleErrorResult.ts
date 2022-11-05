import { FieldError } from '../../types/mutations/FieldError';
import { QueryFailedError } from 'typeorm';

export type CustomError = {
  code: string,
  detail: string,
  message?: string,
  table?: string,
  fieldErrors?: FieldError[]
}

// type Error<T> = T extends CustomError ? CustomError & Partial<QueryFailedError> : QueryFailedError | never

export class HandleErrorResponse extends QueryFailedError {

  driverError: CustomError;
  getFieldErrors: FieldError[] = []

  public setErrors: QueryFailedError & Record<"driverError", CustomError> = {
    driverError: { code: "404", detail: "test", message: "khong tim thấy" },
    name: "handleError",
    message: "khong tim thay",
    parameters: [],
    query: "Select ..."
  }

  constructor(setErrors: FieldError[] = [], error: QueryFailedError | undefined = undefined) {
    super(error?.query ?? "", error?.parameters ?? [], error?.driverError ?? error)
    if (this.driverError.code === "23505") this.unique()
    if (this.driverError.code === "404") this.notfound()
    if (setErrors.length > 0) this.getFieldErrors = setErrors
    if (this.driverError.code === "22P02") this.uuid()
  }

  unique() {
    let name: string = this.driverError.detail
    if (this.driverError.table) {
      const number = name.indexOf("\(") + 1
      name = this.driverError.detail.substring(number, this.driverError.detail.indexOf("\)"))
    } else {
      const number = name.indexOf("\"") + 1
      name = this.driverError.detail.substring(number, this.driverError.detail.indexOf("\"", number))
    }
    this.getFieldErrors.push({
      message: `trùng ${name}` + (this.driverError.table && ` of table ${this.driverError.table}`),
      name: this.driverError.detail,
      code: this.driverError.code
    })
  }

  uuid() {
    this.getFieldErrors.push({
      message: `Kiểu dữ liệu không đúng`,
      name: "ID",
      code: "22P02"
    })
  }

  notfound() {
    this.getFieldErrors.push({
      message: `khong tim thay ${this.driverError.detail}`,
      name: this.driverError.detail,
      code: this.driverError.code
    })
  }

}