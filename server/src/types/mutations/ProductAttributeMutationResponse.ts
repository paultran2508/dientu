import { ProductAttributes } from './../../entities/ProductAttributes';
import { Field, ObjectType } from 'type-graphql';
import { FieldError } from './FieldError';
import { IMutationResponse } from "./MutationResponse";


@ObjectType({ implements: IMutationResponse })
export class ProductAttributeMutationResponse implements IMutationResponse {
  code: number;
  message: string;
  fieldErrors?: FieldError[];
  success: boolean;

  @Field(_type => ProductAttributes, { nullable: true })
  attribute?: ProductAttributes

}