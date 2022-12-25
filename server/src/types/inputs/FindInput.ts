import { Field, InputType } from "type-graphql";

@InputType()
export class FindInput {
  @Field()
  name: string

  @Field(() => [String])
  values: string[]

}