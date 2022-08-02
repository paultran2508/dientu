import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./Categories";
import { Contents } from "./Contents";
import { Images } from "./Images";
import { Paths } from "./Paths";

@ObjectType()
@Entity()
export class News extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  title!: string

  @Field()
  @Column()
  top!: number

  @Field()
  @OneToOne(() => Images)
  @JoinColumn()
  img: Images

  @Field()
  @OneToOne(() => Contents)
  @JoinColumn()
  content: Images

  @Field()
  @OneToOne(() => Paths)
  @JoinColumn()
  path: Paths

  @Field(_type => Categories)
  @ManyToOne(() => Categories, category => category.news)
  category: Categories

}