import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ImagesToProduct } from './ImagesToProduct';
import { Prices } from './Prices';
import { Products } from './Product';


@ObjectType()
@Entity()
export class ProductOptions extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @CreateDateColumn({ type: 'date' })
  createAt: Date

  @Field()
  @Column()
  name: string

  @Field(_type => [ImagesToProduct])
  @OneToMany(() => ImagesToProduct, img => img.ProductOptionId)
  imgs: ImagesToProduct[]

  @Field(_type => Products)
  @ManyToOne(() => Products, (product) => product.options)
  product: Products

  @Field(_type => [Prices])
  @OneToMany(() => Prices, price => price.option)
  prices: Prices[]

}