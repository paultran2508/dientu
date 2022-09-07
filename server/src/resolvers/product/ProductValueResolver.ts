import { Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql';
import { ProductValues } from "../../entities/ProductValues";
import { createBaseResolver, TypeEntityExtension } from "../abstract/BaseResolver";
import { ProductAttributes } from './../../entities/ProductAttributes';
import { checkAuth } from './../../middleware/checkAuth';
import { Context } from './../../types/Context';
import { FieldError } from './../../types/mutations/FieldError';
import { ProductAttributeMutationResponse } from './../../types/mutations/ProductAttributeMutationResponse';

const ProductValueBase = createBaseResolver({ name: "productValue", entity: ProductValues })

export class ProductValueResolver extends ProductValueBase {
  entityExtensions: TypeEntityExtension<ProductValues, keyof ProductValues>[];
  setErrors: FieldError[] = [];

  // @Mutation(_return => ProductValueMutationResponse)
  // @UseMiddleware(checkAuth)
  // async addValue(
  //   @Arg('productValueInput') { attributeId, value }: AddProductValueInput,
  //   @Ctx() { dataSource }: Context
  // ): Promise<ProductValueMutationResponse> {
  //   try {
  //     if (!value) this.setErrors.push({ message: "value không được để trống", code: "404", name: "value" })
  //     const attributeData = await dataSource.getRepository(ProductAttributes).findOneBy({ id: attributeId })
  //     if (!attributeData) this.setErrors.push({ message: "không tìm thấy attribute", code: "404", name: "attribute" })
  //     if (attributeData && value) {
  //       return this._return({
  //         values: await ProductValues.save({ attribute: attributeData, value })
  //       })
  //     }
  //     throw new HandleErrorResponse()
  //   } catch (error) {
  //     return this.catchQuery(error)
  //   }
  // }

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





