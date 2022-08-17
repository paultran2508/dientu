import { Resolver } from "type-graphql";
import { BaseEntity, DataSource, DeepPartial } from "typeorm";
import { FieldError } from '../../types/mutations/FieldError';
import { IMutationResponse } from '../../types/mutations/MutationResponse';
import { HandleErrorResponse } from './../exceptions/HandleErrorResult';

export type GetEntity<T> = (arg: T) => T


type TypeBaseEntity<T> = T extends BaseEntity ? (new () => T) & DeepPartial<T> : never

type TypeBaseResolver<T> = {
  name: string
  entity: TypeBaseEntity<T>
}

export type TypeEntityExtension<T, K extends keyof T> = {
  entity: TypeBaseEntity<T[K]>
  arg: DeepPartial<T[K]>,
  nameField: K
}

export function createBaseResolver<T>({ entity }: TypeBaseResolver<T>) {

  @Resolver(_of => entity, { isAbstract: true })
  abstract class BaseResolver {

    // private fieldErrors: FieldError[] = []
    public source: DataSource
    public Entity: T = new entity()
    public fieldEntity: DeepPartial<T>;
    abstract entityExtensions: TypeEntityExtension<T, keyof T>[]

    _return<R extends {}>(arg: R): R & IMutationResponse {
      return {
        code: 200,
        message: "success",
        success: true,
        ...arg
      }
    }

    catchQuery(error: any): IMutationResponse & { fieldErrors: FieldError[] } {
      const resultError = new HandleErrorResponse(error)
      // this.fieldErrors.push(resultError.getFieldError)
      console.log(resultError.driverError.fieldErrors)
      return {
        code: 100,
        message: "error base",
        success: false,
        fieldErrors: resultError.driverError.fieldErrors ? resultError.driverError.fieldErrors : [resultError.getFieldError],


      }
    }

  }
  return BaseResolver
}





