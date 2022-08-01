import { Field, ObjectType } from 'type-graphql';
import { User } from './../../entities/User';
import { FieldErrorUser } from './FieldErrorUser';
import { IMutationResponse } from './MutationResponse';

@ObjectType({ implements: IMutationResponse })
export class UserMutationResponse implements IMutationResponse {

  code: number;
  message?: string | undefined;
  success: boolean;

  @Field({ nullable: true })
  user?: User

  @Field(_type => String, { nullable: true })
  accessToken?: string

  @Field(_type => [FieldErrorUser], { nullable: true })
  fieldError?: FieldErrorUser[]
}