import { Products } from '../../entities/Products';
import { Field, ObjectType } from 'type-graphql';
import { IMutationResponse } from './MutationResponse';
import { FieldError } from './FieldError';
import { Pagination } from '../Pagination';

@ObjectType({ implements: IMutationResponse })
export class ProductMutationResponse implements IMutationResponse {

  code: number;
  message: string;
  success: boolean;
  fieldError?: FieldError[]

  @Field(_type => [Products], { nullable: true })
  products?: Products[]

  @Field(_type => Pagination, { nullable: true })
  pagination?: Pagination

  @Field({ nullable: true })
  categoryId?: string

}