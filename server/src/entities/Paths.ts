import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Paths extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string


  @Field()
  @Column({ unique: true })
  url: string

}