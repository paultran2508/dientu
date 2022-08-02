import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export abstract class Paths {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ unique: true })
  url: string

}