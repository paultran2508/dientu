import { Theme } from './../../entities/types/Theme';
import { Field, InputType } from "type-graphql"

@InputType()
export class RegisterInput {
  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  password?: string

  @Field({ nullable: true })
  theme?: Theme
}