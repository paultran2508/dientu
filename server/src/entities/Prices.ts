import { Field } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductOptions } from "./ProductOptions";

@Entity()
export class Prices {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ nullable: false })
  price!: number

  @Field()
  @Column()
  note: string

  @Field()
  @Column()
  type: string

  @Field()
  @Column({ type: 'date' })
  date!: Date

  @Field(_type => ProductOptions)
  @ManyToOne(() => ProductOptions, option => option.prices)
  option: ProductOptions
}