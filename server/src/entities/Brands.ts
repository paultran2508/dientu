import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Imgs } from "./Imgs";

@ObjectType()
@Entity()
export class Brands extends BaseEntity {
  // @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  name: string

  @Field(_type => Imgs)
  @OneToOne(() => Imgs)
  @JoinColumn()
  img: Imgs
}