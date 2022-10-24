import { ProductColorMutationResponse } from './../../types/mutations/ProductColorMutationResponse';
import { Categories } from './../../entities/Categories';
import { Arg, Ctx, Mutation, Query, UseMiddleware } from 'type-graphql';
import { ProductValues } from "../../entities/ProductValues";
import { createBaseResolver, TypeEntityExtension } from "../abstract/BaseResolver";
import { ProductAttributes } from './../../entities/ProductAttributes';
import { checkAuth } from './../../middleware/checkAuth';
import { Context } from './../../types/Context';
import { FieldError } from './../../types/mutations/FieldError';
import { ProductAttributeMutationResponse } from './../../types/mutations/ProductAttributeMutationResponse';
import { ProductColors } from '../../entities/ProductColors';

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

}





