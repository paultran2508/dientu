import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { News } from "./News";
import { TypeCategories } from "./types/TypeCategories";

@ObjectType()
@Entity()
export class Contents {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  title: string

  @Column()
  content: string

  @OneToOne(() => News, news => news.content)
  news: News

  @Column()
  type: TypeCategories

  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updateAt: Date


}