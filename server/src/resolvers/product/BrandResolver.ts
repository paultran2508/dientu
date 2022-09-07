import { ImgOf, Imgs, ImgType } from '../../entities/Imgs';
import { Context } from '../../types/Context';
import { AddBrandInput } from '../../types/inputs/AddBrandInput';
import { checkAuth } from '../../middleware/checkAuth';
import { BrandMutationResponse } from '../../types/mutations/BrandMutationResponse';
import { FieldError } from '../../types/mutations/FieldError';
import { Brands } from '../../entities/Brands';
import { createBaseResolver, TypeEntityExtension } from "../abstract/BaseResolver";
import { Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql';

const BrandBaseResolver = createBaseResolver({ entity: Brands, name: "brand" })

export class BrandResolver extends BrandBaseResolver {

  entityExtensions: TypeEntityExtension<Brands, keyof Brands>[] = [];
  setErrors: FieldError[] = []

  @Mutation(_return => BrandMutationResponse)
  @UseMiddleware(checkAuth)
  async addBrand(
    @Arg('addBrandInput') { brand, img }: AddBrandInput,
    @Ctx() { dataSource }: Context,
  ): Promise<BrandMutationResponse> {
    try {
      const Category = await dataSource.manager.transaction(async source => {
        const Img = await source.save(Imgs, { Of: ImgOf.ICON, type: ImgType.ICON, path: img })
        return await source.save(Brands, { name: brand, img: Img })
      })
      return this._return({ brands: [Category] })
    } catch (error) {
      return this.catchQuery(error)
    }
  }

}