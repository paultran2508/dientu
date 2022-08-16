import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductValues } from "./ProductValues";


@ObjectType()
@Entity()
export class ProductAttributes {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  attribute!: string

  @Field(_type => [ProductValues])
  @OneToMany(() => ProductValues, value => value.attribute)
  values: ProductValues[]

}