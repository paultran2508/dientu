import { Resolver } from "type-graphql";
import { BaseEntity, DeepPartial, EntityManager, EntityTarget, FindOperator, FindOptionsWhere, LessThan } from "typeorm";
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

type ReturnEntity<Entity> = {
  entity: EntityTarget<Entity>,
  values?: DeepPartial<Entity>[]
  findIds?: FindOptionsWhere<Entity>[],
  error?: { name: string, message: string }
}


export function createBaseResolver<T>({ entity }: TypeBaseResolver<T>) {

  @Resolver(_of => entity, { isAbstract: true })
  abstract class BaseResolver {

    // private fieldErrors: FieldError[] = []

    abstract setErrors: FieldError[]
    pagination: FindOptionsWhere<{ createAt: Date | FindOperator<Date> | undefined, take: number | undefined }>;

    public source: EntityManager
    public Entity: T = new entity()
    public fieldEntity: DeepPartial<T>;
    abstract entityExtensions: TypeEntityExtension<T, keyof T>[]

    getPagination(cursor?: Date, limit?: number) {
      const realLimit = Math.min(10, limit ?? 10)
      return this.pagination = {
        createAt: cursor && LessThan(cursor),
        take: realLimit
      }
    }

    _return<R extends {}>(arg: R): R & IMutationResponse {
      return {
        code: 200,
        message: "success",
        success: true,
        ...arg
      }
    }

    catchQuery(error: any): IMutationResponse & { fieldErrors: FieldError[] } {

      const resultError = new HandleErrorResponse(this.setErrors, error)
      this.setErrors = []
      // console.log(this.setErrors)
      return {
        code: 100,
        message: "error base",
        success: false,
        fieldErrors: resultError.getFieldErrors,
      }
    }

    async returnEntity<Entity>({ entity, values, findIds, error }: ReturnEntity<Entity>): Promise<Entity> {

      try {

        if (values) { return await this.source.save(entity, values[0]) }
        let dataEntity: Entity | null = null
        findIds && (dataEntity = await this.source.findOneBy(entity, findIds))
        if (dataEntity) return dataEntity
        // console.log({ message: error?.message, code: "123", name: error?.name ?? "aa" })
        throw new HandleErrorResponse()

      } catch (e) {
        this.setErrors.push({ message: error?.message, code: "123", name: error?.name ?? "aa" })
        throw new HandleErrorResponse()
      }



    }




    async addEntity<Entity>({ entity, values, findIds, error }: ReturnEntity<Entity>): Promise<Entity[]> {
      let dataEntities: Entity[] | null = []

      values && values.length > 0 && (dataEntities = await this.source.save(entity, values));
      if (findIds) {

        for (const id of findIds) {
          id && dataEntities.push(await this.returnEntity({ entity, findIds: [id], error }))
        }
      }
      // console.log(dataEntities)
      if (dataEntities) return dataEntities

      throw this.returnCatch("404", entity.constructor.name, "", error)

    }

    returnCatch(code: string, name: string, message?: string, error?: { name: string, message: string }): HandleErrorResponse {
      this.setErrors.push({ message: error?.message ?? message, name: error?.name ?? name, code })
      console.log(1)
      throw new HandleErrorResponse()
    }

  }
  return BaseResolver
}








