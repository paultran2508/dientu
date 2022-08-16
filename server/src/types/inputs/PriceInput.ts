import { Field, InputType } from "type-graphql";

@InputType()
export class PriceInput {

  @Field()
  type: string
  @Field()
  price: number
  @Field()
  note: string
}
