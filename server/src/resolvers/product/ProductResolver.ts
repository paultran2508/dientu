import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { FindOptionsOrder } from 'typeorm';
import { Paths } from '../../entities/Paths';
import { ProductColors } from '../../entities/ProductColors';
import { Products } from '../../entities/Products';
import { Context } from '../../types/Context';
import { ProductMutationResponse } from '../../types/mutations/ProductMutationResponse';
import { createBaseResolver, TypeEntityExtension } from '../abstract/BaseResolver';
import { Brands } from './../../entities/Brands';
import { Categories } from './../../entities/Categories';
import { Imgs } from './../../entities/Imgs';
import { Condition, ProductOptions } from './../../entities/ProductOptions';
import { PriceType, ProductPrices } from './../../entities/ProductPrices';
import { ProductValues } from './../../entities/ProductValues';
import { checkAuth } from './../../middleware/checkAuth';
import { AddProductInput } from './../../types/inputs/addProductInput';
import { FindInput } from './../../types/inputs/FindInput';
import { SortInput } from './../../types/inputs/SortInput';
import { FieldError } from './../../types/mutations/FieldError';

export const ProductsBaseResolver = createBaseResolver({ name: 'product', entity: Products })

@Resolver(_of => Products)
export class ProductResolver extends ProductsBaseResolver {
  setErrors: FieldError[] = [];
  public nameField: any
  public entityExtensions: TypeEntityExtension<Products, keyof Products>[] = [{ arg: {}, nameField: "path", entity: Paths }]
  @Query(_return => ProductMutationResponse)
  async showProducts(): Promise<ProductMutationResponse> {
    try {

      const products = await Products.find({
        relations: ["category", "path", "options.productPrices", "options.imgs", "brand"]
      })


      return this._return({ products: products })
    } catch (error) {
      return this.catchQuery(error)
    }
  }

  @Query(_return => ProductMutationResponse)
  async productsByCategoryId(
    @Arg('hasMore', _type => Boolean) hasMore: boolean,
    @Arg('categoryId', { nullable: true }) categoryId?: string,
    // @Arg('cursor', _type => Date, { nullable: true }) cursor?: Date,
    @Arg("find", () => FindInput, { nullable: true }) find?: FindInput,
    @Arg('limit', _type => Int, { nullable: true }) limit?: number,
    @Arg('sort', _type => SortInput, { nullable: true }) sort?: SortInput,
    @Arg('skip', _type => Int, { nullable: true }) skip?: number,
  ): Promise<ProductMutationResponse> {
    try {

      const realLimit: number = !limit || (limit > 50) ? 50 : limit
      const totalCount = await Products.count({ where: { categoryId: categoryId } })
      let products: Products[] = [];
      let order: FindOptionsOrder<Products>;
      order = sort ? { [sort.name]: sort.sort } : { createAt: -1 };
      if (sort?.name == "brand") {
        order = { brand: { name: sort.sort } }
      }
      if (sort?.name == "category") {
        order = { category: { name: sort.sort } }
      }


      if (hasMore) {
        products = await Products.find({
          relations: ["category", "path", "options.prices.color", "options.values", "options.imgs", "brand"],
          where: {
            category: { id: categoryId },
            options: {
              values: {
                // value: { id }
              }
            },
          },
          order,
          skip,
          take: realLimit,
        })
      }

      // if (find) {
      //   products = await Products.createQueryBuilder('product')
      //     .leftJoin('product.options.values', 'point', 'point.id != :id', { id })
      //     .getMany();
      // }

      if (find) {
        console.log(find.values)
        products = products.filter(items => {
          let ok: boolean = false;
          items.options.forEach(option => {

            ok = find?.values.every(check => option.values.map(value => value.id).includes(check))
            console.log(option.values.map(value => value.name))
          })
          return ok
        })
      }
      // console.log(find)
      return this._return({
        products,
        categoryId: categoryId,
        pagination: {
          cursor: products.length > 0 ? products.slice(-1)[0].createAt : undefined,
          totalCount,
          hasMore: products.length > 0,
          skip: skip ?? 0,
        }
      })
    } catch (error) {
      return { ...this.catchQuery(error) }
    }
  }

  @Mutation(_return => ProductMutationResponse)
  @UseMiddleware(checkAuth)
  async addProduct(
    @Arg('productOptionInput') { categoryId, brandId, path, name, addOptions }: AddProductInput,
    @Ctx() { dataSource }: Context
  ): Promise<ProductMutationResponse> {
    try {
      const dataProducts = await dataSource.transaction(async source => {
        this.source = source
        return this.addEntity({
          entity: Products,
          values: [{
            name,
            brand: (await this.addEntity({ entity: Brands, findIds: [{ id: brandId }], error: { message: "lỗi không tồn tại", name: "thương hiệu" } })
            )[0],
            category: (await this.addEntity({ entity: Categories, findIds: [{ id: categoryId }], error: { message: "lỗi không tồn tại", name: "danh mục" } }))[0],
            path: (await this.addEntity({ entity: Paths, values: [{ name: path }] }))[0],
            options: await this.addEntity({
              entity: ProductOptions,
              values: await Promise.all(addOptions.map(async option => {
                return {
                  name: option.name,
                  imgs: (await this.addEntity({
                    entity: Imgs,
                    findIds: option.addImgs.map(img => ({ src: img.img }))
                  })),
                  condition: Condition.STOKING,
                  prices: await this.addEntity({
                    entity: ProductPrices,
                    values: await Promise.all(option.addPrices.map(async price => ({
                      color: (await this.addEntity({
                        entity: ProductColors,
                        findIds: [{ id: price.colorId }]
                      }))[0],
                      note: price.note,
                      price: price.price,
                      type: price.type ?? PriceType.DEFAULT
                    })))
                  }),
                  values: await this.addEntity({
                    entity: ProductValues,
                    values: await Promise.all(option.valueIds.map(async value => {
                      return (await this.addEntity({ entity: ProductValues, findIds: [{ id: value }] }))[0]
                    })),
                  }),

                }
              }))
            })

          }]
        })
      })


      // console.log(dataProducts)
      return this._return({ products: dataProducts })
    } catch (error) {

      return this.catchQuery(error)
    }
  }


  @Mutation(_return => Boolean)
  @UseMiddleware(checkAuth)
  async deleteProduct(
    @Arg('id', _type => String) id: string,
    @Ctx() { dataSource }: Context
  ): Promise<boolean> {

    try {
      await dataSource.manager.transaction(async source => {
        const dataProduct = await source.findOne(Products, { where: { id }, relations: ["path", "options.imgs"] })
        if (dataProduct) {
          await dataProduct.path.remove()
          await dataProduct.remove()
          dataProduct.options.forEach(option => {
            option.imgs.forEach(async img => {
              await img.remove()
            })
          })

        }
      })
      return true
    } catch (error) {
      return false
    }
  }


}
export default { ProductResolver, ProductsBaseResolver }

