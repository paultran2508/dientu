import { ProductColors } from '../../entities/ProductColors';
import { Field, ObjectType } from 'type-graphql';
import { FieldError } from './FieldError';
import { IMutationResponse } from "./MutationResponse";


@ObjectType({ implements: IMutationResponse })
export class ProductColorMutationResponse implements IMutationResponse {
  code: number;
  message: string;
  success: boolean;
  fieldErrors?: FieldError[]

  @Field({ nullable: true })
  color?: ProductColors

}