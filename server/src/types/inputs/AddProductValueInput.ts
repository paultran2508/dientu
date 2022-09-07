import { Field, InputType } from "type-graphql"

@InputType()
export class AddProductValueInput {

  @Field()
  valueId: string

  @Field()
  attributeId: string

}
