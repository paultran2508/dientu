import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType({})
@Entity()
export class ProductColors extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column({ unique: true })
  name!: string

}


