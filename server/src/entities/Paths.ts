import { Field } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class Paths {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ unique: true })
  url: string

}