import { Field, InputType } from "type-graphql";
import { PriceInput } from "./PriceInput";

@InputType()
export class ProductOptionInput {
  @Field()
  name: string

  @Field(_type => [String])
  imgs: string[]

  @Field(_type => PriceInput)
  price: PriceInput

  @Field()
  condition: string

  @Field()
  productId: string
}

