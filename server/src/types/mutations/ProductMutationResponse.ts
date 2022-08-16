import { Products } from '../../entities/Products';
import { Field, ObjectType } from 'type-graphql';
import { IMutationResponse } from './MutationResponse';
import { FieldError } from './FieldError';

@ObjectType({ implements: IMutationResponse })
export class ProductMutationResponse implements IMutationResponse {

  code: number;
  message: string;
  success: boolean;
  fieldError?: FieldError[]

  @Field(_type => [Products], { nullable: true })
  products?: Products[]

}