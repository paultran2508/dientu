import { Field, InputType } from "type-graphql";

@InputType()
export class PriceInput {

  @Field({ nullable: true })
  type?: string
  @Field()
  price: number
  @Field()
  note: string
  @Field({ nullable: true })
  productColorId?: string
}
