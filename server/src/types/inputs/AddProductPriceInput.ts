import { Field, InputType } from "type-graphql";
import { PriceType } from '../../entities/ProductPrices';

@InputType()
export class AddProductPriceInput {
  @Field()
  note: string
  @Field()
  colorId: string
  @Field(_type => PriceType, { defaultValue: PriceType.DEFAULT })
  type: PriceType
  @Field()
  price: number
  @Field({ nullable: true })
  optionId?: string
}