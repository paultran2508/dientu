import { AddProductOptionInput } from './AddProductOptionInput';
import { Field, InputType } from "type-graphql";

@InputType()
export class AddProductInput {
  @Field()
  name: string
  @Field()
  brandId: string
  @Field()
  categoryId: string
  @Field()
  path: string

  @Field(_type => [AddProductOptionInput])
  addOptions: AddProductOptionInput[]


}