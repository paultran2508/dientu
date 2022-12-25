import { Field, ObjectType } from 'type-graphql';
import { News } from './../../entities/News';
import { FieldError } from './FieldError';
import { IMutationResponse } from "./MutationResponse";


@ObjectType({ implements: IMutationResponse })
export class NewsMutationResponse implements IMutationResponse {
  code: number;
  message: string;
  fieldErrors?: FieldError[];
  success: boolean;

  @Field(_type => [News], { nullable: true })
  news?: News[]

}