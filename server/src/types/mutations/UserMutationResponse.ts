import { Field, ObjectType } from 'type-graphql';
import { Users } from '../../entities/Users';
import { FieldError } from './FieldError';
import { IMutationResponse } from './MutationResponse';

@ObjectType({ implements: IMutationResponse })
export class UserMutationResponse implements IMutationResponse {

  code: number;
  message: string;
  success: boolean;

  @Field({ nullable: true })
  user?: Users

  @Field(_type => String, { nullable: true })
  accessToken?: string

  @Field(_type => [FieldError], { nullable: true })
  fieldErrors?: FieldError[]
}