import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Imgs } from "./Imgs";
import { News } from './News';

@ObjectType()
@Entity()
export class NewsCategories extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  name: string

  @Field(_type => Imgs)
  @OneToOne(() => Imgs)
  @JoinColumn()
  img: Imgs

  @Field(_return => [News])
  @OneToMany(() => News, news => news.category)
  news: News[]

}