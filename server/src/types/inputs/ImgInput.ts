import { Imgs } from '../../entities/Imgs';
import { Field, InputType } from "type-graphql";
import { __Type } from 'graphql';

@InputType()
export class ImgInput {
  @Field(__Type => String)
  img!: Imgs['path']
}