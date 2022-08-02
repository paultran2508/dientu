import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { News } from "./News";
import { Products } from "./Product";
import { TypeCategories } from "./types/TypeCategories";



@ObjectType()
@Entity()
export class Categories extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  name!: string

  @Field(_type => TypeCategories)
  @Column({ type: 'enum', enum: TypeCategories, default: TypeCategories.NEWS })
  type!: TypeCategories

  @Field(_type => [Products])
  @OneToMany(() => Products, product => product.category)
  products!: Products[]

  @Field(_type => [News])
  @OneToMany(() => News, news => news.category)
  news!: News[]

}