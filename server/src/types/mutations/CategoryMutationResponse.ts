import { Categories } from './../../entities/Categories';
import { Field, ObjectType } from 'type-graphql';
import { IMutationResponse } from './MutationResponse';
import { FieldError } from './FieldError';

@ObjectType({ implements: IMutationResponse })
export class CategoryMutationResponse implements IMutationResponse {

  code: number;
  message: string;
  success: boolean;
  fieldError?: FieldError[]

  @Field(_type => [Categories], { nullable: true })
  categories?: Categories[]


}