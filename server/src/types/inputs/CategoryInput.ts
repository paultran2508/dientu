import { TypeCategories } from '../../entities/types/TypeCategories';
import { Field, InputType } from "type-graphql";

@InputType()
export class CategoryInput {
  @Field()
  category: string

  @Field()
  img: string

  @Field()
  type: TypeCategories
}