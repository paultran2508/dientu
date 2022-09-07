import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class FieldError {
  @Field()
  name: string

  @Field({ nullable: true })
  message?: string

  @Field({ nullable: true })
  code?: string
}