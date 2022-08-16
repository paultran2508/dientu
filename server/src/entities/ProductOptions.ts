import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Imgs } from './Imgs';
// import { ImgsToProduct } from './ImgsToProduct';
import { Prices } from './Prices';
import { Products } from './Products';


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
  @ManyToMany(() => Imgs)
  @JoinTable()
  imgs: Imgs[]

  @Field(_type => Products)
  @ManyToOne(() => Products, (product) => product.options)
  product: Products

  @Field(_type => [Prices])
  @OneToMany(() => Prices, price => price.option)
  prices: Prices[]

  @Field(_type => Condition)
  @Column({ type: 'enum', enum: Condition, default: Condition.STOKING })
  condition: Condition

}