import { Field, InputType } from "type-graphql";
import { AddImgInput } from "./AddImgInput";
import { AddProductPriceInput } from "./AddProductPriceInput";

@InputType()
export class AddProductOptionInput {
  @Field()
  name: string

  @Field(_type => [AddImgInput])
  addImgs: AddImgInput[]


  @Field(_type => [AddProductPriceInput])
  addPrices: AddProductPriceInput[]

  @Field(_type => [String])
  valueIds: string[]

}