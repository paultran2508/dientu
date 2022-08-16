import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./Categories";
import { Contents } from "./Contents";
import { Imgs } from "./Imgs";
import { Paths } from "./Paths";

@ObjectType()
@Entity()
export class News extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  title!: string

  @Field()
  @Column()
  top!: number

  @Field()
  @OneToOne(() => Imgs)
  @JoinColumn()
  img: Imgs

  @Field()
  @OneToOne(() => Contents)
  @JoinColumn()
  content: Imgs

  @Field()
  @OneToOne(() => Paths)
  @JoinColumn()
  path: Paths

  @Field(_type => Categories)
  @ManyToOne(() => Categories, category => category.news)
  category: Categories

}