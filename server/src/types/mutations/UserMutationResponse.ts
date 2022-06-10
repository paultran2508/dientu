import { Field, ObjectType } from 'type-graphql';
import { User } from './../../entities/User';
import { IMutationResponse } from './MutationResponse';

@ObjectType({ implements: IMutationResponse })
export class UserMutationResponse implements IMutationResponse {

  code: number;
  message?: string | undefined;
  success: boolean;

  @Field({ nullable: true })
  user?: User

  @Field({ nullable: true })
  accessToken?: string
}