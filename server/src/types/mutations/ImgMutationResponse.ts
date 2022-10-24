import { Field, ObjectType } from 'type-graphql';
import { Imgs } from './../../entities/Imgs';
import { FieldError } from './FieldError';
import { IMutationResponse } from './MutationResponse';

@ObjectType({ implements: IMutationResponse })
export class ImgMutationResponse implements IMutationResponse {

  code: number;
  message: string;
  success: boolean;

  @Field(_type => Imgs, { nullable: true })
  img?: Imgs

  @Field(_type => [Imgs], { nullable: true })
  imgs?: Imgs[]

  @Field(_type => [FieldError], { nullable: true })
  fieldError?: FieldError[]
}