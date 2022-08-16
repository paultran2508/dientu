import { Mutation } from "type-graphql";
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


// type FieldERR = {
//   name: string
//   message: string
// }

export function createBaseResolver<T>({ entity, name }: TypeBaseResolver<T>) {


  // @Resolver(_of => entity, { isAbstract: false })
  abstract class BaseResolver {

    // public getErrorQuery: QueryFailedError
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

    catchQuery<C extends {}>(error: any, result: C): C & IMutationResponse & { fieldErrors: FieldError[] } {
      const resultError = new HandleErrorResponse(error)
      console.log("base", resultError.getFieldError.name + "het")
      // const setResult = result === undefined ? {} : result
      // const setResult: R & IMutationResponse = result === undefined ? { code: 100, message: "error base", success: false } : { code: 100, message: "error base", success: false, ...result }
      return {
        code: 100, message: "error base", success: false,
        fieldErrors: [resultError.getFieldError],
        ...result
      }
    }

    @Mutation(_type => entity, { name: `addBase${name}` })
    async add(
      // @Ctx() { dataSource }: Context
    ) {

    }
  }
  return BaseResolver
}





