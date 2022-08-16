import { Field, ObjectType } from 'type-graphql';
import { ProductOptions } from './../../entities/ProductOptions';
import { FieldError } from './FieldError';
import { IMutationResponse } from './MutationResponse';

@ObjectType({ implements: IMutationResponse })
export class ProductOptionMutationResponse implements IMutationResponse {

  code: number;
  message: string;
  success: boolean;
  fieldError?: FieldError[]

  @Field(_type => [ProductOptions], { nullable: true })
  productOption?: ProductOptions[]


}