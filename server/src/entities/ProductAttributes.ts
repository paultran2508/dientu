import { Categories } from './Categories';
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
  @OneToMany(() => ProductValues, value => value.attribute, { cascade: ["update", "insert", "recover"], })
  values: ProductValues[]


  @Field(() => [Categories])
  @ManyToMany(() => Categories, value => value.attributes)
  categories: Categories[]
  
}