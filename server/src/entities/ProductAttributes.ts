import { Field } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductValues } from "./ProductValues";

@Entity()
export class ProductAttributes {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  attribute!: string

  @Field(_type => [ProductValues])
  @OneToMany(() => ProductValues, value => value.attribute)
  values: ProductValues[]

}