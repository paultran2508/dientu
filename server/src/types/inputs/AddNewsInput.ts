import { Field, InputType } from "type-graphql";

@InputType()
export class AddNewsInput {
  @Field()
  title: string
  @Field()
  img: string
  @Field()
  newsCategoryId: string
  @Field()
  path: string
}