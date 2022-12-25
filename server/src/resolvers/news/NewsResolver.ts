import { AddNewsInput } from './../../types/inputs/AddNewsInput';
import { Imgs } from './../../entities/Imgs';
import { Paths } from './../../entities/Paths';
import { Context } from './../../types/Context';
import { NewsCategories } from './../../entities/NewsCategories';
import { NewsCategoriesMutationResponse } from './../../types/mutations/NewsCategoriesMutationResponse';
import { Arg, Ctx } from 'type-graphql';
import { Mutation, Query, Resolver } from 'type-graphql';
import { createBaseResolver } from '../abstract/BaseResolver';
import { News } from './../../entities/News';
import { FieldError } from './../../types/mutations/FieldError';
import { NewsMutationResponse } from './../../types/mutations/NewsMutationResponse';

export const NewsBaseResolver = createBaseResolver({ name: 'news', entity: News })

@Resolver(_of => News)
export class NewsResolver extends NewsBaseResolver {
  setErrors: FieldError[] = [];
  public nameField: any;



  @Query(_return => NewsCategoriesMutationResponse)
  async showNewsCategories(
  ): Promise<NewsCategoriesMutationResponse> {
    try {
      const dataCategories = await NewsCategories.find()
      return this._return({
        newsCategories: dataCategories
      })
    } catch (error) {
      return this.catchQuery(error)
    }
  }

  @Mutation(() => NewsMutationResponse)
  async addNews(
    @Arg("addNewsInput", () => AddNewsInput) { path, img, title, newsCategoryId }: AddNewsInput,
    @Ctx() { dataSource }: Context
  ): Promise<NewsMutationResponse> {
    try {

      const dataNews = await dataSource.transaction(async source => {
        this.source = source
        return this.addEntity({
          entity: News,
          values: [{
            path: (await this.addEntity({ entity: Paths, values: [{ name: path }] }))[0],
            img: (await this.addEntity({ entity: Imgs, findIds: [{ src: img }] }))[0],
            title: title,
            category: (await this.addEntity({ entity: NewsCategories, findIds: [{ id: newsCategoryId }] }))[0],
          }]
        })
      })

      return this._return({
        news: dataNews
      })
    } catch (error) {
      return this.catchQuery(error)
    }
  }







}
export default { NewsResolver, NewsBaseResolver }

