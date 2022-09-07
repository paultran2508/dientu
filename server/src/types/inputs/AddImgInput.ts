import { Field, InputType } from "type-graphql";

@InputType()
export class AddImgInput {
  @Field()
  img!: string
}