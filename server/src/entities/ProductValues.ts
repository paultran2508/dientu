import { Field } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductAttributes } from "./ProductAttributes";

@Entity()
export abstract class ProductValues {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  value!: string

  @Field(_type => ProductAttributes)
  @ManyToOne(() => ProductAttributes, attr => attr.values)
  attribute: ProductAttributes

}