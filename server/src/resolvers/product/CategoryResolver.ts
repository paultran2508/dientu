import { LessThan } from 'typeorm';
import { TypeCategories } from './../../entities/types/TypeCategories';
import { ImgOf, Imgs, ImgType } from './../../entities/Imgs';
import { AddCategoryInput } from '../../types/inputs/AddCategoryInput';
import { Context } from './../../types/Context';
import { checkAuth } from './../../middleware/checkAuth';
import { CategoryMutationResponse } from './../../types/mutations/CategoryMutationResponse';
import { FieldError } from './../../types/mutations/FieldError';
import { Categories } from './../../entities/Categories';
import { createBaseResolver, TypeEntityExtension } from "../abstract/BaseResolver"
import { Arg, Ctx, Int, Mutation, Query, UseMiddleware } from 'type-graphql';

const CategoryBase = createBaseResolver({ entity: Categories, name: "category" })

// @Resolver(_of => Categories)
export class CategoryResolver extends CategoryBase {

  entityExtensions: TypeEntityExtension<Categories, keyof Categories>[] = [];
  setErrors: FieldError[] = [];

  @Query(_return => CategoryMutationResponse)
  async categories(
    @Arg('cursor', _type => Date, { nullable: true }) cursor?: Date,
    @Arg('limit', _type => Int, { nullable: true }) limit?: number
  ): Promise<CategoryMutationResponse> {
    const realLimit: number = !limit || (limit > 5) ? 5 : limit

    const totalCount = await Categories.count()
    const categories = await Categories.find({
      relations: ["img"],
      where: {
        createAt: cursor ? LessThan(cursor) : cursor,
      },
      order: { createAt: "DESC" },
      take: realLimit
    })
    console.log(categories)
    return this._return({
      categories,
      pagination: {
        cursor: categories.length > 0 ? categories.slice(-1)[0].createAt : undefined,
        hasMore: categories.length > 0 ? true : false,
        totalCount,
        skip: 0
      }
    })
  }

  @Mutation(_return => CategoryMutationResponse)
  @UseMiddleware(checkAuth)
  async addCategory(
    @Arg('addCategoryInput') { category, img }: AddCategoryInput,
    @Ctx() { dataSource }: Context,
  ): Promise<CategoryMutationResponse> {
    try {
      const Category = await dataSource.manager.transaction(async source => {
        const Img = await source.save(Imgs, { Of: ImgOf.PRODUCT, type: ImgType.ICON, path: img })
        return await source.save(Categories, { img: Img, name: category, type: TypeCategories.PRODUCT })
      })
      return this._return({ categories: [Category] })
    } catch (error) { return this.catchQuery(error) }
  }

}