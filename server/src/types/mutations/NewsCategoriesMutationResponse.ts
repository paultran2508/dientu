import { Field, ObjectType } from 'type-graphql';
import { NewsCategories } from './../../entities/NewsCategories';
import { FieldError } from './FieldError';
import { IMutationResponse } from "./MutationResponse";


@ObjectType({ implements: IMutationResponse })
export class NewsCategoriesMutationResponse implements IMutationResponse {
  code: number;
  message: string;
  fieldErrors?: FieldError[];
  success: boolean;

  @Field(_type => [NewsCategories], { nullable: true })
  newsCategories?: NewsCategories[]

}