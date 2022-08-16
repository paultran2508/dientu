import { Field, ObjectType } from "type-graphql";
import { Entity, ManyToOne } from "typeorm";
import { Imgs } from './Imgs';
import { ProductOptions } from './ProductOptions';

@ObjectType()
@Entity()
export class ImgsToProduct {

  @Field(_type => ProductOptions)
  @ManyToOne(() => ProductOptions, product => product.imgs)
  productOption: ProductOptions

  @Field(_type => Imgs)
  @ManyToOne(() => Imgs)
  img: Imgs
}