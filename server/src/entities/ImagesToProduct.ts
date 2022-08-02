import { Field, ObjectType } from "type-graphql";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Images } from './Images';
import { ProductOptions } from './ProductOptions';

@ObjectType()
@Entity()
export class ImagesToProduct {

  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field(_type => ProductOptions)
  @ManyToOne(() => ProductOptions, product => product.imgs)
  ProductOptionId: ProductOptions


  @OneToOne(() => Images)
  @JoinColumn()
  ImageId: Images
}