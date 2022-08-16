import { Brands } from './../../entities/Brands';
import { Field, ObjectType } from 'type-graphql';
import { IMutationResponse } from './MutationResponse';
import { FieldError } from './FieldError';

@ObjectType({ implements: IMutationResponse })
export class BrandMutationResponse implements IMutationResponse {

  code: number;
  message: string;
  success: boolean;
  fieldError?: FieldError[]

  @Field(_type => [Brands], { nullable: true })
  brands?: Brands[]


}