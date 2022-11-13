import { Products } from './../../entities/Products';
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class SortInput {
  @Field(() => String)
  name: keyof Products

  @Field(() => Int)
  sort: 1 | -1

}