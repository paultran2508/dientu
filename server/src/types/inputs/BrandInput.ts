import { Field, InputType } from "type-graphql";

@InputType()
export class BrandInput {
  @Field()
  brand: string

  @Field()
  img: string

}