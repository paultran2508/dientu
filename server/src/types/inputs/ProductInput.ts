import { Field, InputType } from "type-graphql";

@InputType()
export class ProductInput {
  @Field()
  name: string

  @Field()
  brandId: string

  @Field()
  path: string

  @Field()
  categoryId: string
}