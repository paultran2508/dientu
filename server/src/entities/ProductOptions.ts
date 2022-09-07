import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Imgs } from './Imgs';
import { ProductPrices } from './ProductPrices';
import { Products } from './Products';
import { ProductValues } from './ProductValues';

export enum Condition {
  STOP, STOKING, WAITING
}

registerEnumType(Condition, { name: "Condition" })

@ObjectType()
@Entity()
export class ProductOptions extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date

  @Field()
  @Column()
  name: string

  @Field(_type => [Imgs])
  @ManyToMany(() => Imgs, img => img.options, { cascade: true, onDelete: "CASCADE" })
  @JoinTable()
  imgs: Imgs[]

  // @Field(_type => Products)
  @ManyToOne(() => Products, (product) => product.options, { onDelete: 'CASCADE' })
  product: Products

  @Field(_type => [ProductPrices])
  @OneToMany(() => ProductPrices, price => price.option)
  prices: ProductPrices[]

  @Field(_type => Condition)
  @Column({ type: 'enum', enum: Condition, default: Condition.STOKING })
  condition: Condition

  @Field(_type => [ProductValues])
  @ManyToMany(() => ProductValues)
  @JoinTable()
  values: ProductValues[]
}