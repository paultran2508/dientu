import { Field } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./Categories";
import { ProductAttributes } from "./ProductAttributes";

@Entity()
export abstract class ProductValues {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  value!: string

  @Field(_type => ProductAttributes)
  @ManyToOne(() => ProductAttributes, attr => attr.values)
  attribute: ProductAttributes

  @Field(_type => Categories)
  @OneToOne(() => Categories)
  @JoinColumn()
  category: Categories
}