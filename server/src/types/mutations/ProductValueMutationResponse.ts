import { ProductValues } from './../../entities/ProductValues';
import { FieldError } from './FieldError';
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";

@ObjectType({ implements: IMutationResponse })
export class ProductValueMutationResponse implements IMutationResponse {
  code: number;
  message: string;
  success: boolean;
  fieldError?: FieldError[]

  @Field(_return => ProductValues, { nullable: true })
  value?: ProductValues

}