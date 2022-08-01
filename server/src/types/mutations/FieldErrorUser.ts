import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class FieldErrorUser {
  @Field()
  name: string

  @Field()
  mess: string
}