import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductValues } from "./ProductValues";


@ObjectType()
@Entity()
export class ProductAttributes extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column({ unique: true, nullable: false })
  name!: string

  @Field(_type => [ProductValues])
  @OneToMany(() => ProductValues, value => value.attribute)
  values: ProductValues[]

  // @Field(_type => [Categories])
  // @ManyToMany(() => Categories)
  // @JoinTable()
  // categories: Categories[]

}