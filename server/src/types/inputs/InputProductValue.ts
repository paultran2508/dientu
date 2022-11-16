import { Field, InputType } from "type-graphql"

@InputType()
export class InputProductValue {

  @Field()
  attributeId: string

  @Field()
  value: string

}
