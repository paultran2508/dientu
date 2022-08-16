import { Condition, ProductOptions } from './../../entities/ProductOptions';
import { Prices } from './../../entities/Prices';
import { ProductOptionMutationResponse } from './../../types/mutations/ProductOptionMutationResponse';
import { ProductOptionInput } from './../../types/inputs/ProductOptionInput';
import { BrandMutationResponse } from './../../types/mutations/BrandMutationResponse';
import { CategoryMutationResponse } from './../../types/mutations/CategoryMutationResponse';
import { ImgOf, Imgs, ImgType } from './../../entities/Imgs';
import { TypeCategories } from './../../entities/types/TypeCategories';
import { checkAuth } from './../../middleware/checkAuth';
import { CategoryInput } from './../../types/inputs/CategoryInput';
import { CustomError, HandleErrorResponse } from './../exceptions/HandleErrorResult';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Brands } from '../../entities/Brands';
import { Categories } from '../../entities/Categories';
import { Paths } from '../../entities/Paths';
import { Products } from '../../entities/Products';
import { Context } from '../../types/Context';
import { ProductInput } from '../../types/inputs/ProductInput';
import { BrandInput } from '../../types/inputs/BrandInput';
import { ProductMutationResponse } from '../../types/mutations/ProductMutationResponse';
import { createBaseResolver, TypeEntityExtension } from '../abstract/BaseResolver';

export const ProductsBaseResolver = createBaseResolver({ name: 'product', entity: Products })

@Resolver(_of => Products)
export class ProductResolver extends ProductsBaseResolver {

  public nameField: any
  public entityExtensions: TypeEntityExtension<Products, keyof Products>[] = [{ arg: {}, nameField: "path", entity: Paths }]

  @Mutation(_return => ProductMutationResponse)
  // @UseMiddleware(checkAuth)
  async addProduct(@Arg('addProductInput') { brandId, categoryId, name, path }: ProductInput, @Ctx() { dataSource }: Context
  ): Promise<ProductMutationResponse> {
    // console.log(brandId, categoryId, name, path)
    try {
      const product = await dataSource.manager.transaction(async source => {
        const Category = await source.findOne(Categories, { where: { id: categoryId } })
        if (!Category)
          throw new HandleErrorResponse<CustomError>({ code: "404", message: "khong tim thay ", detail: "category" })
        const Brand = await source.findOne(Brands, { where: { id: brandId } })
        if (!Brand)
          throw new HandleErrorResponse<CustomError>({ code: "404", message: "khong tim thay ", detail: "brand" })
        const Path = await source.save(Paths, { url: path })
        return await source.save(Products, { category: Category, name, path: Path, brand: Brand })
      })
      return this._return({ products: [product] })
    } catch (error) { return this.catchQuery(error, {}) }
  }

  @Mutation(_return => CategoryMutationResponse)
  // @UseMiddleware(checkAuth)
  async addCategory(
    @Arg('categoryInput') { category, img }: CategoryInput,
    @Ctx() { dataSource }: Context,
  ): Promise<CategoryMutationResponse> {
    try {
      const Category = await dataSource.manager.transaction(async source => {
        const Img = await source.save(Imgs, { Of: ImgOf.PRODUCT, type: ImgType.ICON, path: img })
        return await source.save(Categories, { img: Img, name: category, type: TypeCategories.PRODUCT })
      })
      return this._return({ categories: [Category] })
    } catch (error) { return this.catchQuery(error, {}) }
  }

  @Mutation(_return => BrandMutationResponse)
  // @UseMiddleware(checkAuth)
  async addBrand(
    @Arg('brandInput') { brand, img }: BrandInput,
    @Ctx() { dataSource }: Context,
  ): Promise<BrandMutationResponse> {
    try {
      const Category = await dataSource.manager.transaction(async source => {
        const Img = await source.save(Imgs, { Of: ImgOf.ICON, type: ImgType.ICON, path: img })
        return await source.save(Brands, { name: brand, img: Img })
      })
      return this._return({ brands: [Category] })
    } catch (error) { return this.catchQuery(error, {}) }
  }

  @Mutation(_return => ProductOptionMutationResponse)
  // @UseMiddleware(checkAuth)
  async addOptionProduct(
    @Arg('productOptionInput') { price, imgs, name, productId }: ProductOptionInput,
    @Ctx() { dataSource }: Context
  ): Promise<ProductOptionMutationResponse> {
    try {
      const productOption = await dataSource.manager.transaction(async source => {
        let addImgs: Imgs[] = []
        const addProduct = await source.findOneBy(Products, { id: productId })
        if (!addProduct) throw new HandleErrorResponse<CustomError>({ code: "404", detail: "product" })

        for (const img of imgs) {
          addImgs.push(await source.save(Imgs, { Of: ImgOf.PRODUCT, type: ImgType.JPG, path: img }))
        }
        const addPrice = await source.save(Prices, { note: price.note, price: price.price, type: "default" })
        return await source.save(ProductOptions, { imgs: addImgs, name, product: addProduct, condition: Condition.STOKING, prices: [addPrice] })

      })
      return this._return({ productOption: [productOption] })
    } catch (error) {
      return this.catchQuery(error, {})
    }
  }


}
export default { ProductResolver, ProductsBaseResolver }