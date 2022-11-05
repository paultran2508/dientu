import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductAttributes } from "./ProductAttributes";

@ObjectType()
@Entity()
export class ProductValues extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  name!: string

  @Field(_type => ProductAttributes)
  @ManyToOne(() => ProductAttributes, attr => attr.values, { cascade: true })
  attribute: ProductAttributes

}