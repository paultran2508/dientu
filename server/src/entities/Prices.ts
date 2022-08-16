import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductOptions } from "./ProductOptions";

@ObjectType()
@Entity()
export class Prices {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

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
  @CreateDateColumn({ type: 'timestamptz' })
  createAt!: Date

  @Field(_type => ProductOptions)
  @ManyToOne(() => ProductOptions, option => option.prices)
  option: ProductOptions
}