import { ImgMutationResponse } from './../../types/mutations/ImgMutationResponse';
import { ProductValueMutationResponse } from './../../types/mutations/ProductValueMutationResponse';
import { Arg, Ctx, Mutation, Query, UseMiddleware } from 'type-graphql';
import { ProductColors } from '../../entities/ProductColors';
import { ProductValues } from "../../entities/ProductValues";
import { createBaseResolver, TypeEntityExtension } from "../abstract/BaseResolver";
import { Categories } from './../../entities/Categories';
import { ProductAttributes } from './../../entities/ProductAttributes';
import { checkAuth } from './../../middleware/checkAuth';
import { Context } from './../../types/Context';
import { InputProductValue } from './../../types/inputs/InputProductValue';
import { FieldError } from './../../types/mutations/FieldError';
import { ProductAttributeMutationResponse } from './../../types/mutations/ProductAttributeMutationResponse';
import { ProductColorMutationResponse } from './../../types/mutations/ProductColorMutationResponse';
import { IMutationResponse } from 'src/types/mutations/MutationResponse';

const ProductValueBase = createBaseResolver({ name: "productValue", entity: ProductValues })

export class ProductValueResolver extends ProductValueBase {
  entityExtensions: TypeEntityExtension<ProductValues, keyof ProductValues>[];
  setErrors: FieldError[] = [];

  @Query(_type => ProductAttributeMutationResponse)
  // @UseMiddleware(checkAuth)
  async productAttributes(
    @Arg('categoryId', { nullable: true }) categoryId?: string,
  ): Promise<ProductAttributeMutationResponse> {
    try {
      if (categoryId) console.log(categoryId)
      const valuesData = await Categories.find({
        relations: ["attributes.values"],
        where: { id: categoryId }
      })

      // const attr = valuesData.map(att=> att.attributes)
      return this._return({
        attributes: valuesData[0].attributes
      })

    } catch (error) {
      return this.catchQuery(error)
    }
  }

  @Query(_type => ProductColorMutationResponse)
  async productColors(): Promise<ProductColorMutationResponse> {
    try {
      return this._return({ color: await ProductColors.find() })
    } catch (error) {
      return this.catchQuery(error)
    }
  }

  @Mutation(_type => ProductAttributeMutationResponse)
  @UseMiddleware(checkAuth)
  async addAttribute(
    @Arg('attribute', _type => String) attribute: string,
    @Ctx() { dataSource }: Context
  ): Promise<ProductAttributeMutationResponse> {
    try {
      const attributeData = await dataSource.getRepository(ProductAttributes).save({ name: attribute })
      return this._return({ attribute: attributeData })
    } catch (error) {
      return this.catchQuery(error)
    }
  }

  @Mutation(_type => ProductValueMutationResponse)
  @UseMiddleware(checkAuth)
  async addProductValue(
    @Arg("inputProductValue") { attributeId, value }: InputProductValue,
    @Ctx() { dataSource }: Context
  ): Promise<ProductValueMutationResponse> {
    try {
      const dataValue = await dataSource.transaction(async source => {
        this.source = source
        const attribute = (await this.addEntity({ entity: ProductAttributes, findIds: [{ id: attributeId }] }))[0]
        return await this.addEntity({
          entity: ProductValues,
          values: [{
            attribute: attribute,
            name: value,
          }]
        })
      })

      return this._return({ value: dataValue[0] })
    } catch (error) {
      return this.catchQuery(error)
    }
  }

  @Mutation(_type => Boolean)
  @UseMiddleware(checkAuth)
  async deleteProductValueByAttribute(
    @Arg("valueId", () => String) valueId: string,
    @Ctx() { dataSource }: Context
  ): Promise<boolean> {
    try {
      return await dataSource.transaction(async source => {
        const exitingValue = await source.findOneBy(ProductValues, { id: valueId })
        if (exitingValue) {
          exitingValue.remove()
          return true
        }
        return false
      })
    } catch (error) {
      return false
    }
  }

}





