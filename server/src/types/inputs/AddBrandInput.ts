import { Field, InputType } from "type-graphql";

@InputType()
export class AddBrandInput {
  @Field()
  brand: string

  @Field()
  img: string

}