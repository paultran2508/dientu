import { ProductPrices } from './../../entities/ProductPrices';
import { FieldError } from './FieldError';
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";

@ObjectType({ implements: IMutationResponse })
export class ProductPriceMutationResponse implements IMutationResponse {
  code: number;
  message: string;
  success: boolean;
  fieldError?: FieldError[]

  @Field(_return => [ProductPrices], { nullable: true })
  prices?: ProductPrices[]

}